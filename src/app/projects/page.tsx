// src/app/local/page.tsx

import { getParsedItemsByTableType } from '@/api/notion'
import Client from './Client'

export const revalidate = 30 // 30초마다 데이터 갱신 (자동 업데이트)

export default async function Page() {
  const parsedProject = await getParsedItemsByTableType('project')

  return (
    <>
      <Client parsedProject={parsedProject} />
    </>
  )
}
