import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const OPTIONS = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
    const sort = qp.get('sort') || 'order'

    const result = await payload.find({
      collection: 'what-wedo-final',
      limit,
      depth,
      sort,
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

export const POST = async (request: Request) => {
  const payload = await getPayload({ config: configPromise })

  try {
    const body = await request.json()

    const result = await (payload as any).create({
      collection: 'what-wedo-final',
      data: body,
    })

    return new Response(JSON.stringify(result), {
      status: 201,
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

