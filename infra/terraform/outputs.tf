output "project_id" {
  description = "Identifiant du projet Vercel géré par Terraform."
  value       = vercel_project.portfolio.id
}
