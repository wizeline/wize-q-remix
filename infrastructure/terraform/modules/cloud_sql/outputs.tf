output "db_host" {
  value = google_sql_database_instance.sql_instance.private_ip_address
}

output "db_connection_name" {
  value = google_sql_database_instance.sql_instance.connection_name
}
