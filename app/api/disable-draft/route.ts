import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(req: Request) {
  const draft = await draftMode()
  draft.disable()

  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')

  redirect(url || '/')
}
