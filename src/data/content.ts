// Single source of truth for the site. Every string exists in English and French.
// Facts here must match the CV and LinkedIn — edit with care.
// Content rules (see docs/refonte-portfolio-brief.md, section 4):
//  - never list a technology as mastered before a published project proves it;
//  - no internal system or programme name from a former employer;
//  - no figures for data volumes, no invented numbers.

export type L = { en: string; fr: string };

export const person = {
  name: 'Arona Ben Cherif Diatta',
  shortName: 'Arona Diatta',
  email: 'seydinaharoun@gmail.com',
  linkedin: 'https://www.linkedin.com/in/arona-diatta-b76541140',
  github: 'https://github.com/rooniweb',
  location: { en: 'Dakar, Senegal', fr: 'Dakar, Sénégal' } as L,
  role: { en: 'Freelance AI engineer', fr: 'Ingénieur IA freelance' } as L,
};

export const ui = {
  nav: {
    offer: { en: 'Services', fr: 'Offre' },
    demo: { en: 'Demo', fr: 'Démo' },
    cases: { en: 'Case studies', fr: 'Études de cas' },
    path: { en: 'Path', fr: 'Parcours' },
    stack: { en: 'Stack', fr: 'Stack' },
    articles: { en: 'Articles', fr: 'Articles' },
    contact: { en: 'Contact', fr: 'Contact' },
  },
  menu: { en: 'Menu', fr: 'Menu' },
  langSwitch: { en: 'Français', fr: 'English' },
  langSwitchLabel: { en: 'FR, lire cette page en français', fr: 'EN, read this page in English' },
  skip: { en: 'Skip to the demo', fr: 'Aller à la démo' },
  skipMain: { en: 'Skip to content', fr: 'Aller au contenu' },

  // 01 · Hero
  heroTitle: {
    en: 'RAG systems that cite their sources.',
    fr: 'Des systèmes RAG qui citent leurs sources.',
  },
  heroLead: {
    en: 'Freelance AI engineer, RAG and agents specialist: I design RAG systems, AI agents and the data pipelines that feed them, from prototype to production. Data scientist by training, future AI architect. Based in Dakar, on Paris and London time (GMT).',
    fr: 'Ingénieur IA freelance, expert RAG et agents : je conçois des systèmes RAG, des agents IA et les pipelines de données qui les alimentent, du prototype à la production. Data scientist de formation, architecte IA en devenir. Basé à Dakar, à l’heure de Paris et Londres (GMT).',
  },
  domains: { en: ['Data', 'AI', 'DevOps', 'Cloud'], fr: ['Data', 'IA', 'DevOps', 'Cloud'] },
  domainsLabel: { en: 'Areas of expertise', fr: 'Domaines d’expertise' },
  available: { en: 'Available for remote missions', fr: 'Disponible pour des missions en remote' },
  cta: { en: 'Let’s talk about your project', fr: 'Discutons de votre projet' },
  footnote: {
    en: 'This page is indexed by a hybrid retriever. Ask it a question',
    fr: 'Cette page est indexée par un retriever hybride. Posez-lui une question',
  },
  footnoteLabel: { en: 'Note 1: go to the demo', fr: 'Note 1 : aller à la démo' },
  photoAlt: { en: 'Portrait of Arona Ben Cherif Diatta', fr: 'Portrait d’Arona Ben Cherif Diatta' },
  factsLabel: { en: 'Verifiable facts', fr: 'Faits vérifiables' },

  // 02 · Offer
  offerTitle: { en: 'What I do', fr: 'Ce que je fais' },
  offerLead: {
    en: 'RAG is one tool among others. Most of the value comes from finding where a team loses time, then choosing the lightest thing that fixes it: an automation, a search engine or an agent.',
    fr: 'Le RAG est un outil parmi d’autres. L’essentiel de la valeur vient de repérer où une équipe perd du temps, puis de choisir la solution la plus légère qui règle le problème : une automatisation, un moteur de recherche ou un agent.',
  },
  seeCase: { en: 'See the case', fr: 'Voir le cas' },

  // 03 · Demo
  demoTitle: { en: 'Ask my track record', fr: 'Interrogez mon parcours' },
  demoLead: {
    en: 'This console runs a small hybrid retriever in your browser, over the content of this page. Two rankers score every passage, BM25 on words and TF-IDF on character trigrams, then reciprocal rank fusion merges them. Each result shows exactly where it comes from.',
    fr: 'Cette console fait tourner un petit retriever hybride dans votre navigateur, sur le contenu de cette page. Deux classements notent chaque passage, BM25 sur les mots et TF-IDF sur les trigrammes de caractères, puis la fusion RRF les combine. Chaque résultat indique précisément sa provenance.',
  },
  demoInputLabel: { en: 'Your question', fr: 'Votre question' },
  demoPlaceholder: {
    en: 'e.g. How do you limit hallucinations?',
    fr: 'ex. Comment limitez-vous les hallucinations ?',
  },
  demoButton: { en: 'Retrieve', fr: 'Rechercher' },
  demoTry: { en: 'Try', fr: 'Essayez' },
  demoSuggestions: {
    en: ['How do you limit hallucinations?', 'Experience with Qdrant', 'Agents and tool use', 'Data quality at scale'],
    fr: ['Comment limitez-vous les hallucinations ?', 'Expérience avec Qdrant', 'Agents et usage d’outils', 'Qualité des données à grande échelle'],
  },
  demoEmpty: {
    en: 'Nothing on this page matches that question. Try a technology, a project name or a topic such as chunking or ETL.',
    fr: 'Rien sur cette page ne correspond à cette question. Essayez une technologie, un nom de projet ou un sujet comme le chunking ou l’ETL.',
  },
  demoNote: {
    en: 'Retrieval only: passages are shown as they are, with no generated text in between. Click a citation to jump to the passage on this page.',
    fr: 'Retrieval seul : les passages sont affichés tels quels, sans texte généré entre eux. Cliquez sur une citation pour aller au passage dans cette page.',
  },
  demoParent: { en: 'Show parent context', fr: 'Voir le contexte parent' },
  demoStats: {
    en: '{chunks} chunks indexed · {ms} ms · top {k} after fusion',
    fr: '{chunks} passages indexés · {ms} ms · top {k} après fusion',
  },
  demoAnswer: { en: 'Generated answer', fr: 'Réponse générée' },
  demoAnswerError: {
    en: 'The answer service did not respond. The retrieved passages below are still accurate.',
    fr: 'Le service de réponse n’a pas répondu. Les passages retrouvés ci-dessous restent exacts.',
  },
  demoPipeline: [{ en: 'tokenize', fr: 'tokeniser' }, { en: 'BM25', fr: 'BM25' }, { en: 'trigram TF-IDF', fr: 'TF-IDF trigrammes' }, { en: 'RRF', fr: 'RRF' }, { en: 'cite', fr: 'citer' }],

  // 04 · Case studies
  casesTitle: { en: 'Case studies', fr: 'Études de cas' },
  casesLead: {
    en: 'Sorted by the kind of problem. Each case states the problem, what I built, the result and the stack.',
    fr: 'Classées par type de problème. Chaque cas donne le problème, ce que j’ai construit, le résultat et la stack.',
  },
  casesTabs: { en: 'Kinds of problem', fr: 'Types de problème' },
  problem: { en: 'Problem', fr: 'Problème' },
  built: { en: 'What I built', fr: 'Ce que j’ai construit' },
  result: { en: 'Result', fr: 'Résultat' },
  stackLabel: { en: 'Stack', fr: 'Stack' },
  othersTitle: { en: 'Other projects', fr: 'Autres projets' },
  ctaBand: {
    en: 'Does one of these cases look like your problem?',
    fr: 'L’un de ces cas ressemble à votre problème ?',
  },
  articleLabel: { en: 'Article', fr: 'Article' },
  readArticle: { en: 'Read the article', fr: 'Lire l’article' },
  kmTitle: { en: 'Knowledge management with AI', fr: 'Knowledge management avec l’IA' },
  kmText: {
    en: 'My approach to an enterprise knowledge assistant: break the document silos, ground every answer in the sources, enforce permissions, and measure before scaling.',
    fr: 'Ma démarche pour un assistant de connaissances en entreprise : casser les silos documentaires, ancrer chaque réponse dans les sources, appliquer les droits d’accès et mesurer avant d’étendre.',
  },
  dashTitle: { en: 'Invoice email delivery', fr: 'Envoi des factures par e-mail' },
  dashNote: {
    en: 'Reconstruction of the dashboard, with fictional figures.',
    fr: 'Reconstitution du tableau de bord, avec des chiffres fictifs.',
  },

  // 05 · Path
  pathTitle: { en: 'From statistics to RAG', fr: 'De la statistique au RAG' },
  pathLead: {
    en: 'Each step built the next one. Data engineering is not a detour: a good RAG system rests first on reliable, finely indexed data.',
    fr: 'Chaque étape a préparé la suivante. Le data engineering n’est pas un détour : un bon RAG repose d’abord sur des données fiables et finement indexées.',
  },
  roleDetail: { en: 'What I did there', fr: 'Ce que j’y ai fait' },
  verify: { en: 'Verify the credential', fr: 'Vérifier le diplôme' },

  // 06 · Stack
  stackTitle: { en: 'Stack', fr: 'Stack' },
  stackLead: {
    en: 'Organised by area, along the chain I deliver: reliable data, AI and GenAI on top of it, then automated deployment to the cloud.',
    fr: 'Organisée par domaine, dans l’ordre de la chaîne que je livre : des données fiables, l’IA et la GenAI par-dessus, puis le déploiement automatisé dans le cloud.',
  },
  trendsTitle: { en: 'Trends I follow', fr: 'Tendances que je suis' },

  // 07 · Contact
  contactTitle: { en: 'Let’s talk about your project.', fr: 'Discutons de votre projet.' },
  contactLead: {
    en: 'Available for remote missions. Email is the fastest way to reach me.',
    fr: 'Disponible pour des missions en remote. Le plus rapide est l’e-mail.',
  },
  emailLabel: { en: 'Email', fr: 'E-mail' },
  languagesLabel: { en: 'Languages', fr: 'Langues' },
  languages: { en: 'French, English', fr: 'Français, anglais' },
  timezoneLabel: { en: 'Time zone', fr: 'Fuseau' },
  timezone: { en: 'GMT (Dakar)', fr: 'GMT (Dakar)' },
  footer: {
    en: '© 2026 Arona Ben Cherif Diatta. All rights reserved.',
    fr: '© 2026 Arona Ben Cherif Diatta. Tous droits réservés.',
  },
  themeToggle: { en: 'Switch light or dark theme', fr: 'Basculer entre thème clair et sombre' },

  // Articles
  articlesTitle: { en: 'Articles', fr: 'Articles' },
  articlesLead: {
    en: 'Engineering notes on RAG, agents and the data work underneath: one choice explained at a time, the way I would explain it to a client or a CTO.',
    fr: 'Notes d’ingénierie sur le RAG, les agents et le travail de données qui les porte : un choix expliqué à la fois, comme je l’expliquerais à un client ou à un CTO.',
  },
  backArticles: { en: 'All articles', fr: 'Tous les articles' },
  articleCta: {
    en: 'A project where this applies?',
    fr: 'Un projet où cela s’applique ?',
  },

  // Project pages and replays
  demoBadge: { en: 'Demo · fictional data', fr: 'Démo · données fictives' },
  demoRun: { en: 'Run', fr: 'Lancer' },
  demoReplay: { en: 'Run again', fr: 'Relancer' },
  demoSectionTitle: { en: 'Try it', fr: 'Essayer' },
  demoSectionLead: {
    en: 'A replay of typical runs, with fictional documents, accounts and tools. Nothing here touches real data.',
    fr: 'La rediffusion d’exécutions types, avec des documents, comptes et outils fictifs. Rien ici ne touche à des données réelles.',
  },
  pocTitle: { en: 'Try the demo', fr: 'Essayer la démo' },
  pocOpen: { en: 'Open the demo full screen', fr: 'Ouvrir la démo en plein écran' },
  resultsTitle: { en: 'Results', fr: 'Résultats' },
  howItWorks: { en: 'See how it works', fr: 'Voir le fonctionnement' },
  backHome: { en: 'Back to the case studies', fr: 'Retour aux études de cas' },
  stepsTitle: { en: 'How it works', fr: 'Fonctionnement' },
  choicesTitle: { en: 'Design choices', fr: 'Choix de conception' },
  diagramNote: { en: 'Scroll sideways to see the whole diagram.', fr: 'Faites défiler horizontalement pour voir tout le schéma.' },
  nextProject: { en: 'Next project', fr: 'Projet suivant' },
  status: {
    pilot: { en: 'Pilot in progress', fr: 'Pilote en cours' },
    paused: { en: 'On hold', fr: 'En pause' },
    personal: { en: 'Personal project', fr: 'Projet personnel' },
    delivered: { en: 'Delivered', fr: 'Livré' },
    study: { en: 'Study on fictional data', fr: 'Étude sur données fictives' },
    poc: { en: 'Proof of concept', fr: 'POC' },
    demo: { en: 'Demo · fictional data', fr: 'Démo · données fictives' },
  },
};

