// Public article adapted from Roon's internal presentation on knowledge management.
// No internal system, programme, team or colleague names: keep it that way.
import type { L } from './content';

export type Block =
  | { type: 'p'; text: L }
  | { type: 'list'; items: L[] }
  | { type: 'compare'; left: { title: L; text: L }; right: { title: L; text: L } }
  | { type: 'grid'; items: { title: L; text: L }[] }
  | { type: 'project'; id: 'migroo' | 'privasearch'; text: L };

export const article = {
  slug: 'knowledge-management-ai',
  title: {
    en: 'Knowledge management with AI: from scattered documents to sourced answers',
    fr: 'Knowledge management avec l’IA : des documents dispersés aux réponses sourcées',
  } as L,
  dek: {
    en: 'How I approach an enterprise knowledge assistant: the problem, the architecture, the safeguards, how to measure it, and where Migroo and PrivaSearch fit.',
    fr: 'Ma démarche pour un assistant de connaissances en entreprise : le problème, l’architecture, les garde-fous, la mesure, et la place de Migroo et PrivaSearch.',
  } as L,
  date: { en: 'April 2026', fr: 'Avril 2026' } as L,
  origin: {
    en: 'Adapted from a strategy presentation I gave internally. Company-specific details have been removed.',
    fr: 'Adapté d’une présentation stratégique que j’ai donnée en interne. Les éléments propres à l’entreprise ont été retirés.',
  } as L,
  sections: [
    {
      title: { en: 'The problem: knowledge lives everywhere', fr: 'Le problème : la connaissance est partout' },
      blocks: [
        { type: 'p', text: {
          en: 'In a large organisation, the answer to a simple question is often split across shared Word and PDF files, Excel reference sheets, email threads, meeting notes and chat groups. A large part of what matters is never written down: it sits in the heads of a few experts, and leaves with them.',
          fr: 'Dans une grande organisation, la réponse à une question simple est souvent éclatée entre des fichiers Word et PDF partagés, des fichiers Excel de référence, des fils d’e-mails, des comptes rendus et des groupes de discussion. Une grande partie de l’essentiel n’est jamais écrite : elle est dans la tête de quelques experts, et part avec eux.',
        } },
        { type: 'p', text: {
          en: 'Wikis and intranets rarely fix this. Contributing takes effort, content goes stale, and people end up asking a colleague in a chat, where the answer disappears into the history.',
          fr: 'Les wikis et intranets règlent rarement le problème. Contribuer demande un effort, le contenu vieillit, et chacun finit par demander à un collègue sur une messagerie, où la réponse se perd dans l’historique.',
        } },
      ] as Block[],
    },
    {
      title: { en: 'The approach: answers grounded in the documents', fr: 'L’approche : des réponses ancrées dans les documents' },
      blocks: [
        { type: 'p', text: {
          en: 'Retrieval-augmented generation (RAG) changes the equation. The assistant first retrieves the relevant passages from the organisation’s own documents, then writes an answer from those passages only, with references the reader can check.',
          fr: 'Le RAG (retrieval-augmented generation) change la donne. L’assistant retrouve d’abord les passages pertinents dans les documents de l’organisation, puis rédige une réponse à partir de ces seuls passages, avec des références vérifiables.',
        } },
        { type: 'compare',
          left: { title: { en: 'LLM alone', fr: 'LLM seul' }, text: { en: 'Answers from general knowledge. The reply sounds plausible but is generic, and nothing links it to the company’s actual rules.', fr: 'Répond avec ses connaissances générales. La réponse semble plausible mais reste générique, sans lien avec les règles réelles de l’entreprise.' } },
          right: { title: { en: 'LLM + RAG', fr: 'LLM + RAG' }, text: { en: 'Answers from the retrieved passages and cites the section it relies on. If nothing relevant is found, it says so instead of inventing.', fr: 'Répond à partir des passages retrouvés et cite la section sur laquelle il s’appuie. Si rien de pertinent n’est trouvé, il le dit au lieu d’inventer.' } },
        },
      ] as Block[],
    },
    {
      title: { en: 'Ingestion: where quality is decided', fr: 'L’ingestion : là où se joue la qualité' },
      blocks: [
        { type: 'p', text: {
          en: 'Garbage in, garbage out. A badly split document produces vague answers, whatever the model. Most of the work therefore happens before any question is asked: connecting the sources, parsing each format properly, choosing how to chunk, and attaching rich metadata to every chunk.',
          fr: 'Garbage in, garbage out. Un document mal découpé produit des réponses imprécises, quel que soit le modèle. L’essentiel du travail se fait donc avant la première question : connecter les sources, parser correctement chaque format, choisir le découpage et attacher des métadonnées riches à chaque passage.',
        } },
        { type: 'list', items: [
          { en: 'Parent/child chunking: small chunks for precise matching, larger parent chunks sent to the model for context.', fr: 'Découpage parent/enfant : de petits passages pour un appariement précis, des passages parents plus larges transmis au modèle pour le contexte.' },
          { en: 'Metadata on every chunk: source, section, date, and who is allowed to read it.', fr: 'Des métadonnées sur chaque passage : source, section, date, et qui a le droit de le lire.' },
          { en: 'Incremental ingestion, so the index follows the documents as they change.', fr: 'Une ingestion incrémentale, pour que l’index suive les documents quand ils changent.' },
        ] },
        { type: 'project', id: 'migroo', text: {
          en: 'Migroo is my implementation of this layer: parsing, parent/child chunking, granular metadata down to page, paragraph and line, embeddings and indexing in Qdrant, exposed through a FastAPI API.',
          fr: 'Migroo est mon implémentation de cette couche : parsing, découpage parent/enfant, métadonnées granulaires jusqu’à la page, au paragraphe et à la ligne, embeddings et indexation dans Qdrant, exposés via une API FastAPI.',
        } },
      ] as Block[],
    },
    {
      title: { en: 'Retrieval beyond naive RAG', fr: 'Un retrieval au-delà du RAG naïf' },
      blocks: [
        { type: 'p', text: {
          en: 'Simple vector search misses exact terms such as table names, codes and acronyms. Several techniques improve precision; I start with the ones that pay off most on technical documentation.',
          fr: 'La recherche vectorielle simple rate les termes exacts : noms de tables, codes, acronymes. Plusieurs techniques améliorent la précision ; je commence par celles qui rapportent le plus sur de la documentation technique.',
        } },
        { type: 'grid', items: [
          { title: { en: 'Hybrid search', fr: 'Recherche hybride' }, text: { en: 'BM25 keywords plus dense vectors, merged with reciprocal rank fusion. Used in Migroo.', fr: 'Mots-clés BM25 et vecteurs denses, fusionnés par RRF. Utilisée dans Migroo.' } },
          { title: { en: 'Query rewriting', fr: 'Réécriture de requête' }, text: { en: 'The model rephrases the question before searching.', fr: 'Le modèle reformule la question avant de chercher.' } },
          { title: { en: 'Re-ranking', fr: 'Re-ranking' }, text: { en: 'A second pass reorders the retrieved chunks by real relevance.', fr: 'Une seconde passe réordonne les passages retrouvés selon leur pertinence réelle.' } },
          { title: { en: 'Knowledge graphs', fr: 'Graphes de connaissances' }, text: { en: 'Connect entities across documents for relational questions.', fr: 'Relier les entités entre documents pour les questions relationnelles.' } },
        ] },
      ] as Block[],
    },
    {
      title: { en: 'Safeguards from day one', fr: 'Des garde-fous dès le premier jour' },
      blocks: [
        { type: 'list', items: [
          { en: 'Permissions are enforced in the vector database, before anything reaches the model: a user never gets an answer built from a document they cannot open.', fr: 'Les droits sont appliqués dans la base vectorielle, avant que quoi que ce soit n’atteigne le modèle : un utilisateur n’obtient jamais une réponse tirée d’un document qu’il ne peut pas ouvrir.' },
          { en: 'Mandatory citations, and an explicit “I could not find this” when the sources are not enough.', fr: 'Des citations obligatoires, et un « je n’ai pas trouvé » explicite quand les sources ne suffisent pas.' },
          { en: 'Confidentiality, integrity, availability and compliance assessed at design time, including prompt injection risks.', fr: 'Confidentialité, intégrité, disponibilité et conformité évaluées dès la conception, y compris les risques de prompt injection.' },
        ] },
        { type: 'project', id: 'privasearch', text: {
          en: 'When documents cannot leave the company at all, PrivaSearch keeps the whole chain on premise: local embeddings, local index and a local model, with grounding prompts that limit hallucinations.',
          fr: 'Quand les documents ne peuvent pas quitter l’entreprise, PrivaSearch garde toute la chaîne on-premise : embeddings, index et modèle locaux, avec des prompts de grounding qui limitent les hallucinations.',
        } },
      ] as Block[],
    },
    {
      title: { en: 'Measure before you scale', fr: 'Mesurer avant d’étendre' },
      blocks: [
        { type: 'p', text: {
          en: 'Success criteria are set before the pilot starts, not after. I track two families of indicators.',
          fr: 'Les critères de succès se fixent avant le pilote, pas après. Je suis deux familles d’indicateurs.',
        } },
        { type: 'grid', items: [
          { title: { en: 'Usage', fr: 'Usage' }, text: { en: 'Queries per day, adoption and return rate, rephrased questions, and questions left unanswered.', fr: 'Requêtes par jour, adoption et taux de retour, questions reformulées, questions restées sans réponse.' } },
          { title: { en: 'Quality', fr: 'Qualité' }, text: { en: 'Automated evaluation on a reference set of questions validated by business experts: faithfulness to sources, answer relevance, context precision and recall.', fr: 'Évaluation automatisée sur un jeu de questions de référence validé par les experts métier : fidélité aux sources, pertinence, précision et rappel du contexte.' } },
        ] },
        { type: 'p', text: {
          en: 'Typical go/no-go targets for a first pilot: user satisfaction of at least 70%, a measured drop in search time, zero critical hallucination on business rules, and an answer in a few seconds.',
          fr: 'Cibles de décision typiques pour un premier pilote : au moins 70 % de satisfaction, une baisse mesurée du temps de recherche, zéro hallucination critique sur les règles métier, et une réponse en quelques secondes.',
        } },
      ] as Block[],
    },
    {
      title: { en: 'Start small', fr: 'Commencer petit' },
      blocks: [
        { type: 'list', items: [
          { en: 'One high-value, low-complexity use case, with a curated corpus rather than everything at once.', fr: 'Un cas d’usage à forte valeur et faible complexité, avec un corpus choisi plutôt que tout d’un coup.' },
          { en: 'A small group of motivated users giving feedback from day one.', fr: 'Un petit groupe d’utilisateurs motivés qui donnent leur avis dès le premier jour.' },
          { en: 'A pilot capped at about three months; beyond that it becomes a project.', fr: 'Un pilote limité à environ trois mois ; au-delà, il devient un projet.' },
          { en: 'Then extend by phases: more sources, permissions across the organisation, then agents that reason over the knowledge base.', fr: 'Puis étendre par phases : plus de sources, des droits sur toute l’organisation, puis des agents qui raisonnent sur la base de connaissances.' },
        ] },
        { type: 'p', text: {
          en: 'Knowledge management with AI is less a technology project than a discipline: start small, measure everything, and keep every answer traceable.',
          fr: 'Le knowledge management avec l’IA est moins un projet technologique qu’une discipline : commencer petit, tout mesurer, et garder chaque réponse traçable.',
        } },
      ] as Block[],
    },
  ],
};
