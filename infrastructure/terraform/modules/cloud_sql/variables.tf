variable "prefix" {
  description = "Prefix name for all resources"
  default     = "wizeq"
  type        = string
}

variable "sql_version" {
  default = "MYSQL_5_7"
  type    = string
}

variable "db_tier" {
  type = string
}

variable "db_name" {
  type = string
}

variable "region" {
  default = "us-central1"
  type    = string
}

variable "secret_db_user" {
  type = string
}

variable "secret_db_password" {
  type = string
}