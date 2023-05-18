module "cloud_run" {
  source = "./modules/cloud_run"

  prefix = local.prefix

  cidr_range          = var.cidr_range
  region              = var.region
  short_sha           = var.short_sha
  secret_prefix       = var.secret_prefix
  cr_cpu_limit        = var.cr_cpu_limit
  cr_memory_limit     = var.cr_memory_limit
  cr_max_scale        = var.cr_max_scale
  auth0_client_id     = data.google_secret_manager_secret_version.Auth0_client_id.secret_data
  auth0_client_secret = data.google_secret_manager_secret_version.Auth0_client_secret.secret_data
  auth0_domain        = data.google_secret_manager_secret_version.Auth0_domain.secret_data
  node_env            = data.google_secret_manager_secret_version.Node_env.secret_data
  slack_webhook_url   = data.google_secret_manager_secret_version.Slack_webhook_url.secret_data
  slack_webhook_url_admin = data.google_secret_manager_secret_version.Slack_webhook_url_admin.secret_data
  slack_wizeq_domain  = data.google_secret_manager_secret_version.Slack_wizeq_domain.secret_data
  db_url              = "mysql://${data.google_secret_manager_secret_version.Db_user.secret_data}:${data.google_secret_manager_secret_version.Db_password.secret_data}@${module.cloud_sql.db_host}/${data.google_secret_manager_secret_version.Db_name.secret_data}"
  base_url            = data.google_secret_manager_secret_version.Wizeq_url.secret_data
  session_secret      = data.google_secret_manager_secret_version.Session_secret.secret_data
  email_host          = data.google_secret_manager_secret_version.Email_host.secret_data
  email_port          = data.google_secret_manager_secret_version.Email_port.secret_data
  email_auth_user     = data.google_secret_manager_secret_version.Email_auth_user.secret_data
  email_auth_password = data.google_secret_manager_secret_version.Email_auth_password.secret_data
  email_service       = data.google_secret_manager_secret_version.Email_service.secret_data
  api_key             = data.google_secret_manager_secret_version.Api_key.secret_data
  // db_host            = module.cloud_sql.db_host
  // db_connection_name = module.cloud_sql.db_connection_name
}

module "cloud_sql" {
  source = "./modules/cloud_sql"

  prefix = local.prefix

  db_tier     = var.db_tier
  sql_version = var.sql_version
  region      = var.region

  secret_db_user     = data.google_secret_manager_secret_version.Db_user.secret_data
  secret_db_password = data.google_secret_manager_secret_version.Db_password.secret_data
  db_name            = data.google_secret_manager_secret_version.Db_name.secret_data

}

module "cloud_scheduler_manager_email_queue" {
  source      = "./modules/cloud_scheduler"

  prefix = local.prefix

  name        = "api_manager_email_queue_call"
  description = "API call for manager email queue"
  enabled     = true

  http_target = {
    http_method = "POST",
    uri         = join("/", [data.google_secret_manager_secret_version.Wizeq_url.secret_data, "api", "emails", "sendManagerReminder"])
    body        = "{}"
    apiKey      = data.google_secret_manager_secret_version.Api_key.secret_data
  }
}


