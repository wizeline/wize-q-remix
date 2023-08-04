variable "prefix" {
  description = "Prefix name for all resources"
  default     = "wizeq"
  type        = string
}

variable "state_bucket" {
  default = "wizeq-remix-tfstate"
  type    = string
}

variable "region" {
  default = "us-central1"
  type    = string
}

variable "project" {
  default = "Wizeline-Questions"
  type    = string
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

variable "app_env" {
  type = string
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

variable "sql_version" {
  default = "MYSQL_5_7"
}

variable "pg_sql_version" {
  default = "POSTGRES_14"
}

variable "db_tier" {
  type = string
}

variable "db_engine" {
  type = string
  default = "mysql"
}

# variable "db_name" {
#   type = string
# }