// Line of verifiable facts under the hero.
export const facts: L[] = [
  { en: '8 projects delivered', fr: '8 projets livrés' },
  { en: '1 enterprise pilot', fr: '1 pilote en entreprise' },
  { en: 'Hybrid RAG, BM25 + RRF', fr: 'RAG hybride BM25 + RRF' },
  { en: '2 years of large-scale data migration', fr: '2 ans de migration de données à grande échelle' },
];

// 02 · Freelance offer. `tab` links an item to the matching case-study tab.
export const offer: { id: string; title: L; items: { text: L; tab?: string }[]; keywords: string }[] = [
  {
    id: 'offer#1',
    title: { en: 'Scoping & AI audit', fr: 'Cadrage & audit IA' },
    items: [
      { text: { en: 'Spot the business friction: where a team loses time, and how often.', fr: 'Repérer les irritants métier : où une équipe perd du temps, et à quelle fréquence.' } },
      { text: { en: 'Choose the lightest solution: an automation, a search engine or an agent.', fr: 'Choisir la solution la plus légère : une automatisation, un moteur de recherche ou un agent.' } },
      { text: { en: 'Audit an existing proof of concept.', fr: 'Auditer un POC existant.' } },
    ],
    keywords: 'consulting scoping audit framing use cases conseil cadrage freelance mission',
  },
  {
    id: 'offer#2',
    title: { en: 'Build & production', fr: 'Build & mise en production' },
    items: [
      { text: { en: 'Enterprise RAG: ingestion, indexing, hybrid search.', fr: 'RAG d’entreprise : ingestion, indexation, recherche hybride.' }, tab: 'search' },
      { text: { en: 'AI agents and automation: LangGraph, MCP, n8n.', fr: 'Agents IA et automatisation : LangGraph, MCP, n8n.' }, tab: 'agents' },
      { text: { en: 'Data pipelines for AI.', fr: 'Pipelines de données pour l’IA.' }, tab: 'data' },
      { text: { en: 'Document checking.', fr: 'Contrôle documentaire.' }, tab: 'documents' },
    ],
    keywords: 'build production rag agents automation pipelines document checking freelance mission',
  },
];

