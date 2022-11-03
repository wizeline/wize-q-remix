variable "prefix" {
  description = "Prefix name for all resources"
  default     = "wizeq"
  type        = string
}

variable "short_sha" {
  description = "Set short sha to create the container"
  default     = "latest"
  type        = string
}

variable "cidr_range" {
  default = "10.10.0.0/28"
  type    = string
}

variable "region" {
  default = "us-central1"
  type    = string
}

variable "secret_prefix" {
  type = string
}

variable "cr_cpu_limit" {
  type = string
}

variable "cr_memory_limit" {
  type = string
}

variable "cr_max_scale" {
  type = string
}

variable "auth0_client_id" {
  type = string
}

variable "auth0_client_secret" {
  type = string
}

variable "auth0_domain" {
  type = string
}

variable "session_secret" {
  type = string
}

variable "node_env" {
  type = string
}

# variable "slack_webhook_url" {
#   type = string
# }

# variable "slack_wizeq_domain" {
#   type = string
# }

variable "db_url" {
  type = string
}

variable "base_url" {
  type = string
}

variable "db_connection_name" {
  type = string
}