variable "vercel_team" {
  description = "Identifiant de l'équipe Vercel (laisser null pour un compte personnel)."
  type        = string
  default     = null
}

variable "project_name" {
  description = "Nom du projet Vercel ; il donne l'adresse <nom>.vercel.app."
  type        = string
  default     = "arona-diatta-ia"
}

variable "github_repo" {
  description = "Dépôt GitHub déployé à chaque push sur la branche principale."
  type        = string
  default     = "rooniweb/portfolio"
}

variable "existing_project_id" {
  description = "ID du projet Vercel déjà créé à la main (Settings > General), pour l'importer au lieu d'en recréer un."
  type        = string
  default     = null
}

variable "custom_domain" {
  description = "Domaine personnel à rattacher au site (ex. aronadiatta.com) ; null pour n'en ajouter aucun."
  type        = string
  default     = null
}

variable "rag_api_url" {
  description = "URL du backend de génération pour la démo RAG (PUBLIC_RAG_API) ; null pour garder le retrieval seul."
  type        = string
  default     = null
}
