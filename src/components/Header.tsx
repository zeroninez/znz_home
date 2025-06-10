'use client'

import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import classNames from 'classnames'
import { Logo } from './Logo'
import { HEADER_HEIGHT_MOBILE, HEADER_HEIGHT_PC } from '@/constants'
import { useIsMobile } from '@/hooks'

/**
 * Header
 * - Header는 페이지 상단에 위치하는 GNB(Global Navigation Bar)입니다.
 * @returns {JSX.Element} JSX.Element
 * @example
 * return (
 *  <Header />
 * )
 **/

export const Header = () => {
  const router = useRouter()
  const [page, setPage] = useState('')
  const pathname = usePathname()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isMobile = useIsMobile()

  const pages = [
    { name: 'About', path: 'about' },
    { name: 'Contact', path: 'contact' },
    { name: 'Projects', path: 'projects' },
  ]

  const handlePage = (page: string) => {
    setPage(page)
    setIsModalOpen(false)
    router.push('/' + page)
  }

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{
          y: 0,
        }}
        transition={{ duration: 0.5 }}
        style={{
          height: isMobile ? HEADER_HEIGHT_MOBILE : HEADER_HEIGHT_PC,
        }}
        className={classNames(
          'fixed top-0 left-0 z-30 w-full px-4 py-3 flex flex-row items-start justify-between text-white',
          'mix-blend-difference',
        )}
      >
        <div onClick={() => handlePage('')} className='p-1 cursor-pointer hover:opacity-70 active:scale-95 transition'>
          <Logo size='lg' className='bg-white' />
        </div>
        <div className='hidden md:flex flex-row justify-between items-start w-1/2 md:w-1/3 h-fit'>
          <div className=' flex flex-col justify-start items-start w-1/2 h-fit'>
            {
              //pages에서 Index, About, Contact만 가져오기
              pages.slice(0, 2).map((page, index) => (
                <div
                  key={index}
                  onClick={() => handlePage(page.path)}
                  className={classNames(
                    'cursor-pointer hover:opacity-70 active:scale-95 transition',
                    pathname === `/` + page.path ? 'opacity-50' : 'opacity-100',
                  )}
                >
                  {page.name}
                </div>
              ))
            }
          </div>
          <div className='flex flex-col justify-start items-start w-1/2 h-fit'>
            {
              //pages에서 Index, About, Contact만 가져오기
              pages.slice(2, 4).map((page, index) => (
                <div
                  key={index}
                  onClick={() => handlePage(page.path)}
                  className={classNames(
                    'cursor-pointer hover:opacity-70 active:scale-95 transition',
                    pathname === `/` + page.path ? 'opacity-50' : 'opacity-100',
                  )}
                >
                  {page.name}
                </div>
              ))
            }
          </div>
        </div>
        <div
          onClick={() => setIsModalOpen(!isModalOpen)}
          className='w-fit h-fit flex flex-row justify-center items-center md:hidden py-2 active:opacity-70'
        >
          Menu
        </div>
      </motion.div>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed z-30
            top-0 left-0 text-xl w-full h-full bg-black text-white flex flex-col justify-start items-start'
          >
            <div
              style={{
                height: isMobile ? HEADER_HEIGHT_MOBILE : HEADER_HEIGHT_PC,
              }}
              className='w-full px-4 py-3 flex flex-row items-start justify-between text-white'
            >
              <div
                onClick={() => handlePage('')}
                className='p-1 cursor-pointer md:hover:opacity-70 active:scale-95 transition'
              >
                <Logo size='lg' className='bg-white' />
              </div>
              <div
                onClick={() => setIsModalOpen(false)}
                className='w-fit h-fit flex flex-row justify-center items-center md:hidden py-2 active:opacity-70'
              >
                Close
              </div>
            </div>
            <div className='w-full h-fit flex flex-row justify-between items-center px-4 pt-8'>
              <div className=' flex flex-col justify-start items-start w-1/2 h-fit'>
                {
                  //pages에서 Index, About, Contact만 가져오기
                  pages.slice(0, 2).map((page, index) => (
                    <div
                      key={index}
                      onClick={() => handlePage(page.path)}
                      className={classNames(
                        'cursor-pointer hover:opacity-70 active:scale-95 transition p-2',
                        pathname === page.path ? 'opacity-70' : 'opacity-100',
                      )}
                    >
                      {page.name}
                    </div>
                  ))
                }
              </div>
              <div className='flex flex-col justify-start items-start w-1/2 h-fit'>
                {
                  //pages에서 Index, About, Contact만 가져오기
                  pages.slice(2, 4).map((page, index) => (
                    <div
                      key={index}
                      onClick={() => handlePage(page.path)}
                      className={classNames(
                        'cursor-pointer hover:opacity-70 active:scale-95 transition p-2',
                        pathname === page.path ? 'opacity-70' : 'opacity-100',
                      )}
                    >
                      {page.name}
                    </div>
                  ))
                }
              </div>
            </div>
            <div className='absolute bottom-0 left-0 w-fit h-fit flex flex-row justify-center items-center px-4 pb-5'>
              <p className='text-xl leading-none'>© 2025 zeroninez.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
