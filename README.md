# Site portfolio — Arona Ben Cherif Diatta

Site statique Astro, bilingue (EN sur `/`, FR sur `/fr/`, bascule instantanée via le bouton de langue).
La démo « Interrogez mon parcours » est un retriever hybride qui tourne dans le navigateur :
BM25 (mots) + TF-IDF sur trigrammes de caractères, fusionnés par RRF. Chaque résultat cite
le paragraphe exact (¶) de la page, et un clic sur la citation y fait défiler et le surligne.

## Modifier le contenu
Tout le texte est dans `src/data/content.ts` (une seule source de vérité, EN + FR).
L'index de la démo est reconstruit automatiquement à partir de ce fichier à chaque build.

## Lancer en local
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/
```

## Déployer sur Vercel
1. Créer un dépôt GitHub (ex. `rooniweb/portfolio`) et y pousser ce dossier.
2. Sur vercel.com : *Add New → Project*, importer le dépôt. Vercel détecte Astro tout seul
   (build `npm run build`, sortie `dist`).
3. Optionnel : connecter un domaine personnel dans *Settings → Domains*, puis mettre à jour
   `site` dans `astro.config.mjs`.

## Brancher plus tard une vraie génération (FastAPI)
Définir la variable d'environnement `PUBLIC_RAG_API` dans Vercel (URL de ton endpoint).
La page enverra alors un `POST` JSON :
```json
{ "question": "...", "lang": "fr", "contexts": [{ "id": "migroo#2", "text": "..." }] }
```
et affichera `answer` de la réponse au-dessus des passages cités. Sans cette variable,
la démo reste en mode retrieval seul (aucune clé API exposée, aucun coût).
