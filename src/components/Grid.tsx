'use client'
// Clean & Minimal Grid Design
import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface GridProps {
  items: any[]
}

export const Grid = ({ items }: GridProps) => {
  const [selected, setSelected] = useState(null)

  return (
    <div className='w-full h-fit'>
      {/* 🎯 클린한 그리드 레이아웃 */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1px]'>
        {items.map((item, index) => (
          <Item key={item.id} item={item} index={index} setSelected={setSelected} />
        ))}
      </div>
    </div>
  )
}

interface ItemProps {
  item: any
  index: number | string
  setSelected: any
}

function Item({ item, index, setSelected }: ItemProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{
        delay: (index as number) * 0.1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart
      }}
      whileHover={{
        opacity: 0.9,
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      className='group cursor-pointer'
      onClick={() => setSelected(item)}
    >
      {/* 🖼️ 이미지 컨테이너 */}
      <div className='relative overflow-hidden bg-gray-100 aspect-[4/3]'>
        <motion.img
          src={item.properties.thumbnail}
          alt={item.properties.title}
          className='w-full h-full object-cover'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />

        {/* 미니멀한 오버레이 */}
        <div className='absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300' />

        {/* 추천 표시 */}
        {item.properties.recommended && (
          <div className='absolute top-3 right-3'>
            <div className='w-2 h-2 bg-white text-black rounded-full'></div>
          </div>
        )}

        {/* 📝 텍스트 섹션 */}
        <motion.div className='w-full h-full bottom-0 flex flex-col justify-end items-start left-0 absolute p-3 space-y-1.5 text-black opacity-0 hover:opacity-100 transition-opacity duration-300'>
          {/* 제목 */}
          <motion.h3 className='font-medium text-base leading-tight0'>{item.properties.name}</motion.h3>

          {/* 화살표 아이콘 */}
          <motion.div className=''>
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.article>
  )
}
