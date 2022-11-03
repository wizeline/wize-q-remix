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
  // slack_webhook_url   = data.google_secret_manager_secret_version.Slack_webhook_url.secret_data
  // slack_wizeq_domain  = data.google_secret_manager_secret_version.Slack_wizeq_domain.secret_data
  db_url             = format("$s://$s:$s@$s/$s", "mysql", data.google_secret_manager_secret_version.Db_user.secret_data, data.google_secret_manager_secret_version.Db_password.secret_data, data.google_secret_manager_secret_version.Db_host.secret_data, data.google_secret_manager_secret_version.Db_name.secret_data)
  base_url           = data.google_secret_manager_secret_version.Wizeq_url.secret_data

  // db_host            = module.cloud_sql.db_host
  // db_connection_name = module.cloud_sql.db_connection_name
}
