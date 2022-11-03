data "google_secret_manager_secret_version" "Auth0_client_id" {
  secret = "${var.secret_prefix}_AUTH0_CLIENT_ID"
}

data "google_secret_manager_secret_version" "Auth0_client_secret" {
  secret = "${var.secret_prefix}_AUTH0_CLIENT_SECRET"
}

data "google_secret_manager_secret_version" "Auth0_domain" {
  secret = "${var.secret_prefix}_AUTH0_DOMAIN"
}

data "google_secret_manager_secret_version" "Node_env" {
  secret = "${var.secret_prefix}_NODE_ENV"
}

data "google_secret_manager_secret_version" "Slack_webhook_url" {
  secret = "${var.secret_prefix}_SLACK_WEBHOOK_URL"
}

data "google_secret_manager_secret_version" "Slack_wizeq_domain" {
  secret = "${var.secret_prefix}_SLACK_WIZEQ_DOMAIN"
}

data "google_secret_manager_secret_version" "Db_host" {
  secret = "${var.secret_prefix}_DB_HOST"
}

data "google_secret_manager_secret_version" "Db_name" {
  secret = "${var.secret_prefix}_DB_NAME"
}

data "google_secret_manager_secret_version" "Db_password" {
  secret = "${var.secret_prefix}_DB_PASSWORD"
}

data "google_secret_manager_secret_version" "Db_port" {
  secret = "${var.secret_prefix}_DB_PORT"
}

data "google_secret_manager_secret_version" "Db_user" {
  secret = "${var.secret_prefix}_DB_USER"
}

data "google_secret_manager_secret_version" "Wizeq_url" {
  secret = "${var.secret_prefix}_WIZEQ_URL"
}
