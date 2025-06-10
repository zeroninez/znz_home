import { Breadcrumbs } from '@/components'

export default function Contact() {
  return (
    <>
      <div className='w-full h-fit px-6  md:px-12 pt-0 md:pt-12 pb-6 md:pb-8 '>
        <Breadcrumbs />
        <span className='text-6xl md:text-8xl font-bold leading-none'>Contact</span>
      </div>
      <div className='flex flex-col px-6 md:px-12 w-full h-full gap-12 md:gap-20 pb-4 md:pb-12'>
        {/* 연락처 정보 */}
        <div className='p-2 mb-8'>
          <h2 className='text-xl mb-4'>Address</h2>
          <p className='text-gray-700'>543, Yangwha-ro 81, Mapo-gu, Seoul, South Korea.</p>

          <h2 className='text-xl  mt-6 mb-2'>Email</h2>
          <p className='text-gray-700'>
            <a href='mailto:info@zeroninez.com' className='text-blue-500 hover:underline'>
              info@zeroninez.com
            </a>
          </p>

          <h2 className='text-xl  mt-6 mb-2'>Phone</h2>
          <p className='text-gray-700'>02-3144-0099</p>
        </div>
      </div>
    </>
  )
}
