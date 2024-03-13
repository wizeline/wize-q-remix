# CloudSQL Read Permissions for WizePrompt SA
resource "google_project_iam_member" "wizeprompt__cloudsql__reader" {
  role = "roles/cloudsql.viewer"
  members = [
    "serviceAccount:${google_service_account.wizeprompt.email}",
  ]
}
