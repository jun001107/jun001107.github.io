interface Env {
  GEMINI_API_KEY: string;
  GEMINI_MODEL?: string;
  ALLOWED_ORIGINS?: string;
}

const DEFAULT_ALLOWED_ORIGINS = new Set([
  'https://junghoon.github.io',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
]);

const MAX_BODY_BYTES = 64 * 1024;

const jsonResponse = (data: unknown, init: ResponseInit, corsHeaders: HeadersInit = {}) => {
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json; charset=utf-8');
  headers.set('Cache-Control', 'no-store');
  for (const [key, value] of Object.entries(corsHeaders)) {
    headers.set(key, value as string);
  }
  return new Response(JSON.stringify(data), { ...init, headers });
};

const getAllowedOrigins = (env: Env) => {
  if (!env.ALLOWED_ORIGINS) {
    return DEFAULT_ALLOWED_ORIGINS;
  }

  const parsed = env.ALLOWED_ORIGINS.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return new Set(parsed);
};

const getCorsHeaders = (origin: string | null, allowedOrigins: Set<string>) => {
  if (!origin || !allowedOrigins.has(origin)) {
    return {};
  }

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  } as const;
};

const parseJsonBody = async (request: Request) => {
  const contentLength = request.headers.get('content-length');
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return { error: 'Payload too large', status: 413 } as const;
  }

  const bodyText = await request.text();
  const bodySize = new TextEncoder().encode(bodyText).length;
  if (bodySize > MAX_BODY_BYTES) {
    return { error: 'Payload too large', status: 413 } as const;
  }

  try {
    return { data: JSON.parse(bodyText) } as const;
  } catch {
    return { error: 'Invalid JSON', status: 400 } as const;
  }
};

const isValidModel = (model: string) => /^[a-z0-9._-]+$/i.test(model);

const extractText = (payload: any) => {
  const candidate = payload?.candidates?.[0];
  const parts = candidate?.content?.parts;
  if (!Array.isArray(parts)) return '';
  return parts.map((part: any) => part?.text).filter(Boolean).join('');
};

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    if (url.pathname !== '/gemini' && url.pathname !== '/gemini/') {
      return new Response('Not Found', { status: 404 });
    }

    const origin = request.headers.get('Origin');
    const allowedOrigins = getAllowedOrigins(env);
    const corsHeaders = getCorsHeaders(origin, allowedOrigins);

    if (request.method === 'OPTIONS') {
      if (!origin || !allowedOrigins.has(origin)) {
        return new Response(null, { status: 403 });
      }

      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
    }

    if (origin && !allowedOrigins.has(origin)) {
      return jsonResponse({ error: 'Origin not allowed' }, { status: 403 }, corsHeaders);
    }

    if (!env.GEMINI_API_KEY) {
      return jsonResponse({ error: 'Server misconfigured' }, { status: 500 }, corsHeaders);
    }

    const parsed = await parseJsonBody(request);
    if ('error' in parsed) {
      return jsonResponse({ error: parsed.error }, { status: parsed.status }, corsHeaders);
    }

    const payload = parsed.data as {
      message?: unknown;
      prompt?: unknown;
      history?: unknown;
      systemInstruction?: unknown;
      model?: unknown;
    };

    const message = typeof payload.message === 'string'
      ? payload.message
      : typeof payload.prompt === 'string'
        ? payload.prompt
        : '';

    if (!message.trim()) {
      return jsonResponse({ error: 'message is required' }, { status: 400 }, corsHeaders);
    }

    const model = typeof payload.model === 'string' && payload.model.trim()
      ? payload.model.trim()
      : env.GEMINI_MODEL || 'gemini-2.5-flash';

    if (!isValidModel(model)) {
      return jsonResponse({ error: 'Invalid model name' }, { status: 400 }, corsHeaders);
    }

    const rawHistory = Array.isArray(payload.history) ? payload.history : [];
    const contents = rawHistory
      .filter((entry) => entry && typeof entry === 'object')
      .map((entry) => {
        const role = (entry as { role?: unknown }).role;
        const content = (entry as { content?: unknown }).content;
        if ((role !== 'user' && role !== 'model') || typeof content !== 'string') {
          return null;
        }
        return { role, parts: [{ text: content }] };
      })
      .filter(Boolean) as Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>;

    contents.push({ role: 'user', parts: [{ text: message }] });

    const systemInstruction = typeof payload.systemInstruction === 'string'
      ? payload.systemInstruction
      : '';

    const geminiRequest: Record<string, unknown> = {
      contents,
    };

    if (systemInstruction.trim()) {
      geminiRequest.systemInstruction = { parts: [{ text: systemInstruction }] };
    }

    let upstreamResponse: Response;
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
        model,
      )}:generateContent?key=${env.GEMINI_API_KEY}`;

      upstreamResponse = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(geminiRequest),
      });
    } catch {
      return jsonResponse({ error: 'Upstream request failed' }, { status: 502 }, corsHeaders);
    }

    const upstreamText = await upstreamResponse.text();
    let upstreamData: any = null;
    if (upstreamText) {
      try {
        upstreamData = JSON.parse(upstreamText);
      } catch {
        upstreamData = null;
      }
    }

    if (!upstreamResponse.ok) {
      const upstreamMessage = upstreamData?.error?.message || `Gemini API error (${upstreamResponse.status})`;
      const status = upstreamResponse.status >= 500 ? 502 : upstreamResponse.status;
      return jsonResponse({ error: upstreamMessage }, { status }, corsHeaders);
    }

    const text = extractText(upstreamData);

    return jsonResponse({ text, raw: upstreamData }, { status: 200 }, corsHeaders);
  },
};
