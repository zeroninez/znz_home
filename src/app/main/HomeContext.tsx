'use client'

import Link from 'next/link'
import { getPagesByTableType } from '@/app/utils/notion'
import Marquee from 'react-fast-marquee'
import { ItemGrid } from '@/components'
import { Loading } from '@/components'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Page {
  projects: any
}

export default function HomeContext(props: Page) {
  // ✅ Post & Project 테이블 데이터 가져오기
  const { projects } = props
  return (
    <>
      <section className='w-full h-[80dvh] flex flex-col items-center justify-center relative overflow-hidden'>
        <h1 className='text-4xl md:text-8xl font-bold text-black z-10'>Vibrant design enriches our lifestyle.</h1>
        <h2 className='text-xl md:text-3xl font-semibold text-black z-10 mt-4'>ZERONINEZ</h2>
      </section>

      <div className='flex flex-col gap-8 px-6 md:px-12 w-full h-full'>
        {/* Project 테이블 */}
        {/* <Link href={'/projects'} className='w-full h-fit text-2xl md:text-4xl font-bold'>
          Projects
        </Link> */}
        <ItemGrid items={projects} hrefPrefix='/projects/' />
      </div>
    </>
  )
}
