'use client'

import { Grid, Logo } from '@/components'

export default function HomeClient(props) {
  const { projectItems } = props

  const recentlySortedAllItems = [...projectItems]
    .sort((a, b) => new Date(b.properties.createdTime).getTime() - new Date(a.properties.createdTime).getTime())
    .slice(0, 8)

  const recentlySortedRecommendedItems = recentlySortedAllItems
    .filter((item) => item.properties.recommended)
    .sort((a, b) => new Date(b.properties.createdTime).getTime() - new Date(a.properties.createdTime).getTime())
    .slice(0, 4)

  return (
    <>
      <div className='w-full h-fit p-6 md:p-12 bg-black text-white flex flex-col justify-center items-center gap-16 md:gap-20'>
        {/* Newly Added Section */}
        <div className='w-full h-fit flex flex-col items-start justify-center gap-6 md:gap-8'>
          <Grid items={recentlySortedAllItems} />
        </div>
      </div>
    </>
  )
}
