// src/app/page.tsx

import { getPagesByTableType } from '@/app/utils/notion'
import HomeContext from './main/HomeContext'

export const revalidate = 30 // 30초마다 데이터 갱신 (자동 업데이트)

export default async function Index() {
  // ✅ Post & Project 테이블 데이터 가져오기
  const projects = await getPagesByTableType('project')

  return (
    <>
      <HomeContext projects={projects} />
    </>
  )
}
