variable "prefix" {
  description = "Prefix name for all resources"
  default     = "wizeq"
  type        = string
}


variable "name" {
  description = "Name of the scheduler"
  type = string
}


variable "description" {
  description = "Optional descriptor for the scheduler"
  type = string
  default = ""
}

variable "enabled" {
  description = "Pauses scheduler if needed"
  type = bool
  default = true
}

variable "timezone" {
  description = "Timezone that will be used to determine trigger"
  type = string
  default = "America/Mexico_City"
}

variable "schedule" {
  description = "UNIX type scheduler string"
  default = "0 10 * * *"
  type = string
}

variable "http_target" {
  type = object({
    http_method = string
    uri = string
    body = string
    apiKey = string
  })
  sensitive = true
  
}