export type Item = {
  id: string;
  title: L;
  org?: L;
  when?: string;
  status?: keyof typeof ui.status;
  tags?: string[];
  summary?: L;
  bullets: { text: L; keywords?: string }[];
  links?: { label: L; url: string }[];
  delivered?: boolean;
  page?: string; // slug of the dedicated "how it works" page
};

export const experience: Item[] = [
  {
    id: 'sonatel',
    title: { en: 'Data Migration & Data AI Engineer', fr: 'Ingénieur Migrations de Données & Data IA' },
    org: { en: 'Sonatel (Orange Senegal)', fr: 'Sonatel (Orange Sénégal)' },
    when: '2024 – 2026',
    bullets: [
      {
        text: {
          en: 'Migrated data for a large commercial IS transformation programme: decommissioning the main sales systems (fixed, mobile, prepaid) and moving them to an in-house target system.',
          fr: 'Migration des données d’un vaste programme de transformation du SI commercial : décommissionnement des principaux SI de vente (fixe, mobile, prépayé) et bascule vers un système cible interne.',
        },
        keywords: 'migration telecom transformation cutover bascule',
      },
      {
        text: {
          en: 'Built Talend ETL jobs over several relational sources (Oracle, MySQL), with reusable Java cleaning routines and batch processing of large data volumes.',
          fr: 'Jobs ETL Talend sur plusieurs sources relationnelles (Oracle, MySQL), avec des routines Java réutilisables de nettoyage et des traitements par lots sur de gros volumes.',
        },
        keywords: 'etl talend pipeline batch sql database big data volumes',
      },
      {
        text: {
          en: 'Wrote Python scripts for data inventory, quality and completeness checks, and source-to-target reconciliation, catching and fixing anomalies before cutover.',
          fr: 'Scripts Python d’inventaire, de contrôle qualité et de complétude, et de réconciliation source-cible pour détecter et corriger les anomalies avant bascule.',
        },
        keywords: 'data quality reconciliation python pandas qualité scale',
      },
      {
        text: {
          en: 'Built a Power BI dashboard consolidating the reports of several invoice email servers: a single view of which customers received their invoice or not, of failed sends and of their causes.',
          fr: 'Conception d’un tableau de bord Power BI consolidant les rapports de plusieurs serveurs d’envoi de factures par e-mail : une vue globale des clients ayant reçu ou non leur facture, des échecs d’envoi et de leurs causes.',
        },
        keywords: 'power bi dashboard reporting kpi bi tableau indicators business intelligence',
      },
      {
        text: {
          en: 'For collections, developed a LightGBM model predicting the risk of unpaid invoices per customer account to prioritise reminders, compared it with the TypeSafe Jev decision model, and automated reminder alerts with n8n, with results served through a chatbot.',
          fr: 'Pour le recouvrement, modèle LightGBM de prédiction du risque d’impayés par compte client pour prioriser les relances, comparé au modèle de décision TypeSafe Jev, avec des alertes de relance automatisées sous n8n et une restitution via un chatbot.',
        },
        keywords: 'machine learning lightgbm prediction scoring risk data science statistics jev decision model',
      },
      {
        text: {
          en: 'Designed an enterprise RAG search engine on the Migroo pipeline, with retrieval exposed as an API; pilot in progress.',
          fr: 'Conception d’un moteur de recherche RAG d’entreprise sur le pipeline Migroo, avec un retrieval exposé en API ; pilote en cours.',
        },
        keywords: 'rag retrieval search enterprise qdrant api',
      },
      {
        text: {
          en: 'Scoped internal GenAI use cases with business teams and prototyped automatic email classification with n8n and an LLM.',
          fr: 'Cadrage de cas d’usage GenAI internes avec les équipes métier et prototype de classification automatique d’e-mails avec n8n et un LLM.',
        },
        keywords: 'genai llm classification automation n8n use cases prompt',
      },
    ],
  },
  {
    id: 'xcg',
    title: { en: 'Full-Stack Python Developer, open source', fr: 'Développeur Full-Stack Python, open source' },
    org: { en: 'XCG Africa, subsidiary of the Orbeet group (France)', fr: 'XCG Africa, filiale du groupe Orbeet (France)' },
    when: '2023 – 2024',
    bullets: [
      {
        text: {
          en: 'Built open-source business modules in Python (Odoo): back end, business logic, IS integration and APIs, including modules that call AI services to automate client workflows.',
          fr: 'Développement de modules métier open source en Python (Odoo) : back-end, logique métier, intégration au SI et API, dont des modules appelant des services d’IA pour automatiser des processus clients.',
        },
        keywords: 'python backend api software engineering automation',
      },
      {
        text: {
          en: 'Contributed through pull requests and migrated modules between framework versions; one contribution was merged into the upstream open-source project.',
          fr: 'Contributions par pull requests et migration de modules entre versions du framework ; une contribution a été intégrée au projet open source amont.',
        },
        keywords: 'open source git pull request contribution',
      },
    ],
  },
];

