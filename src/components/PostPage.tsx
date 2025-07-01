import { Breadcrumbs } from '@/components'
import { NotionRenderer } from '@/components/NotionRenderer'
import { Item } from '@/types'

interface PageParams {
  properties: Item['properties']
  content: any[]
}

export const PostPage = ({ properties, content }: PageParams) => {
  const createdTime = new Date(properties.createdTime.created_time as string).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
  })
  const title = (properties.name as any).title[0].plain_text

  return (
    <>
      {/* header */}
      <div className='w-full h-fit  flex flex-col bg-black text-white items-center justify-center'>
        <div className='w-full max-w-4xl h-fit px-6 md:px-12 py-6 md:py-12 flex flex-col items-start justify-start gap-4'>
          <Breadcrumbs />
          <span className='text-xs md:text-sm '>{createdTime}</span>
          <span className='text-4xl md:text-6xl font-semibold leading-none'>{title}</span>
        </div>
      </div>
      <div className='w-full h-px bg-gray-200' />
      {/* content */}
      <div className='w-full max-w-4xl min-h-dvh h-fit px-6 md:px-12 py-6 md:py-12 flex flex-col items-start justify-start gap-4'>
        {content.length > 0 ? (
          <NotionRenderer blocks={content} />
        ) : (
          <div className='bg-white p-4 rounded-lg'>No content</div>
        )}
      </div>
    </>
  )
}
