terraform {
  backend "gcs" {
    bucket = "wizeq-remix-tfstate"
    prefix = "terraform/state"
  }
}