// ---------- 04 · Case studies ----------
// Problem → What I built → Result → Stack. `built` and `result` are the passages the
// retriever demo scores and cites (numbered in that order).
export type Bullet = { text: L; keywords?: string };
export type Case = {
  id: string;
  title: L;
  summary: L;
  delivered?: boolean;
  status?: keyof typeof ui.status;
  tags: string[];
  links?: { label: L; url: string }[];
  page?: string; // slug of the dedicated "how it works" page
  problem: L;
  built: Bullet[];
  result: Bullet[];
  indexed?: boolean; // false: shown on the page but left out of the retrieval corpus
  extra?: 'chain' | 'email' | 'dash';
};

const migroo: Case = {
  id: 'migroo',
  delivered: true,
  page: 'migroo',
  title: { en: 'Migroo', fr: 'Migroo' },
  summary: {
    en: 'Document ingestion and indexing pipeline for enterprise RAG.',
    fr: 'Pipeline d’ingestion et d’indexation documentaire pour un RAG d’entreprise.',
  },
  status: 'pilot',
  tags: ['Python', 'FastAPI', 'Qdrant'],
  extra: 'chain',
  problem: {
    en: 'A document assistant cannot cite its source when documents are indexed as blocks, with no provenance.',
    fr: 'Un assistant documentaire ne peut pas citer sa source quand les documents sont indexés en blocs, sans provenance.',
  },
  built: [
    {
      text: {
        en: 'End-to-end chain from sources to parsing, chunking, metadata, embeddings, Qdrant, retrieval and LLM context, exposed through a FastAPI API.',
        fr: 'Chaîne complète des sources au parsing, chunking, métadonnées, embeddings, Qdrant, retrieval et contexte LLM, exposée via une API FastAPI.',
      },
      keywords: 'pipeline ingestion embeddings vector database fastapi',
    },
    {
      text: {
        en: 'Granular indexing by document, page, paragraph, line, position and provenance, so every answer can be traced and cited back to its source.',
        fr: 'Indexation granulaire par document, page, paragraphe, ligne, position et provenance : chaque réponse est traçable et cite sa source.',
      },
      keywords: 'citation traceability provenance hallucinations grounding metadata',
    },
    {
      text: {
        en: 'Parent/child chunking: small child chunks are embedded for precise matching, larger parent chunks are sent to the LLM for context.',
        fr: 'Chunking parent/enfant : de petits passages enfants sont vectorisés pour un appariement précis, des passages parents plus larges sont transmis au LLM.',
      },
      keywords: 'chunking parent child context window',
    },
    {
      text: {
        en: 'Hybrid retrieval, dense vectors plus BM25, fused with reciprocal rank fusion, and a per-owner filter that keeps each user’s documents isolated.',
        fr: 'Retrieval hybride, vecteurs denses et BM25 fusionnés par RRF, avec un filtre par propriétaire qui isole les documents de chaque utilisateur.',
      },
      keywords: 'hybrid search bm25 dense rrf access control security',
    },
  ],
  result: [
    {
      text: {
        en: 'Indexing and retrieval run locally; generation calls a hosted LLM by default. Code is production-ready, with a pilot under way at Sonatel.',
        fr: 'Indexation et retrieval tournent en local ; la génération appelle par défaut un LLM hébergé. Code prêt pour la production, pilote en cours à Sonatel.',
      },
      keywords: 'production deployment local',
    },
  ],
};

const privasearch: Case = {
  id: 'privasearch',
  delivered: true,
  page: 'privasearch',
  title: { en: 'PrivaSearch', fr: 'PrivaSearch' },
  summary: { en: 'On-premise RAG search engine.', fr: 'Moteur de recherche RAG on-premise.' },
  tags: ['ChromaDB', 'nomic-embed-text', 'Ollama'],
  problem: {
    en: 'Teams whose documents cannot be sent to an external API.',
    fr: 'Des équipes dont les documents ne peuvent pas partir vers une API externe.',
  },
  built: [
    {
      // Wording fixed on purpose: do not rewrite from one version to the next.
      text: {
        en: 'Fully local stack with embeddings and semantic search; grounding prompts constrain answers to the retrieved context to limit hallucinations. Powered by Migroo.',
        fr: 'Stack entièrement locale avec embeddings et recherche sémantique ; prompts de grounding contraignant les réponses au contexte récupéré pour limiter les hallucinations. Alimenté par Migroo.',
      },
      keywords: 'on-premise local privacy sovereignty hallucinations grounding semantic search ollama',
    },
  ],
  result: [
    {
      text: {
        en: 'Embeddings, search and generation all run on local infrastructure: no document and no question leaves it.',
        fr: 'Embeddings, recherche et génération tournent sur une infrastructure locale : aucun document ni aucune question ne la quitte.',
      },
      keywords: 'on-premise local privacy confidentiality',
    },
  ],
};

