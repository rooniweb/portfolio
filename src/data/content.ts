// Single source of truth for the site. Every string exists in English and French.
// Facts here must match the CV and LinkedIn — edit with care.

export type L = { en: string; fr: string };

export const person = {
  name: 'Arona Ben Cherif Diatta',
  shortName: 'Arona Diatta',
  email: 'seydinaharoun@gmail.com',
  linkedin: 'https://www.linkedin.com/in/arona-diatta-b76541140',
  github: 'https://github.com/rooniweb',
  location: { en: 'Dakar, Senegal', fr: 'Dakar, Sénégal' } as L,
  role: { en: 'AI / GenAI Engineer', fr: 'Ingénieur IA / GenAI' } as L,
};

export const ui = {
  nav: {
    demo: { en: 'Ask', fr: 'Interroger' },
    services: { en: 'Services', fr: 'Services' },
    path: { en: 'Path', fr: 'Parcours' },
    work: { en: 'Experience', fr: 'Expérience' },
    projects: { en: 'Projects', fr: 'Projets' },
    stack: { en: 'Stack', fr: 'Stack' },
    contact: { en: 'Contact', fr: 'Contact' },
  },
  langSwitch: { en: 'Français', fr: 'English' },
  heroTitle: {
    en: 'Retrieval systems that cite their sources.',
    fr: 'Des systèmes RAG qui citent leurs sources.',
  },
  heroLead: {
    en: 'I’m Arona Ben Cherif Diatta, an AI / GenAI engineer based in Dakar. I build RAG pipelines, AI agents and business process automations on top of clean, finely indexed data, because an answer is only as reliable as what was retrieved to write it.',
    fr: 'Je suis Arona Ben Cherif Diatta, ingénieur IA / GenAI basé à Dakar. Je conçois des pipelines RAG, des agents IA et des automatisations de processus métier qui reposent sur des données propres et finement indexées : une réponse ne vaut que ce qui a été retrouvé pour l’écrire.',
  },
  ctaContact: { en: 'Get in touch', fr: 'Me contacter' },
  ctaProjects: { en: 'See the projects', fr: 'Voir les projets' },

  demoTitle: { en: 'Ask my track record', fr: 'Interrogez mon parcours' },
  demoLead: {
    en: 'This box runs a small hybrid retriever in your browser, over the content of this page. Two rankers score every passage, BM25 on words and TF-IDF on character trigrams, then reciprocal rank fusion merges them. Each result shows exactly where it comes from.',
    fr: 'Ce champ fait tourner un petit retriever hybride dans votre navigateur, sur le contenu de cette page. Deux classements notent chaque passage, BM25 sur les mots et TF-IDF sur les trigrammes de caractères, puis la fusion RRF les combine. Chaque résultat indique précisément sa provenance.',
  },
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
    en: 'Retrieval only: passages are shown as they are, with no generated text in between.',
    fr: 'Retrieval seul : les passages sont affichés tels quels, sans texte généré entre eux.',
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
  demoPipeline: ['tokenize', 'BM25', 'trigram TF-IDF', 'RRF', 'cite'],

  pathTitle: { en: 'From software to retrieval', fr: 'Du logiciel au RAG' },
  pathLead: {
    en: 'Each step built the next one. Data engineering is not a detour in this path: it is the reason my RAG systems hold up.',
    fr: 'Chaque étape a préparé la suivante. Le data engineering n’est pas un détour dans ce parcours : c’est ce qui rend mes systèmes RAG fiables.',
  },
  workTitle: { en: 'Experience', fr: 'Expérience' },
  projectsTitle: { en: 'Projects', fr: 'Projets' },
  projectsLead: {
    en: 'Migroo is the core: the ingestion and indexing layer the other retrieval work relies on.',
    fr: 'Migroo est le socle : la couche d’ingestion et d’indexation sur laquelle repose le reste.',
  },
  stackTitle: { en: 'Stack', fr: 'Stack' },
  eduTitle: { en: 'Education', fr: 'Formation' },
  verify: { en: 'Verify the credential', fr: 'Vérifier le diplôme' },
  languages: { en: 'French (native) · English (C1)', fr: 'Français (natif) · Anglais (C1)' },
  contactTitle: { en: 'Let’s talk retrieval.', fr: 'Parlons RAG.' },
  contactLead: {
    en: 'Open to AI / GenAI engineering roles and missions, remote or on site. The fastest way to reach me is email.',
    fr: 'Ouvert aux postes et missions d’ingénierie IA / GenAI, à distance ou sur site. Le plus rapide est l’e-mail.',
  },
  footer: {
    en: '© 2026 Arona Ben Cherif Diatta. All rights reserved.',
    fr: '© 2026 Arona Ben Cherif Diatta. Tous droits réservés.',
  },
  themeToggle: { en: 'Switch light or dark theme', fr: 'Basculer entre thème clair et sombre' },
  photoAlt: { en: 'Portrait of Arona Ben Cherif Diatta', fr: 'Portrait d’Arona Ben Cherif Diatta' },
  passionTitle: { en: 'Beyond the job', fr: 'Au-delà du métier' },
  passionText: {
    en: 'AI is a passion before it is a job. I follow the field closely, from the pioneers of deep learning to today’s agents, and I share what I read and build on LinkedIn.',
    fr: 'L’IA est une passion avant d’être un métier. Je suis le domaine de près, des pionniers du deep learning aux agents d’aujourd’hui, et je partage mes lectures et mes réalisations sur LinkedIn.',
  },
  passionCaption: { en: 'My AI legends, illustrated.', fr: 'Mes légendes de l’IA, en illustration.' },
  passionAlt: { en: 'Illustration of three AI pioneers standing together', fr: 'Illustration de trois pionniers de l’IA côte à côte' },
  servicesTitle: { en: 'What I do for business teams', fr: 'Ce que je fais pour les métiers' },
  servicesLead: {
    en: 'Retrieval is one tool among others. Most of the value comes from finding where a team loses time, then choosing the lightest thing that fixes it: an automation, a search engine or an agent.',
    fr: 'Le RAG est un outil parmi d’autres. L’essentiel de la valeur vient de repérer où une équipe perd du temps, puis de choisir la solution la plus légère qui règle le problème : une automatisation, un moteur de recherche ou un agent.',
  },
  articleLabel: { en: 'Article', fr: 'Article' },
  readArticle: { en: 'Read the article', fr: 'Lire l’article' },
  kmTitle: { en: 'Knowledge management with AI', fr: 'Knowledge management avec l’IA' },
  kmText: {
    en: 'My approach to an enterprise knowledge assistant: break the document silos, ground every answer in the sources, enforce permissions, and measure before scaling. Migroo handles ingestion and indexing; PrivaSearch keeps everything on premise when documents cannot leave.',
    fr: 'Ma démarche pour un assistant de connaissances en entreprise : casser les silos documentaires, ancrer chaque réponse dans les sources, appliquer les droits d’accès et mesurer avant d’étendre. Migroo gère l’ingestion et l’indexation ; PrivaSearch garde tout on-premise quand les documents ne peuvent pas sortir.',
  },
  demoBadge: { en: 'Demo · fictional data', fr: 'Démo · données fictives' },
  demoRun: { en: 'Run', fr: 'Lancer' },
  demoReplay: { en: 'Run again', fr: 'Relancer' },
  demoSectionTitle: { en: 'Try it', fr: 'Essayer' },
  demoSectionLead: {
    en: 'A replay of typical runs, with fictional documents, accounts and tools. Nothing here touches real data.',
    fr: 'La rediffusion d’exécutions types, avec des documents, comptes et outils fictifs. Rien ici ne touche à des données réelles.',
  },
  pocTitle: { en: 'Try the demo', fr: 'Essayer la démo' },
  pocLead: {
    en: 'A reduced, self-contained version running in your browser: a fictional SQLite database, the guardrails replayed live, and the exact prompt the model would receive. Queries are pre-written and replayed; no AI model is called. The demo is in French.',
    fr: 'Une version réduite et autonome qui tourne dans votre navigateur : une base SQLite fictive, les garde-fous rejoués en direct et le prompt exact que recevrait le modèle. Les requêtes sont pré-écrites et rejouées ; aucun modèle d’IA n’est appelé.',
  },
  pocOpen: { en: 'Open the demo full screen', fr: 'Ouvrir la démo en plein écran' },
  resultsTitle: { en: 'Results', fr: 'Résultats' },
  howItWorks: { en: 'See how it works', fr: 'Voir le fonctionnement' },
  backHome: { en: 'Back to the portfolio', fr: 'Retour au portfolio' },
  stepsTitle: { en: 'How it works', fr: 'Fonctionnement' },
  choicesTitle: { en: 'Design choices', fr: 'Choix de conception' },
  diagramNote: { en: 'Scroll sideways to see the whole diagram.', fr: 'Faites défiler horizontalement pour voir tout le schéma.' },
  nextProject: { en: 'Next project', fr: 'Projet suivant' },
  passionLink: { en: 'Follow on LinkedIn', fr: 'Me suivre sur LinkedIn' },
  status: {
    pilot: { en: 'Pilot in progress', fr: 'Pilote en cours' },
    paused: { en: 'Prototype on hold', fr: 'Prototype en pause' },
    personal: { en: 'Personal project', fr: 'Projet personnel' },
    delivery: { en: 'Near delivery', fr: 'Proche de la livraison' },
  },
};

