// Dedicated "how it works" pages. Keep every statement factual: these pages are read
// by recruiters next to the CV.
import type { L } from './content';
import { diagram } from '../lib/diagram';

export type Detail = {
  slug: string;
  projectId: string; // matches projects[].id in content.ts
  lead: L;
  diagramTitle: L;
  svg: string;
  steps: { title: L; text: L }[];
  example?: { caption: L; code: string };
  notes?: L[];
};

const W = 140, H = 64;
const row = (y: number, xs: number[]) => xs.map((x) => ({ x, y, w: W, h: H }));

// ---------- Migroo ----------
const m1 = row(66, [34, 192, 350, 508, 666, 818]);
const m2 = row(312, [34, 192, 350, 508, 666, 818]);
const migrooSvg = diagram({
  w: 992, h: 420,
  title: { en: 'Migroo pipeline', fr: 'Pipeline Migroo' },
  groups: [
    { x: 14, y: 14, w: 964, h: 140, label: { en: 'Indexing · runs locally', fr: 'Indexation · tourne en local' } },
    { x: 14, y: 262, w: 964, h: 140, label: { en: 'Answering a question · FastAPI API', fr: 'Répondre à une question · API FastAPI' } },
  ],
  nodes: [
    { ...m1[0], kind: 'io', label: { en: 'Sources', fr: 'Sources' }, sub: { en: 'documents', fr: 'documents' } },
    { ...m1[1], label: { en: 'Parsing', fr: 'Parsing' }, sub: { en: 'text, pages, lines', fr: 'texte, pages, lignes' } },
    { ...m1[2], label: { en: 'Chunking', fr: 'Chunking' }, sub: { en: 'parent / child', fr: 'parent / enfant' } },
    { ...m1[3], label: { en: 'Metadata', fr: 'Métadonnées' }, sub: { en: 'page · ¶ · line', fr: 'page · ¶ · ligne' } },
    { ...m1[4], label: { en: 'Embeddings', fr: 'Embeddings' }, sub: { en: 'child chunks', fr: 'passages enfants' } },
    { ...m1[5], kind: 'store', label: { en: 'Qdrant', fr: 'Qdrant' }, sub: { en: 'vectors + payload', fr: 'vecteurs + payload' } },
    { ...m2[0], kind: 'io', label: { en: 'Question', fr: 'Question' } },
    { ...m2[1], label: { en: 'Hybrid retrieval', fr: 'Retrieval hybride' }, sub: { en: 'dense + BM25', fr: 'dense + BM25' } },
    { ...m2[2], label: { en: 'RRF fusion', fr: 'Fusion RRF' }, sub: { en: 'one ranking', fr: 'un seul classement' } },
    { ...m2[3], label: { en: 'Parent context', fr: 'Contexte parent' }, sub: { en: 'larger chunks', fr: 'passages larges' } },
    { ...m2[4], kind: 'accent', label: { en: 'LLM', fr: 'LLM' }, sub: { en: 'hosted by default', fr: 'hébergé par défaut' } },
    { ...m2[5], kind: 'io', label: { en: 'Answer', fr: 'Réponse' }, sub: { en: 'with citations', fr: 'avec citations' } },
  ],
  edges: [
    ...[0, 1, 2, 3, 4].map((i) => ({ points: [[m1[i].x + W, 98], [m1[i + 1].x - 2, 98]] as [number, number][] })),
    ...[0, 1, 2, 3, 4].map((i) => ({ points: [[m2[i].x + W, 344], [m2[i + 1].x - 2, 344]] as [number, number][] })),
    {
      points: [[888, 130], [888, 208], [262, 208], [262, 310]],
      label: { en: 'search filtered by document owner', fr: 'recherche filtrée par propriétaire' }, at: [575, 200],
    },
  ],
});

