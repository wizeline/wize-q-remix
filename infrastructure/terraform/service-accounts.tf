# Service Account for WizePrompt team to Connect to CloudSQL from AWS
resource "google_service_account" "wizeprompt" {
  display_name = "WizePrompt - CloudSQL Connect"
  account_id   = "wizeprompt"
  description  = "Allow WizePrompt team to connect to CloudSQL with read-only privileges"
  disabled     = false
}
