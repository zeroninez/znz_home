// src/app/product/[slug]/page.tsx

import { getPageContent, getPageBySlug } from '@/api/notion'
import { PostPage } from '@/components'
import { notFound } from 'next/navigation'

type PageParams = Promise<{ slug: string }>

export default async function Page({ params }: { params: PageParams }) {
  const projectItem = await getPageBySlug('project', (await params).slug)

  // Redirect to not found page if not found
  if (!projectItem) notFound()

  const content = await getPageContent(projectItem.id)

  return (
    <>
      <PostPage properties={projectItem.properties} content={content} />
    </>
  )
}
