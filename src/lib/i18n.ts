import type { L } from '../data/content';

export const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' } as Record<string, string>)[c]);

// Renders both languages; CSS shows the active one.
export const t = (o: L | string) =>
  typeof o === 'string' ? esc(o) : `<span class="l-en">${esc(o.en)}</span><span class="l-fr">${esc(o.fr)}</span>`;

// Internal links: the real href is set for the build language, and the toggle script
// rewrites it (adds or drops the /fr prefix) when the visitor switches language.
export const href = (lang: 'en' | 'fr', path: string) => (lang === 'fr' ? '/fr' : '') + path;
