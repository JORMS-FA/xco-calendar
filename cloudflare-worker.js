const OLLAMA_HOST = 'https://ollama.com';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    if (request.method !== 'POST' || url.pathname !== '/api/chat') {
      return new Response('Not found', { status: 404, headers: corsHeaders });
    }

    if (!env.OLLAMA_API_KEY) {
      return new Response('Missing OLLAMA_API_KEY secret', { status: 500, headers: corsHeaders });
    }

    const upstream = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.OLLAMA_API_KEY}`,
      },
      body: await request.text(),
    });

    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: {
        ...corsHeaders,
        'Content-Type': upstream.headers.get('Content-Type') || 'application/json',
      },
    });
  },
};
