// src/app/page.tsx

import { getParsedItemsByTableType } from '@/api/notion'
import HomeClient from '@/app/HomeClient'

export const revalidate = 30 // 30초마다 데이터 갱신 (자동 업데이트)

export default async function Index() {
  const parsedProject = await getParsedItemsByTableType('project')

  return (
    <>
      <HomeClient projectItems={parsedProject} />
    </>
  )
}
