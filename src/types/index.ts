//@/types/index.ts

// ✅ Item 타입 정의
export interface Item {
  id: string
  properties: {
    name?: { title: { plain_text: string }[] }
    thumbnail?: { files: { file: { url: string } }[] }
    category?: { select: { name: string } }
    slug?: { rich_text: { plain_text: string }[] }
    createdTime?: { created_time: string }
    lastEditedTime?: { last_edited_time: string }
  }
}
