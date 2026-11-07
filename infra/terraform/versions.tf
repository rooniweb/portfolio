terraform {
  required_version = ">= 1.7"

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = ">= 2.0"
    }
  }
}

# Le jeton est lu dans la variable d'environnement VERCEL_API_TOKEN : jamais dans le code.
provider "vercel" {
  team = var.vercel_team
}
