// src/app/utils/notion.ts

import { Client } from '@notionhq/client'
import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { cache } from 'react'

// ✅ Notion API 연결
const TOKEN = process.env.NEXT_PUBLIC_NOTION_TOKEN as string

export const notionClient = new Client({
  auth: TOKEN,
})

// ✅ 테이블 유형별 DATABASE_ID 매핑
const DATABASE_ID_MAP: Record<string, string> = {
  project: process.env.NEXT_PUBLIC_NOTION_PROJECTS_DATABASE_ID as string, // Project 테이블 ID
}

// ✅ 특정 테이블에서 데이터 가져오기 (post, project 등)
export const getPagesByTableType = async (tableType: 'project') => {
  const databaseId = DATABASE_ID_MAP[tableType]
  if (!databaseId) throw new Error(`Invalid tableType: ${tableType}`)

  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      property: 'published',
      checkbox: { equals: true },
    },
  })

  return response.results
}

// ✅ 특정 테이블에서 Slug로 페이지 가져오기
export const getPageBySlug = async (tableType: 'project', slug: string) => {
  const databaseId = DATABASE_ID_MAP[tableType]
  if (!databaseId) throw new Error(`Invalid tableType: ${tableType}`)

  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      property: 'slug',
      rich_text: {
        equals: slug,
      },
    },
  })

  return response.results.length > 0 ? (response.results[0] as PageObjectResponse) : undefined
}

// ✅ 특정 페이지의 블록 콘텐츠 가져오기 (캐싱 적용)
export const getPageContent = cache(async (pageId: string) => {
  try {
    const response = await notionClient.blocks.children.list({ block_id: pageId })
    return response.results as BlockObjectResponse[]
  } catch (error) {
    console.error(`Error fetching page content for pageId: ${pageId}`, error)
    return [] // 에러 발생 시 빈 배열 반환 (페이지 깨짐 방지)
  }
})