const agent: Case = {
  id: 'agent',
  delivered: true,
  page: 'orange-money-agent',
  title: { en: 'Orange Money AI Agent', fr: 'Orange Money AI Agent' },
  summary: { en: 'ReAct agent over a sandboxed API.', fr: 'Agent ReAct sur une API sandbox.' },
  status: 'personal',
  tags: ['LangChain', 'LangGraph', 'FastMCP'],
  problem: {
    en: 'Handle a plain-language request that needs several API calls, and let the agent choose the right tool at each step.',
    fr: 'Traiter une demande en langage courant qui exige plusieurs appels à une API, en laissant l’agent choisir le bon outil à chaque étape.',
  },
  built: [
    {
      text: {
        en: 'Multi-step ReAct agent with its tool-use prompts over a sandboxed API; iterated on prompt wording to improve tool selection and cut failed calls.',
        fr: 'Agent ReAct multi-étapes et ses prompts d’usage d’outils sur une API sandbox ; itérations sur les formulations pour mieux choisir les outils et réduire les appels en échec.',
      },
      keywords: 'agent agents tool use tools mcp react orchestration prompt engineering',
    },
  ],
  result: [
    {
      text: {
        en: 'A personal project that runs against a sandbox API only: no real accounts or transactions are involved.',
        fr: 'Un projet personnel qui fonctionne uniquement sur une API sandbox : aucun compte ni aucune transaction réels ne sont concernés.',
      },
      keywords: 'sandbox safety test environment',
    },
  ],
};

const email: Case = {
  id: 'email',
  title: { en: 'Email triage', fr: 'Tri d’e-mails' },
  summary: {
    en: 'n8n, a decision layer and an LLM to sort a shared mailbox.',
    fr: 'n8n, une couche de décision et un LLM pour trier une boîte partagée.',
  },
  status: 'demo',
  tags: ['n8n', 'TypeSafe Jev', 'LLM'],
  extra: 'email',
  problem: {
    en: 'Reading, classifying and routing by hand every email that reaches a shared mailbox.',
    fr: 'Lire, classer et router à la main chaque e-mail qui arrive dans une boîte partagée.',
  },
  built: [
    {
      text: {
        en: 'A prototype where n8n picks up each email, a decision layer (TypeSafe Jev) sets the category and the route, and an LLM extracts the useful fields.',
        fr: 'Un prototype où n8n récupère chaque e-mail, une couche de décision (TypeSafe Jev) détermine la catégorie et la route, et un LLM extrait les informations utiles.',
      },
      keywords: 'automation workflow n8n classification routing extraction email',
    },
  ],
  result: [
    {
      text: {
        en: 'No agent needed, because the path is known. Below the confidence threshold, an email goes to human review instead of being routed automatically.',
        fr: 'Pas besoin d’agent, car le chemin est connu. Sous le seuil de confiance, un e-mail part en revue humaine au lieu d’être routé automatiquement.',
      },
      keywords: 'human review confidence threshold guardrails',
    },
  ],
};

const docucheck: Case = {
  id: 'docucheck',
  page: 'docucheck',
  title: { en: 'DocuCheck', fr: 'DocuCheck' },
  summary: {
    en: 'Automated checking of university registration files.',
    fr: 'Contrôle automatisé de dossiers d’inscription.',
  },
  status: 'poc',
  tags: ['Python', 'FastAPI', 'Pydantic', 'Tesseract OCR', 'pytest'],
  links: [{ label: { en: 'Code (poc branch)', fr: 'Code (branche poc)' }, url: 'https://github.com/rooniweb/docucheck/tree/poc/poc' }],
  problem: {
    en: 'A higher-education institution receives registration files as PDFs (form, ID card, transcript, proof of address) that must be checked piece by piece.',
    fr: 'Un établissement d’enseignement supérieur reçoit des dossiers d’inscription en PDF (formulaire, pièce d’identité, relevé de notes, justificatif de domicile) à contrôler pièce par pièce.',
  },
  built: [
    {
      text: {
        en: 'Reads each PDF of a registration file (native text or French OCR), identifies the piece from its content, extracts the fields into Pydantic schemas and checks completeness and consistency across pieces.',
        fr: 'Lit chaque PDF d’un dossier d’inscription (texte natif ou OCR en français), identifie la pièce par son contenu, extrait les champs dans des schémas Pydantic et vérifie la complétude et la cohérence entre pièces.',
      },
      keywords: 'document processing ocr extraction classification verification pdf automation administrative',
    },
  ],
  result: [
    {
      text: {
        en: 'Each anomaly cites the file, page and field; below a 0.80 confidence the file goes to human review. On 12 fictional files: 12/12 correctly classified, 34 ms per file (median, 1.0 s with OCR), $0 per file.',
        fr: 'Chaque anomalie cite le fichier, la page et le champ ; sous 0,80 de confiance, le dossier part en revue humaine. Sur 12 dossiers fictifs : 12/12 bien classés, 34 ms par dossier (médiane, 1,0 s avec OCR), 0 $ par dossier.',
      },
      keywords: 'metrics accuracy latency cost human review guardrails',
    },
  ],
};

