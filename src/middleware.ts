import { defineMiddleware } from 'astro:middleware';

// Content is written in both languages (see lib/i18n.ts). Each built page keeps only its own
// language, so search engines, ATS and AI readers see one clean text with no duplicates.
export const onRequest = defineMiddleware(async (ctx, next) => {
  const res = await next();
  if (!(res.headers.get('content-type') ?? '').includes('text/html')) return res;
  const lang = /^\/fr(\/|$)/.test(ctx.url.pathname) ? 'fr' : 'en';
  const other = lang === 'fr' ? 'en' : 'fr';
  const html = (await res.text())
    .replace(new RegExp(`<span class="l-${other}">[^<]*</span>`, 'g'), '')
    .replace(new RegExp(`<text [^>]*class="[^"]*l-${other}"[^>]*>[^<]*</text>`, 'g'), '')
    .replace(new RegExp(`<span class="l-${lang}">([^<]*)</span>`, 'g'), '$1');
  return new Response(html, { status: res.status, headers: res.headers });
});
