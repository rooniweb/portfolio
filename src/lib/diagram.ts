// Tiny SVG diagram builder. Colours come from CSS classes (theme tokens), and every
// label exists in English and French (CSS shows the active language).
import type { L } from '../data/content';

export type Node = {
  x: number; y: number; w: number; h: number;
  label: L; sub?: L;
  kind?: 'step' | 'store' | 'accent' | 'io';
};
export type Group = { x: number; y: number; w: number; h: number; label: L; kind?: 'zone' | 'boundary'; labelEnd?: boolean };
export type Edge = { points: [number, number][]; label?: L; at?: [number, number]; dashed?: boolean };

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' } as Record<string, string>)[c]);

function text(x: number, y: number, l: L, cls: string, anchor = 'middle') {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" class="${cls} l-en">${esc(l.en)}</text>` +
    `<text x="${x}" y="${y}" text-anchor="${anchor}" class="${cls} l-fr">${esc(l.fr)}</text>`;
}

function node(n: Node) {
  const cx = n.x + n.w / 2, cy = n.y + n.h / 2;
  const kind = n.kind ?? 'step';
  let shape: string;
  if (kind === 'store') {
    const r = 9;
    shape = `<path class="dg-store" d="M${n.x} ${n.y + r} a${n.w / 2} ${r} 0 0 1 ${n.w} 0 v${n.h - 2 * r} a${n.w / 2} ${r} 0 0 1 ${-n.w} 0 Z"/>` +
      `<path class="dg-store-top" d="M${n.x} ${n.y + r} a${n.w / 2} ${r} 0 0 0 ${n.w} 0"/>`;
  } else {
    const rx = kind === 'io' ? n.h / 2 : 10;
    shape = `<rect class="dg-${kind}" x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="${rx}"/>`;
  }
  const lc = kind === 'accent' ? 'dg-label on' : 'dg-label';
  const sc = kind === 'accent' ? 'dg-sub on' : 'dg-sub';
  const off = kind === 'store' ? 5 : 0;
  const body = n.sub
    ? text(cx, cy - 4 + off, n.label, lc) + text(cx, cy + 15 + off, n.sub, sc)
    : text(cx, cy + 5 + off, n.label, lc);
  return `<g>${shape}${body}</g>`;
}

function group(g: Group) {
  const cls = g.kind === 'boundary' ? 'dg-boundary' : 'dg-zone';
  return `<rect class="${cls}" x="${g.x}" y="${g.y}" width="${g.w}" height="${g.h}" rx="16"/>` +
    (g.labelEnd ? text(g.x + g.w - 16, g.y + 24, g.label, 'dg-group', 'end') : text(g.x + 16, g.y + 24, g.label, 'dg-group', 'start'));
}

function edge(e: Edge) {
  const d = e.points.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ');
  let out = `<path class="dg-edge${e.dashed ? ' dashed' : ''}" d="${d}" marker-end="url(#dg-arrow)"/>`;
  if (e.label) {
    const [x, y] = e.at ?? e.points[Math.floor(e.points.length / 2)];
    out += text(x, y, e.label, 'dg-edge-label');
  }
  return out;
}

export function diagram(o: { w: number; h: number; title: L; groups?: Group[]; nodes: Node[]; edges: Edge[] }) {
  return `<svg class="dg" viewBox="0 0 ${o.w} ${o.h}" role="img" aria-label="${esc(o.title.en)}" xmlns="http://www.w3.org/2000/svg">` +
    `<defs><marker id="dg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="dg-arrowhead" d="M0 0 L10 5 L0 10 z"/></marker></defs>` +
    (o.groups ?? []).map(group).join('') +
    o.edges.map(edge).join('') +
    o.nodes.map(node).join('') +
    `</svg>`;
}