const risk: Case = {
  id: 'risk',
  delivered: true,
  page: 'payment-risk',
  title: { en: 'Payment default risk', fr: 'Risque d’impayés' },
  summary: {
    en: 'Machine learning to target collection reminders.',
    fr: 'Machine learning pour cibler les relances de recouvrement.',
  },
  status: 'study',
  tags: ['Python', 'pandas', 'scikit-learn', 'LightGBM', 'SHAP'],
  links: [
    { label: { en: 'Try the demo', fr: 'Essayer la démo' }, url: '/demos/risque-impayes/' },
    { label: { en: 'Notebook', fr: 'Notebook' }, url: 'https://github.com/rooniweb/risque-impayes/blob/main/notebooks/analyse_risque_impayes.ipynb' },
    { label: { en: 'Code', fr: 'Code' }, url: 'https://github.com/rooniweb/risque-impayes' },
  ],
  problem: {
    en: 'A collections team cannot call every customer: it reminds late, and somewhat at random.',
    fr: 'Une équipe de recouvrement ne peut pas relancer tout le monde : elle relance tard, et un peu au hasard des listes.',
  },
  built: [
    {
      text: {
        en: 'Predict, as soon as a telecom invoice is issued, the probability that it is still unpaid 60 days after its due date, so the collection team calls the right customers first.',
        fr: 'Prédire, dès l’émission d’une facture télécom, la probabilité qu’elle reste impayée 60 jours après l’échéance, pour que l’équipe de recouvrement relance d’abord les bons clients.',
      },
      keywords: 'machine learning prediction classification data science scoring collections lightgbm',
    },
    {
      text: {
        en: 'Leakage-free feature engineering at the issue date, time-based split, and LightGBM benchmarked against logistic regression and a business rule: both models tie (AUC 0.725 and 0.728) and clearly beat the rule (0.650).',
        fr: 'Feature engineering sans fuite à la date d’émission, découpage temporel, et LightGBM comparé à une régression logistique et à une règle métier : les deux modèles font jeu égal (AUC 0,725 et 0,728) et battent nettement la règle (0,650).',
      },
      keywords: 'feature engineering evaluation auc logistic regression statistics validation',
    },
  ],
  result: [
    {
      text: {
        en: 'SHAP explanations per invoice and a simulated campaign reminding 20% of invoices: about twice as many defaults reached as random targeting, under a stated 35% reminder-effectiveness assumption.',
        fr: 'Explications SHAP par facture et campagne simulée relançant 20 % des factures : environ deux fois plus d’impayés atteints qu’en relançant au hasard, sous une hypothèse affichée de 35 % d’efficacité des relances.',
      },
      keywords: 'shap explainability simulation business value roi',
    },
  ],
};

const dashboard: Case = {
  id: 'dashboard',
  delivered: true,
  indexed: false, // the same facts are indexed once, under Sonatel in the path section
  title: { en: 'Invoice delivery dashboard', fr: 'Tableau de bord de suivi des factures' },
  summary: {
    en: 'One view of the invoices sent by email.',
    fr: 'Une vue unique des factures envoyées par e-mail.',
  },
  tags: ['Power BI'],
  extra: 'dash',
  problem: {
    en: 'Invoice email reports were spread across several sending servers, with no single view of which customers had been reached.',
    fr: 'Les rapports d’envoi des factures par e-mail étaient répartis entre plusieurs serveurs d’envoi, sans vue unique des clients servis ou non.',
  },
  built: [
    {
      text: {
        en: 'A Power BI dashboard that consolidates the reports of those servers.',
        fr: 'Un tableau de bord Power BI qui consolide les rapports de ces serveurs.',
      },
    },
  ],
  result: [
    {
      text: {
        en: 'A single view of which customers received their invoice or not, of failed sends and of their causes.',
        fr: 'Une vue globale des clients ayant reçu ou non leur facture, des échecs d’envoi et de leurs causes.',
      },
    },
  ],
};

const sogolon: Case = {
  id: 'sogolon',
  page: 'sogolon',
  title: { en: 'Sogolon', fr: 'Sogolon' },
  summary: {
    en: 'NL-to-SQL assistant for sales and collections reporting.',
    fr: 'Assistante NL-to-SQL pour le pilotage commercial et le recouvrement.',
  },
  status: 'delivered',
  tags: ['Python', 'FastAPI', 'MySQL', 'LLM', 'NL-to-SQL'],
  links: [{ label: { en: 'Try the demo', fr: 'Essayer la démo' }, url: '/demos/sogolon/' }],
  problem: {
    en: 'Every reporting question went through the data team and a hand-written query, on a large database where many column names are misleading.',
    fr: 'Chaque question de pilotage passait par l’équipe données et une requête écrite à la main, sur une base vaste où beaucoup de noms de colonnes sont trompeurs.',
  },
  built: [
    {
      text: {
        en: 'Ask a sales or collections question in French and get the SQL query, the result and a chart, while the language model never sees a single row of data: it only receives the question and the schema.',
        fr: 'Une question de pilotage posée en français donne la requête SQL, le résultat et un graphique, sans que le modèle de langage ne voie jamais une ligne de données : il ne reçoit que la question et le schéma.',
      },
      keywords: 'nl2sql text-to-sql sql database question natural language mysql agent',
    },
    {
      text: {
        en: 'Read-only guardrails before execution: a single SELECT or WITH statement, write keywords refused, LIMIT added, time limit, and a read-only database session on top.',
        fr: 'Garde-fous en lecture seule avant exécution : une seule instruction SELECT ou WITH, mots-clés d’écriture refusés, LIMIT ajouté, délai maximal, et une session base de données en lecture seule en plus.',
      },
      keywords: 'guardrails security read-only safety injection',
    },
  ],
  result: [
    {
      text: {
        en: 'A short business knowledge base and column comments document the schema’s traps; validated queries are replayed at zero token cost, and recurring reports use fixed queries so they stay reproducible.',
        fr: 'Une base de connaissance métier courte et des commentaires de colonnes documentent les pièges du schéma ; les requêtes validées sont rejouées sans aucun jeton, et les rapports récurrents utilisent des requêtes fixes pour rester reproductibles.',
      },
      keywords: 'knowledge base few-shot reporting evaluation cost tokens',
    },
  ],
};

export const caseTabs: { id: string; label: L; cases: Case[]; article?: boolean }[] = [
  { id: 'search', label: { en: 'Document search', fr: 'Recherche documentaire' }, cases: [migroo, privasearch], article: true },
  { id: 'agents', label: { en: 'Agents & automation', fr: 'Agents & automatisation' }, cases: [agent, email] },
  { id: 'documents', label: { en: 'Document checking', fr: 'Contrôle de documents' }, cases: [docucheck] },
  { id: 'data', label: { en: 'Data & BI', fr: 'Data & BI' }, cases: [risk, dashboard, sogolon] },
];

export const migrooChain: L[] = [
  { en: 'Sources', fr: 'Sources' }, { en: 'Parsing', fr: 'Parsing' }, { en: 'Chunking', fr: 'Découpage' },
  { en: 'Metadata', fr: 'Métadonnées' }, { en: 'Embeddings', fr: 'Embeddings' }, { en: 'Qdrant', fr: 'Qdrant' },
  { en: 'Retrieval', fr: 'Retrieval' }, { en: 'LLM context', fr: 'Contexte LLM' },
];

