const FRONTEND_ORIGIN = 'https://master.premierdis-frontend-6ve.pages.dev';

export async function OPTIONS() {
  const headers = {
    'Access-Control-Allow-Origin': FRONTEND_ORIGIN,
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  };
  return new Response(null, { status: 204, headers });
}

export async function GET() {
  const body = { status: 'ok', timestamp: new Date().toISOString() };
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': FRONTEND_ORIGIN,
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
  };
  return new Response(JSON.stringify(body), { status: 200, headers });
}