// ---------- PrivaSearch ----------
const p1 = row(70, [34, 192, 350, 508]);
const p2 = row(270, [34, 192, 350, 508, 666, 818]);
const privaSvg = diagram({
  w: 992, h: 376,
  title: { en: 'PrivaSearch architecture', fr: 'Architecture PrivaSearch' },
  groups: [
    { x: 14, y: 14, w: 964, h: 348, kind: 'boundary', label: { en: 'On premise · documents and questions stay inside', fr: 'On-premise · documents et questions restent en interne' } },
  ],
  nodes: [
    { ...p1[0], kind: 'io', label: { en: 'Documents', fr: 'Documents' } },
    { ...p1[1], label: { en: 'Migroo', fr: 'Migroo' }, sub: { en: 'ingestion', fr: 'ingestion' } },
    { ...p1[2], label: { en: 'Embeddings', fr: 'Embeddings' }, sub: { en: 'nomic-embed-text', fr: 'nomic-embed-text' } },
    { ...p1[3], kind: 'store', label: { en: 'ChromaDB', fr: 'ChromaDB' }, sub: { en: 'local index', fr: 'index local' } },
    { ...p2[0], kind: 'io', label: { en: 'Question', fr: 'Question' } },
    { ...p2[1], label: { en: 'Embed query', fr: 'Vectoriser' }, sub: { en: 'nomic-embed-text', fr: 'nomic-embed-text' } },
    { ...p2[2], label: { en: 'Search', fr: 'Recherche' }, sub: { en: 'semantic, top-k', fr: 'sémantique, top-k' } },
    { ...p2[3], label: { en: 'Grounding', fr: 'Grounding' }, sub: { en: 'context only', fr: 'contexte seul' } },
    { ...p2[4], kind: 'accent', label: { en: 'Local LLM', fr: 'LLM local' }, sub: { en: 'Ollama', fr: 'Ollama' } },
    { ...p2[5], kind: 'io', label: { en: 'Answer', fr: 'Réponse' } },
  ],
  edges: [
    ...[0, 1, 2].map((i) => ({ points: [[p1[i].x + W, 102], [p1[i + 1].x - 2, 102]] as [number, number][] })),
    ...[0, 1, 2, 3, 4].map((i) => ({ points: [[p2[i].x + W, 302], [p2[i + 1].x - 2, 302]] as [number, number][] })),
    { points: [[578, 134], [578, 196], [420, 196], [420, 268]], label: { en: 'nearest vectors', fr: 'vecteurs les plus proches' }, at: [499, 188] },
  ],
});

// ---------- Orange Money AI Agent ----------
const agentSvg = diagram({
  w: 992, h: 420,
  title: { en: 'ReAct agent loop', fr: 'Boucle de l’agent ReAct' },
  groups: [
    { x: 214, y: 14, w: 480, h: 392, label: { en: 'LangGraph state graph · ReAct loop', fr: 'Graphe d’états LangGraph · boucle ReAct' } },
  ],
  nodes: [
    { x: 30, y: 110, w: W, h: H, kind: 'io', label: { en: 'Request', fr: 'Demande' }, sub: { en: 'natural language', fr: 'langage naturel' } },
    { x: 30, y: 270, w: W, h: H, kind: 'io', label: { en: 'Final answer', fr: 'Réponse finale' } },
    { x: 262, y: 190, w: W, h: H, kind: 'accent', label: { en: 'Reason', fr: 'Raisonner' }, sub: { en: 'LLM decides', fr: 'le LLM décide' } },
    { x: 506, y: 80, w: W, h: H, label: { en: 'Act', fr: 'Agir' }, sub: { en: 'tool call', fr: 'appel d’outil' } },
    { x: 506, y: 300, w: W, h: H, label: { en: 'Observe', fr: 'Observer' }, sub: { en: 'tool result', fr: 'résultat de l’outil' } },
    { x: 784, y: 80, w: W + 20, h: H, label: { en: 'FastMCP server', fr: 'Serveur FastMCP' }, sub: { en: 'tools over MCP', fr: 'outils via MCP' } },
    { x: 784, y: 280, w: W + 20, h: H + 6, kind: 'store', label: { en: 'Sandbox API', fr: 'API sandbox' }, sub: { en: 'test environment', fr: 'environnement de test' } },
  ],
  edges: [
    { points: [[170, 142], [214, 142], [214, 210], [260, 210]] },
    { points: [[332, 190], [332, 112], [504, 112]], label: { en: 'tool + arguments', fr: 'outil + arguments' }, at: [418, 104] },
    { points: [[646, 112], [782, 112]] },
    { points: [[864, 144], [864, 278]] },
    { points: [[784, 332], [648, 332]] },
    { points: [[506, 332], [332, 332], [332, 256]], label: { en: 'loop until enough', fr: 'boucle jusqu’à suffisance' }, at: [420, 324] },
    { points: [[262, 236], [236, 236], [236, 302], [172, 302]], label: { en: 'done', fr: 'terminé' }, at: [200, 292] },
  ],
});