// Short lines at the bottom of the case studies.
export const others: { id: string; title: string; summary: L; status: keyof typeof ui.status; link?: { label: L; url: string } }[] = [
  {
    id: 'revizia',
    title: 'RéviZIA',
    summary: { en: 'Generative-AI learning platform.', fr: 'Plateforme d’apprentissage par l’IA générative.' },
    status: 'delivered',
    link: { label: { en: 'Open the app', fr: 'Ouvrir l’application' }, url: 'https://revizia-africas-future-learn.lovable.app/' },
  },
  {
    id: 'xamloo',
    title: 'Xamloo',
    summary: { en: 'Semantic search prototype over local data, built on Fireplexity.', fr: 'Prototype de recherche sémantique sur données locales, bâti sur Fireplexity.' },
    status: 'paused',
  },
];

// Flat list used by the project and article pages.
export const projects: Item[] = caseTabs.flatMap((t) => t.cases).map((c) => ({
  id: c.id,
  title: c.title,
  summary: c.summary,
  delivered: c.delivered,
  status: c.status,
  tags: c.tags,
  links: c.links,
  page: c.page,
  bullets: [...c.built, ...c.result],
}));

// ---------- 05 · Path ----------
export const education = [
  {
    title: { en: 'Master’s in Statistics and Decision Computing (SID), 2023', fr: 'Master 2 Statistique et Informatique Décisionnelle (SID), 2023' },
    org: { en: 'Université Alioune Diop de Bambey, Senegal', fr: 'Université Alioune Diop de Bambey, Sénégal' },
    note: { en: 'Thesis: classical and deep learning models compared for time-series forecasting.', fr: 'Mémoire : comparaison de modèles classiques et de deep learning pour la prévision de séries temporelles.' },
  },
  {
    title: { en: 'Data Analyst Nanodegree', fr: 'Data Analyst Nanodegree' },
    org: { en: 'Udacity (ALX-T)', fr: 'Udacity (ALX-T)' },
    link: 'https://confirm.udacity.com/AXEPFQAJ',
  },
] as { title: L; org: L; note?: L; link?: string }[];

export const path: { when: L | string; title: L; org?: L; text: L; role?: string; education?: boolean; now?: boolean }[] = [
  {
    when: '2023',
    title: { en: 'Statistics & data science', fr: 'Statistique & data science' },
    text: {
      en: 'Statistics and decision computing; thesis on time-series forecasting, classical models versus deep learning.',
      fr: 'Statistique et informatique décisionnelle ; mémoire sur la prévision de séries temporelles, modèles classiques contre deep learning.',
    },
    education: true,
  },
  {
    when: '2023 – 2024',
    title: { en: 'Python software engineering', fr: 'Software engineering Python' },
    org: { en: 'XCG Africa, subsidiary of the Orbeet group (France)', fr: 'XCG Africa, filiale du groupe Orbeet (France)' },
    text: {
      en: 'Python back ends, business logic, APIs and integration in open-source projects.',
      fr: 'Back-ends Python, logique métier, API et intégration sur des projets open source.',
    },
    role: 'xcg',
  },
  {
    when: '2024 – 2026',
    title: { en: 'Data engineering & migration', fr: 'Data engineering & migration' },
    org: { en: 'Sonatel (Orange Senegal)', fr: 'Sonatel (Orange Sénégal)' },
    text: {
      en: 'ETL, quality controls and source-to-target reconciliation on large telecom datasets, then the first GenAI use cases with business teams.',
      fr: 'ETL, contrôles qualité et réconciliation source-cible sur de gros volumes télécom, puis les premiers cas d’usage GenAI avec les métiers.',
    },
    role: 'sonatel',
  },
  {
    when: { en: 'Now', fr: 'Aujourd’hui' },
    title: { en: 'AI · RAG · agents', fr: 'IA · RAG · agents' },
    org: { en: 'Freelance, remote missions', fr: 'Freelance, missions en remote' },
    text: {
      en: 'Ingestion pipelines, hybrid retrieval, grounded answers and tool-using agents.',
      fr: 'Pipelines d’ingestion, retrieval hybride, réponses ancrées et agents outillés.',
    },
    now: true,
  },
];

// ---------- 06 · Stack ----------
export type Item2 = string | L;
export const itemText = (i: Item2, lang: 'en' | 'fr') => (typeof i === 'string' ? i : i[lang]);

export type StackGroup = { id: string; title: L; items: Item2[]; keywords: string };
export const stack: { groups: StackGroup[]; trends: Item2[] } = {
  groups: [
    {
      id: 'data',
      title: { en: 'Data', fr: 'Data' },
      items: [
        'Python', 'SQL', 'Apache Spark (PySpark)', 'Apache Airflow', 'dbt', 'Apache Kafka', 'Snowflake',
        { en: 'Google Cloud (BigQuery)', fr: 'Google Cloud (BigQuery)' },
        'Talend Open Studio', 'PostgreSQL', 'Oracle', 'MySQL', 'pandas', 'Power BI', 'Tableau',
      ],
      keywords: 'data engineering etl elt spark pyspark airflow dbt kafka streaming orchestration snowflake bigquery gcp warehouse sql database talend bi power bi tableau',
    },
    {
      id: 'ai',
      title: { en: 'AI & GenAI', fr: 'IA & GenAI' },
      items: [
        { en: 'RAG (hybrid search BM25 + RRF)', fr: 'RAG (recherche hybride BM25 + RRF)' },
        { en: 'AI agents (ReAct, LangGraph)', fr: 'Agents IA (ReAct, LangGraph)' },
        'AI agent harness', 'MCP / FastMCP', 'LangChain', 'CrewAI', 'OpenAI', 'Ollama',
        { en: 'Embeddings, Qdrant, ChromaDB', fr: 'Embeddings, Qdrant, ChromaDB' },
        'Docling', 'NL-to-SQL',
        { en: 'Machine learning (LightGBM)', fr: 'Machine learning (LightGBM)' },
        { en: 'LLM evaluation', fr: 'Évaluation LLM' },
        { en: 'LLM guardrails', fr: 'Garde-fous LLM' },
        { en: 'Tracing (Phoenix)', fr: 'Traçabilité (Phoenix)' },
        'FastAPI', 'n8n',
      ],
      keywords: 'ai genai llm rag agents retrieval embeddings vector mcp langgraph evaluation',
    },
    {
      id: 'devops',
      title: { en: 'DevOps', fr: 'DevOps' },
      items: ['Git', 'GitHub Actions', 'GitLab CI', 'CI/CD', 'Docker', 'Kubernetes', 'Terraform', 'pytest'],
      keywords: 'devops ci cd pipeline docker kubernetes terraform infrastructure as code tests llmops',
    },
    {
      id: 'cloud',
      title: { en: 'Cloud', fr: 'Cloud' },
      items: [
        { en: 'Google Cloud (GKE, Artifact Registry)', fr: 'Google Cloud (GKE, Artifact Registry)' },
        'AWS', 'Vercel',
        { en: 'Managed PostgreSQL (Neon)', fr: 'PostgreSQL managé (Neon)' },
      ],
      keywords: 'cloud gcp google aws vercel deployment managed database',
    },
  ],
  // Followed closely, not presented as delivered work.
  trends: [
    { en: 'Agentic AI', fr: 'IA agentique' },
    { en: 'LLM fine-tuning (LoRA)', fr: 'Fine-tuning de LLM (LoRA)' },
    'LLMOps',
    { en: 'Agentic RAG', fr: 'RAG agentique' },
    { en: 'Context engineering', fr: 'Ingénierie du contexte' },
  ],
};

