# Infrastructure du portfolio (Terraform)

Décrit en code le projet Vercel qui publie ce site : nom, framework Astro, lien avec le dépôt GitHub,
et deux options, un domaine personnel et l'URL d'un backend pour la démo RAG.

## Première utilisation

Le projet Vercel existe déjà (créé dans l'interface). Terraform l'importe au lieu d'en recréer un.

1. Créer un jeton sur vercel.com > Account Settings > Tokens.
2. Copier l'ID du projet : Vercel > projet > Settings > General > Project ID.
3. Lancer :

```bash
cd infra/terraform
export VERCEL_API_TOKEN="..."          # jamais dans un fichier versionné
cp terraform.tfvars.example terraform.tfvars   # puis renseigner existing_project_id
terraform init
terraform plan                         # doit annoncer « 1 to import », sans destruction
terraform apply
```

Après l'import, toute modification (domaine, variable d'environnement) passe par `terraform plan` puis `apply`.

## Contrôle continu

Le workflow `.github/workflows/terraform.yml` vérifie à chaque modification de ce dossier
que le code est formaté (`terraform fmt`) et valide (`terraform validate`). Il n'a besoin d'aucun secret.