export const services: { title: L; text: L; proof: L }[] = [
  {
    title: { en: 'Spot the friction', fr: 'Repérer les irritants' },
    text: {
      en: 'Sit with the business team, map the process and find the repetitive steps worth automating, before writing any code.',
      fr: 'S’asseoir avec l’équipe métier, cartographier le processus et repérer les tâches répétitives qui méritent d’être automatisées, avant d’écrire la moindre ligne de code.',
    },
    proof: { en: 'Scoped internal GenAI use cases with business teams.', fr: 'Cadrage de cas d’usage GenAI internes avec les équipes métier.' },
  },
  {
    title: { en: 'Automate with n8n and LLMs', fr: 'Automatiser avec n8n et les LLM' },
    text: {
      en: 'Wire the existing tools together and add an LLM where judgement is needed: sorting, extracting, routing.',
      fr: 'Relier les outils existants et ajouter un LLM là où il faut du jugement : trier, extraire, router.',
    },
    proof: { en: 'Prototyped automatic email classification with n8n and an LLM.', fr: 'Prototype de classification automatique d’e-mails avec n8n et un LLM.' },
  },
  {
    title: { en: 'Deploy agents and search', fr: 'Déployer agents et recherche' },
    text: {
      en: 'When a task needs several steps or a lot of documents, build an agent that uses tools, or a search engine that cites its sources.',
      fr: 'Quand une tâche demande plusieurs étapes ou beaucoup de documents, construire un agent qui utilise des outils, ou un moteur de recherche qui cite ses sources.',
    },
    proof: { en: 'ReAct agent over MCP tools; Sogolon for questions on databases; Migroo and PrivaSearch for documents.', fr: 'Agent ReAct sur des outils MCP ; Sogolon pour interroger les bases de données ; Migroo et PrivaSearch pour les documents.' },
  },
];