// ---------- Retrieval corpus ----------
// Child chunks = single passages (what gets scored). Parent = the whole item (shown as context).
export type Chunk = {
  id: string;
  path: L; // human-readable provenance
  anchor: string; // section id on the page
  text: L;
  parent: L;
  keywords: string;
};

const list = (items: Item2[], lang: 'en' | 'fr') => items.map((i) => itemText(i, lang)).join(', ');

export function buildCorpus(): Chunk[] {
  const out: Chunk[] = [];

  offer.forEach((o) => {
    const text = {
      en: `${o.title.en}. ${o.items.map((i) => i.text.en).join(' ')}`,
      fr: `${o.title.fr}. ${o.items.map((i) => i.text.fr).join(' ')}`,
    };
    out.push({ id: o.id, path: { en: `Services › ${o.title.en}`, fr: `Offre › ${o.title.fr}` }, anchor: 'offer', text, parent: text, keywords: o.keywords });
  });

  caseTabs.forEach((tab) => tab.cases.filter((c) => c.indexed !== false).forEach((c) => {
    const bullets = [...c.built, ...c.result];
    const parent = (lang: 'en' | 'fr') =>
      `${c.title[lang]} · ${c.summary[lang]}\n${ui.problem[lang]}${lang === 'fr' ? ' :' : ':'} ${c.problem[lang]}\n` + bullets.map((b) => '– ' + b.text[lang]).join('\n');
    bullets.forEach((b, i) => {
      const kind = i < c.built.length ? ui.built : ui.result;
      out.push({
        id: `${c.id}#${i + 1}`,
        path: {
          en: `Case studies › ${c.title.en} › ${kind.en.toLowerCase()}`,
          fr: `Études de cas › ${c.title.fr} › ${kind.fr.toLowerCase()}`,
        },
        anchor: 'cases',
        text: b.text,
        parent: { en: parent('en'), fr: parent('fr') },
        keywords: [b.keywords ?? '', c.tags.join(' '), c.title.en].join(' '),
      });
    });
  }));

  experience.forEach((it) => {
    const parent = (lang: 'en' | 'fr') =>
      [it.title[lang], it.org?.[lang], it.when].filter(Boolean).join(' · ') + '\n' + it.bullets.map((b) => '– ' + b.text[lang]).join('\n');
    it.bullets.forEach((b, i) => {
      out.push({
        id: `${it.id}#${i + 1}`,
        path: {
          en: `Path › ${it.org!.en} › item ${i + 1}`,
          fr: `Parcours › ${it.org!.fr} › point ${i + 1}`,
        },
        anchor: 'path',
        text: b.text,
        parent: { en: parent('en'), fr: parent('fr') },
        keywords: [b.keywords ?? '', it.title.en].join(' '),
      });
    });
  });

  education.forEach((e, i) => {
    const text = { en: `${e.title.en}, ${e.org.en}.` + (e.note ? ' ' + e.note.en : ''), fr: `${e.title.fr}, ${e.org.fr}.` + (e.note ? ' ' + e.note.fr : '') };
    out.push({
      id: `edu#${i + 1}`,
      path: { en: `Path › Education › ${e.title.en}`, fr: `Parcours › Formation › ${e.title.fr}` },
      anchor: 'path',
      text,
      parent: text,
      keywords: 'education degree diploma master formation diplôme statistics data science statistique',
    });
  });

  stack.groups.forEach((g) => {
    const text = { en: `${g.title.en}: ${list(g.items, 'en')}.`, fr: `${g.title.fr} : ${list(g.items, 'fr')}.` };
    out.push({ id: `stack#${g.id}`, path: { en: `Stack › ${g.title.en}`, fr: `Stack › ${g.title.fr}` }, anchor: 'stack', text, parent: text, keywords: g.keywords + ' ' + list(g.items, 'en') });
  });
  const trends = { en: `${ui.trendsTitle.en}: ${list(stack.trends, 'en')}.`, fr: `${ui.trendsTitle.fr} : ${list(stack.trends, 'fr')}.` };
  out.push({ id: 'stack#trends', path: { en: `Stack › ${ui.trendsTitle.en}`, fr: `Stack › ${ui.trendsTitle.fr}` }, anchor: 'stack', text: trends, parent: trends, keywords: 'trends watch agentic fine-tuning llmops ' + list(stack.trends, 'en') });

  const profile = {
    en: `Freelance AI engineer based in Dakar, Senegal, available for remote missions. Time zone: GMT. Languages: ${ui.languages.en}.`,
    fr: `Ingénieur IA freelance basé à Dakar, Sénégal, disponible pour des missions en remote. Fuseau : GMT. Langues : ${ui.languages.fr.toLowerCase()}.`,
  };
  out.push({ id: 'profile#1', path: { en: 'Contact › Profile', fr: 'Contact › Profil' }, anchor: 'contact', text: profile, parent: profile, keywords: 'languages english french location remote freelance availability timezone' });
  return out;
}
