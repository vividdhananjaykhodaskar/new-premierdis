import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const OPTIONS = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export const GET = async (request: Request) => {
  const payload = await getPayload({ config: configPromise })

  try {
    const url = new URL(request.url)
    const qp = url.searchParams

    const limit = qp.get('limit') ? Number(qp.get('limit')) : 50
    const depth = qp.get('depth') ? Number(qp.get('depth')) : 1

    const result = await payload.find({
      collection: 'footer',
      limit,
      depth,
    })

    return new Response(JSON.stringify(result), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }
}
