data "google_compute_network" "private_network" {
  name = "default"

}

resource "google_compute_global_address" "private_ip_address" {
  name          = "${var.prefix}-private-ip"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = data.google_compute_network.private_network.self_link
}

resource "google_service_networking_connection" "private_vpc_connection" {
  network = data.google_compute_network.private_network.self_link
  service = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [
  google_compute_global_address.private_ip_address.name]
}

resource "google_sql_database_instance" "sql_instance" {
  name             = "${var.prefix}-instance"
  region           = var.region
  database_version = var.sql_version

  settings {
    tier = var.db_tier

    backup_configuration {
      enabled    = true
      start_time = "19:00"
      transaction_log_retention_days = 7
      backup_retention_settings {
        retained_backups = 7
      }
    }

    ip_configuration {
      ipv4_enabled    = "true"
      private_network = data.google_compute_network.private_network.self_link

    }

  }
  depends_on = [
  google_service_networking_connection.private_vpc_connection]
  deletion_protection = "false"
}

resource "google_sql_database" "database" {
  name     = var.db_name
  instance = google_sql_database_instance.sql_instance.name
}

resource "google_sql_user" "users" {
  name     = var.secret_db_user
  instance = google_sql_database_instance.sql_instance.name
  password = var.secret_db_password

}