export const path = [
  {
    title: { en: 'Software engineering', fr: 'Software engineering' },
    when: '2023',
    text: {
      en: 'Python back ends, business logic, APIs and integration in open-source projects.',
      fr: 'Back-ends Python, logique métier, API et intégration sur des projets open source.',
    },
  },
  {
    title: { en: 'Data engineering', fr: 'Data engineering' },
    when: '2024',
    text: {
      en: 'ETL, quality controls and source-to-target reconciliation on large telecom datasets.',
      fr: 'ETL, contrôles qualité et réconciliation source-cible sur de gros volumes télécom.',
    },
  },
  {
    title: { en: 'AI engineering', fr: 'AI engineering' },
    when: '2024 – 2026',
    text: {
      en: 'Scoping GenAI use cases with business teams and turning them into prototypes.',
      fr: 'Cadrage de cas d’usage GenAI avec les métiers et passage au prototype.',
    },
  },
  {
    title: { en: 'GenAI · RAG · agents', fr: 'GenAI · RAG · agents' },
    when: { en: 'Now', fr: 'Aujourd’hui' },
    text: {
      en: 'Ingestion pipelines, hybrid retrieval, grounded answers and tool-using agents.',
      fr: 'Pipelines d’ingestion, retrieval hybride, réponses ancrées et agents outillés.',
    },
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
  page?: string; // slug of the dedicated "how it works" page
};

export const experience: Item[] = [
  {
    id: 'sonatel',
    title: { en: 'Data Migration Engineer', fr: 'Ingénieur Migrations de Données' },
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

export const projects: Item[] = [
  {
    id: 'migroo',
    page: 'migroo',
    title: { en: 'Migroo', fr: 'Migroo' },
    summary: {
      en: 'Document ingestion and indexing pipeline for enterprise RAG.',
      fr: 'Pipeline d’ingestion et d’indexation documentaire pour un RAG d’entreprise.',
    },
    status: 'pilot',
    tags: ['Python', 'FastAPI', 'Qdrant'],
    bullets: [
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
      {
        text: {
          en: 'Indexing and retrieval run locally; generation calls a hosted LLM by default. Code is production-ready, with a pilot under way at Sonatel.',
          fr: 'Indexation et retrieval tournent en local ; la génération appelle par défaut un LLM hébergé. Code prêt pour la production, pilote en cours à Sonatel.',
        },
        keywords: 'production deployment local',
      },
    ],
  },
  {
    id: 'sogolon',
    page: 'sogolon',
    title: { en: 'Sogolon', fr: 'Sogolon' },
    summary: {
      en: 'NL-to-SQL assistant for sales and collections reporting.',
      fr: 'Assistante NL-to-SQL pour le pilotage commercial et le recouvrement.',
    },
    status: 'delivery',
    tags: ['Python', 'FastAPI', 'MySQL', 'LLM', 'NL-to-SQL'],
    links: [{ label: { en: 'Try the demo', fr: 'Essayer la démo' }, url: '/demos/sogolon/' }],
    bullets: [
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
      {
        text: {
          en: 'A short business knowledge base and column comments document the schema’s traps; validated queries are replayed at zero token cost, and recurring reports use fixed queries so they stay reproducible.',
          fr: 'Une base de connaissance métier courte et des commentaires de colonnes documentent les pièges du schéma ; les requêtes validées sont rejouées sans aucun jeton, et les rapports récurrents utilisent des requêtes fixes pour rester reproductibles.',
        },
        keywords: 'knowledge base few-shot reporting evaluation cost tokens',
      },
    ],
  },
  {
    id: 'privasearch',
    page: 'privasearch',
    title: { en: 'PrivaSearch', fr: 'PrivaSearch' },
    summary: {
      en: 'On-premise RAG search engine.',
      fr: 'Moteur de recherche RAG on-premise.',
    },
    tags: ['ChromaDB', 'nomic-embed-text', 'Ollama'],
    bullets: [
      {
        text: {
          en: 'Fully local stack with embeddings and semantic search; grounding prompts constrain answers to the retrieved context to limit hallucinations. Powered by Migroo.',
          fr: 'Stack entièrement locale avec embeddings et recherche sémantique ; prompts de grounding contraignant les réponses au contexte récupéré pour limiter les hallucinations. Alimenté par Migroo.',
        },
        keywords: 'on-premise local privacy sovereignty hallucinations grounding semantic search ollama',
      },
    ],
  },
  {
    id: 'agent',
    page: 'orange-money-agent',
    title: { en: 'Orange Money AI Agent', fr: 'Orange Money AI Agent' },
    summary: { en: 'ReAct agent over a sandboxed API.', fr: 'Agent ReAct sur une API sandbox.' },
    status: 'personal',
    tags: ['LangChain', 'LangGraph', 'FastMCP'],
    bullets: [
      {
        text: {
          en: 'Multi-step ReAct agent with its tool-use prompts over a sandboxed API; iterated on prompt wording to improve tool selection and cut failed calls.',
          fr: 'Agent ReAct multi-étapes et ses prompts d’usage d’outils sur une API sandbox ; itérations sur les formulations pour mieux choisir les outils et réduire les appels en échec.',
        },
        keywords: 'agent agents tool use tools mcp react orchestration prompt engineering',
      },
    ],
  },
  {
    id: 'revizia',
    links: [{ label: { en: 'Open the app', fr: 'Ouvrir l’application' }, url: 'https://revizia-africas-future-learn.lovable.app/' }],
    title: { en: 'RéviZIA', fr: 'RéviZIA' },
    summary: { en: 'Generative-AI learning platform.', fr: 'Plateforme d’apprentissage par l’IA générative.' },
    bullets: [
      {
        text: {
          en: 'A learning platform built on generative AI.',
          fr: 'Une plateforme d’apprentissage reposant sur l’IA générative.',
        },
        keywords: 'education learning generative',
      },
    ],
  },
  {
    id: 'xamloo',
    title: { en: 'Xamloo', fr: 'Xamloo' },
    summary: { en: 'Semantic search over local data.', fr: 'Recherche sémantique sur données locales.' },
    status: 'paused',
    tags: ['Fireplexity'],
    bullets: [
      {
        text: {
          en: 'Semantic search prototype over local data, built on Fireplexity; currently on hold.',
          fr: 'Prototype de recherche sémantique sur données locales, bâti sur Fireplexity ; actuellement en pause.',
        },
        keywords: 'semantic search prototype',
      },
    ],
  },
];

export const stack: { group: L; items: string[]; note?: L }[] = [
  {
    group: { en: 'Retrieval & RAG', fr: 'Retrieval & RAG' },
    items: ['Qdrant', 'ChromaDB', 'nomic-embed-text', 'Hybrid search (dense + BM25, RRF)', 'Chunking & metadata', 'Grounding prompts'],
  },
  {
    group: { en: 'LLMs & agents', fr: 'LLM & agents' },
    items: ['OpenAI (GPT)', 'Ollama', 'LangChain', 'LangGraph', 'MCP / FastMCP', 'ReAct', 'Structured outputs', 'Evals'],
  },
  {
    group: { en: 'Engineering', fr: 'Développement' },
    items: ['Python', 'FastAPI', 'SQL', 'Java', 'Git', 'n8n'],
  },
  {
    group: { en: 'Data', fr: 'Données' },
    items: ['Talend Open Studio', 'Apache Airflow', 'Google BigQuery', 'Snowflake', 'pandas', 'Oracle', 'MySQL'],
  },
  {
    group: { en: 'Evaluated', fr: 'Évalués' },
    items: ['RAGFlow', 'Onyx'],
    note: {
      en: 'RAGFlow benchmarked as a turnkey platform against a pipeline I control; Onyx studied as a front-end integration.',
      fr: 'RAGFlow comparé, en tant que plateforme clé en main, à un pipeline maîtrisé ; Onyx étudié comme composant d’intégration front.',
    },
  },
];

export const education = [
  {
    title: { en: 'M.Sc. Data Science', fr: 'M.Sc. Data Science' },
    org: { en: 'Université Alioune Diop de Bambey, Senegal', fr: 'Université Alioune Diop de Bambey, Sénégal' },
  },
  {
    title: { en: 'Data Analyst Nanodegree', fr: 'Data Analyst Nanodegree' },
    org: { en: 'Udacity (ALX-T)', fr: 'Udacity (ALX-T)' },
    link: 'https://confirm.udacity.com/AXEPFQAJ',
  },
];

// ---------- Retrieval corpus ----------
// Child chunks = single bullets (what gets scored). Parent = the whole item (shown as context).
export type Chunk = {
  id: string;
  path: L; // human-readable provenance
  anchor: string; // section id on the page
  text: L;
  parent: L;
  keywords: string;
};

function parentOf(it: Item, lang: 'en' | 'fr') {
  const head = [it.title[lang], it.org?.[lang], it.when].filter(Boolean).join(' · ');
  return head + '\n' + it.bullets.map((b) => '– ' + b.text[lang]).join('\n');
}

export function buildCorpus(): Chunk[] {
  const out: Chunk[] = [];
  const add = (section: L, anchor: string, it: Item) => {
    it.bullets.forEach((b, i) => {
      out.push({
        id: `${it.id}#${i + 1}`,
        path: {
          en: `${section.en} › ${it.title.en} › item ${i + 1}`,
          fr: `${section.fr} › ${it.title.fr} › point ${i + 1}`,
        },
        anchor,
        text: b.text,
        parent: { en: parentOf(it, 'en'), fr: parentOf(it, 'fr') },
        keywords: [b.keywords ?? '', (it.tags ?? []).join(' '), it.title.en].join(' '),
      });
    });
  };
  experience.forEach((it) => add({ en: 'Experience', fr: 'Expérience' }, 'work', it));
  projects.forEach((it) => add({ en: 'Projects', fr: 'Projets' }, 'projects', it));
  stack.forEach((s, i) => {
    const text = { en: `${s.group.en}: ${s.items.join(', ')}.` + (s.note ? ' ' + s.note.en : ''), fr: `${s.group.fr} : ${s.items.join(', ')}.` + (s.note ? ' ' + s.note.fr : '') };
    out.push({
      id: `stack#${i + 1}`,
      path: { en: `Stack › ${s.group.en}`, fr: `Stack › ${s.group.fr}` },
      anchor: 'stack',
      text,
      parent: text,
      keywords: s.items.join(' '),
    });
  });
  education.forEach((e, i) => {
    const text = { en: `${e.title.en}, ${e.org.en}.`, fr: `${e.title.fr}, ${e.org.fr}.` };
    out.push({
      id: `edu#${i + 1}`,
      path: { en: `Education › ${e.title.en}`, fr: `Formation › ${e.title.fr}` },
      anchor: 'stack',
      text,
      parent: text,
      keywords: 'education degree diploma master formation diplôme',
    });
  });
  out.push({
    id: 'profile#1',
    path: { en: 'Profile › Languages', fr: 'Profil › Langues' },
    anchor: 'contact',
    text: { en: 'Based in Dakar, Senegal. Languages: French (native), English (C1).', fr: 'Basé à Dakar, Sénégal. Langues : français (natif), anglais (C1).' },
    parent: { en: 'Based in Dakar, Senegal. Languages: French (native), English (C1).', fr: 'Basé à Dakar, Sénégal. Langues : français (natif), anglais (C1).' },
    keywords: 'languages english french location remote',
  });
  return out;
}
