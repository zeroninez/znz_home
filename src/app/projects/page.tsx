// src/app/page.tsx

import Link from 'next/link'
import { getPagesByTableType } from '../utils/notion'
import { Breadcrumbs, ItemGrid } from '@/components'

export const revalidate = 30 // 30초마다 데이터 갱신 (자동 업데이트)

export default async function Projects() {
  const projects = await getPagesByTableType('project')

  return (
    <>
      <div className='w-full h-fit px-6  md:px-12 pt-0 md:pt-12 pb-6 md:pb-8 '>
        <Breadcrumbs />
        <span className='text-6xl md:text-8xl font-bold leading-none'>Projects</span>
      </div>
      <div className='flex flex-col p-6 md:p-12 w-full h-full'>
        {/* Project 테이블 */}
        <ItemGrid items={projects} hrefPrefix='/projects/' />
      </div>
    </>
  )
}
