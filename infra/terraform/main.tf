# Infrastructure du portfolio décrite en code : le projet Vercel, son lien avec GitHub,
# et deux options (domaine personnel, URL du backend RAG).

# Reprend le projet créé à la main dans l'interface Vercel au lieu d'en créer un second.
import {
  for_each = var.existing_project_id == null ? toset([]) : toset([var.existing_project_id])
  to       = vercel_project.portfolio
  id       = each.value
}

resource "vercel_project" "portfolio" {
  name      = var.project_name
  framework = "astro"

  git_repository = {
    type = "github"
    repo = var.github_repo
  }
}

resource "vercel_project_domain" "custom" {
  count = var.custom_domain == null ? 0 : 1

  project_id = vercel_project.portfolio.id
  domain     = var.custom_domain
}

resource "vercel_project_environment_variable" "rag_api" {
  count = var.rag_api_url == null ? 0 : 1

  project_id = vercel_project.portfolio.id
  key        = "PUBLIC_RAG_API"
  value      = var.rag_api_url
  target     = ["production", "preview"]
  sensitive  = false # URL publique, lue par le navigateur
}
