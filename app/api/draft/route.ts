import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')
  const secret = searchParams.get('secret')

  if (secret !== process.env.PAYLOAD_PUBLIC_DRAFT_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  if (!url) {
    return new Response('No URL provided', { status: 400 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(url)
}