export const details: Detail[] = [
  {
    slug: 'migroo',
    projectId: 'migroo',
    lead: {
      en: 'Migroo turns a pile of enterprise documents into an index that an LLM can quote from precisely. Every chunk carries where it came from, down to the line, so each answer can point back to its source.',
      fr: 'Migroo transforme un ensemble de documents d’entreprise en un index qu’un LLM peut citer avec précision. Chaque passage garde sa provenance jusqu’à la ligne, pour que chaque réponse renvoie à sa source.',
    },
    diagramTitle: { en: 'Two halves: indexing once, answering on demand', fr: 'Deux moitiés : indexer une fois, répondre à la demande' },
    svg: migrooSvg,
    steps: [
      { title: { en: 'Parse the sources', fr: 'Parser les sources' }, text: { en: 'Documents are read into text while keeping their structure: pages, paragraphs and lines.', fr: 'Les documents sont convertis en texte en conservant leur structure : pages, paragraphes et lignes.' } },
      { title: { en: 'Chunk in two sizes', fr: 'Découper en deux tailles' }, text: { en: 'Small child chunks (about 512 characters) are embedded for precise matching. Each one points to a larger parent chunk (about 2,048 characters) that gives the LLM enough context.', fr: 'De petits passages enfants (environ 512 caractères) sont vectorisés pour un appariement précis. Chacun pointe vers un passage parent plus large (environ 2 048 caractères) qui donne au LLM assez de contexte.' } },
      { title: { en: 'Attach provenance', fr: 'Attacher la provenance' }, text: { en: 'Each chunk stores its document, page, paragraph, line, position and provenance as metadata in Qdrant, next to its vector.', fr: 'Chaque passage enregistre document, page, paragraphe, ligne, position et provenance comme métadonnées dans Qdrant, à côté de son vecteur.' } },
      { title: { en: 'Retrieve two ways, then fuse', fr: 'Chercher de deux façons, puis fusionner' }, text: { en: 'A question runs through dense vector search and BM25 keyword search. Reciprocal rank fusion merges both rankings, so exact terms and paraphrases are both found.', fr: 'Une question passe par une recherche vectorielle dense et une recherche BM25 par mots-clés. La fusion RRF combine les deux classements : les termes exacts comme les reformulations sont retrouvés.' } },
      { title: { en: 'Answer with citations', fr: 'Répondre avec citations' }, text: { en: 'The parent chunks go to the LLM as context. Because every chunk carries its metadata, the answer can cite the exact page and paragraph it relies on.', fr: 'Les passages parents sont transmis au LLM comme contexte. Comme chaque passage porte ses métadonnées, la réponse peut citer la page et le paragraphe exacts sur lesquels elle s’appuie.' } },
    ],
    example: {
      caption: { en: 'Illustrative metadata stored with one child chunk', fr: 'Exemple illustratif des métadonnées d’un passage enfant' },
      code: `{
  "document": "procedure-manual.pdf",
  "page": 12,
  "paragraph": 3,
  "line": 41,
  "position": 2,
  "provenance": "shared-drive/operations",
  "owner": "team-a",
  "parent_id": "procedure-manual.pdf#p12-parent-1"
}`,
    },
  },
  {
    slug: 'privasearch',
    projectId: 'privasearch',
    lead: {
      en: 'PrivaSearch answers questions over internal documents without sending anything outside: embeddings, search and generation all run on local infrastructure.',
      fr: 'PrivaSearch répond aux questions sur des documents internes sans rien envoyer à l’extérieur : embeddings, recherche et génération tournent sur une infrastructure locale.',
    },
    diagramTitle: { en: 'Everything inside the boundary', fr: 'Tout reste dans le périmètre' },
    svg: privaSvg,
    steps: [
      { title: { en: 'Ingest with Migroo', fr: 'Ingérer avec Migroo' }, text: { en: 'Documents go through the Migroo pipeline: parsing, chunking and metadata.', fr: 'Les documents passent par le pipeline Migroo : parsing, découpage et métadonnées.' } },
      { title: { en: 'Embed locally', fr: 'Vectoriser en local' }, text: { en: 'Chunks are embedded with nomic-embed-text served by Ollama, then stored in a local ChromaDB index.', fr: 'Les passages sont vectorisés avec nomic-embed-text servi par Ollama, puis stockés dans un index ChromaDB local.' } },
      { title: { en: 'Search by meaning', fr: 'Chercher par le sens' }, text: { en: 'The question is embedded the same way, and semantic search returns the closest passages.', fr: 'La question est vectorisée de la même façon, et la recherche sémantique renvoie les passages les plus proches.' } },
      { title: { en: 'Ground the prompt', fr: 'Ancrer le prompt' }, text: { en: 'A grounding prompt tells the model to answer only from the retrieved context, which limits hallucinations.', fr: 'Un prompt de grounding demande au modèle de répondre uniquement à partir du contexte récupéré, ce qui limite les hallucinations.' } },
      { title: { en: 'Generate on site', fr: 'Générer sur place' }, text: { en: 'A local LLM served by Ollama writes the answer. No document or question leaves the infrastructure.', fr: 'Un LLM local servi par Ollama rédige la réponse. Aucun document ni aucune question ne quitte l’infrastructure.' } },
    ],
    notes: [
      { en: 'Built for teams whose documents cannot be sent to an external API.', fr: 'Pensé pour les équipes dont les documents ne peuvent pas partir vers une API externe.' },
    ],
  },
  {
    slug: 'orange-money-agent',
    projectId: 'agent',
    lead: {
      en: 'A personal project: an agent that reads a request, decides which tool to call, looks at the result and repeats until it can answer, all against a sandboxed API.',
      fr: 'Un projet personnel : un agent qui lit une demande, choisit l’outil à appeler, examine le résultat et recommence jusqu’à pouvoir répondre, le tout sur une API sandbox.',
    },
    diagramTitle: { en: 'Reason, act, observe, repeat', fr: 'Raisonner, agir, observer, recommencer' },
    svg: agentSvg,
    steps: [
      { title: { en: 'Read the request', fr: 'Lire la demande' }, text: { en: 'The user writes a request in plain language.', fr: 'L’utilisateur formule sa demande en langage courant.' } },
      { title: { en: 'Reason', fr: 'Raisonner' }, text: { en: 'The LLM reads the request and the tool descriptions, then decides the next step: call a tool or answer.', fr: 'Le LLM lit la demande et la description des outils, puis décide de l’étape suivante : appeler un outil ou répondre.' } },
      { title: { en: 'Act through MCP', fr: 'Agir via MCP' }, text: { en: 'The chosen tool is called with its arguments. A FastMCP server exposes the sandbox API operations as tools.', fr: 'L’outil choisi est appelé avec ses arguments. Un serveur FastMCP expose les opérations de l’API sandbox sous forme d’outils.' } },
      { title: { en: 'Observe and loop', fr: 'Observer et boucler' }, text: { en: 'The tool result is added to the graph state and the LLM reasons again, until it has what it needs.', fr: 'Le résultat de l’outil est ajouté à l’état du graphe et le LLM raisonne à nouveau, jusqu’à disposer de ce qu’il lui faut.' } },
      { title: { en: 'Answer', fr: 'Répondre' }, text: { en: 'The agent returns its final answer to the user.', fr: 'L’agent renvoie sa réponse finale à l’utilisateur.' } },
    ],
    notes: [
      { en: 'Most of the work went into the tool-use prompts: rewording tool descriptions to improve tool selection and reduce failed calls.', fr: 'L’essentiel du travail a porté sur les prompts d’usage d’outils : reformuler la description des outils pour mieux les choisir et réduire les appels en échec.' },
      { en: 'Runs against a sandbox API only: no real accounts or transactions are involved.', fr: 'Fonctionne uniquement sur une API sandbox : aucun compte ni aucune transaction réels ne sont concernés.' },
    ],
  },
];
