// src/app/page.tsx
'use client'

import { ListPage } from '@/components'

export default function Client(props) {
  const { parsedProject } = props

  return (
    <>
      <ListPage type='projects' title='PROJECT' description='' parsedItems={parsedProject} />
    </>
  )
}
