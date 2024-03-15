# CloudSQL Read Permissions for WizePrompt SA
resource "google_project_iam_member" "wizeprompt__cloudsql__reader" {
  project = "wizeline-questions"
  role = "roles/cloudsql.viewer"
  member = "serviceAccount:${google_service_account.wizeprompt.email}"
}
