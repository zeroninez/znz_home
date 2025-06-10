import Link from 'next/link'

// ✅ Item 타입 정의 (description 추가)
interface Item {
  id: string
  properties: {
    name?: { title: { plain_text: string }[] }
    slug?: { rich_text: { plain_text: string }[] }
    lastEditedTime?: { last_edited_time: string }
    description?: { rich_text: { plain_text: string }[] } // ✅ description 추가
  }
}

interface ItemGridProps {
  items: any[] // ✅ Notion API에서 받은 원본 데이터
  hrefPrefix: string // 예: "/projects/", "/posts/"
}

export const ItemGrid = ({ items, hrefPrefix }: ItemGridProps) => {
  // ✅ Notion API 응답을 `Item` 타입으로 변환
  const parsedItems: Item[] = items.map((item) => ({
    id: item.id,
    properties: {
      name: item.properties?.name || { title: [{ plain_text: 'Untitled' }] },
      slug: item.properties?.slug || { rich_text: [{ plain_text: '' }] },
      lastEditedTime: item.properties?.lastEditedTime || { last_edited_time: null },
      description: item.properties?.description || { rich_text: [{ plain_text: '' }] }, // ✅ description 변환
    },
  }))

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full h-fit pb-12'>
      {parsedItems.map(({ id, properties }) => {
        const name = properties.name?.title[0]?.plain_text || 'Untitled'
        const slug = properties.slug?.rich_text[0]?.plain_text || ''
        const description = properties.description?.rich_text[0]?.plain_text || '' // ✅ description 가져오기
        const lastEdited = formatDate(properties.lastEditedTime?.last_edited_time || '')

        return (
          <Link
            href={`${hrefPrefix}${slug}`}
            key={id}
            //random background color
            style={{
              backgroundColor: `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`,
            }}
            className='relative flex flex-col justify-between rounded-lg p-4 aspect-video transition-all duration-300 ease-in-out 
                      hover:scale-105 active:opacity-70'
          >
            <span className='text-2xl md:text-3xl font-bold leading-tight'>{name}</span>
            <p className='text-sm text-gray-600 mt-1'>{description}</p> {/* ✅ description 표시 */}
            <p className='text-xs text-gray-500 mt-2'>{lastEdited}</p>
          </Link>
        )
      })}
    </div>
  )
}

// ✅ 날짜를 YYYY.MM.DD 오전/오후 HH:MM 형식으로 변환하는 함수
const formatDate = (isoString: string | null) => {
  if (!isoString) return 'N/A'
  const date = new Date(isoString)
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // ✅ 오전/오후 표시
  })
    .format(date)
    .replace(/\./g, '') // 불필요한 점(.) 제거
    .replace(/ /g, '.') // 공백을 .으로 변환
    .replace(/\.$/, '') // 마지막 점(.) 제거
}
