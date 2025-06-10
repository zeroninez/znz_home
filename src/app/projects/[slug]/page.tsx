// src/app/product/[slug]/page.tsx

import { getPageContent, getPageBySlug, notionClient } from '@/app/utils/notion'
import { Breadcrumbs } from '@/components'
import { NotionRenderer } from '@/components/NotionRenderer'
import { notFound } from 'next/navigation'

type PageParams = Promise<{ slug: string }>

export default async function ProjectPage({ params }: { params: PageParams }) {
  console.log('Slug: ', params)
  const projectItem = await getPageBySlug('project', (await params).slug)

  // Redirect to not found page if not found
  if (!projectItem) notFound()

  const content = await getPageContent(projectItem.id)

  console.log('ProductItem: ', projectItem)
  console.log('Content: ', content)

  const title = (projectItem.properties.name as any).title[0].plain_text

  return (
    <>
      <div className='w-full h-fit px-6 md:px-12 pt-0 md:pt-12 pb-6 md:pb-8'>
        <Breadcrumbs />
        <span className='text-6xl md:text-8xl font-bold leading-none'>{title}</span>
      </div>
      <div className='w-full min-h-[60vh] h-full bg-gray-100 p-6 md:p-12 gap-4 flex flex-col'>
        <span className='text-base font-mono w-fit bg-black text-white px-2 py-1'>{(await params).slug}</span>
        {content.length > 0 ? (
          <NotionRenderer blocks={content} />
        ) : (
          <div className='bg-white p-4 rounded-lg'>No content</div>
        )}
      </div>
    </>
  )
}
