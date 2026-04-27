import { getStore } from '@netlify/blobs';
import { createHash } from 'node:crypto';

const adminCredentialHash = '985ea6da09ca9412c7af3ae6ba0283ab34a63efd34d54275c9db8e1a1d87b48d';
const contentKey = 'site-content';

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'content-type': 'application/json',
    'cache-control': 'no-store'
  },
  body: JSON.stringify(body)
});

const hashCredential = (email, password) => {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  return createHash('sha256').update(`${normalizedEmail}:${password || ''}`).digest('hex');
};

export const handler = async event => {
  const store = getStore('sprintsales-content');

  if (event.httpMethod === 'GET') {
    const content = await store.get(contentKey, { type: 'json' });
    return json(200, content || {});
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid JSON body' });
  }

  const authorized = hashCredential(payload.email, payload.password) === adminCredentialHash;
  if (!authorized) {
    return json(401, { error: 'Unauthorized' });
  }

  const content = {
    heroSlides: Array.isArray(payload.heroSlides) ? payload.heroSlides.slice(0, 5) : undefined,
    aboutContent: payload.aboutContent && typeof payload.aboutContent === 'object' ? payload.aboutContent : undefined,
    teamContent: Array.isArray(payload.teamContent) ? payload.teamContent.slice(0, 8) : undefined,
    portfolioContent: Array.isArray(payload.portfolioContent) ? payload.portfolioContent.slice(0, 12) : undefined,
    updatedAt: new Date().toISOString()
  };

  Object.keys(content).forEach(key => {
    if (content[key] === undefined) delete content[key];
  });

  const existing = await store.get(contentKey, { type: 'json' }) || {};
  const next = { ...existing, ...content };
  await store.setJSON(contentKey, next);

  return json(200, next);
};
