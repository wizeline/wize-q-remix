resource "google_cloud_scheduler_job" "scheduler_job" {
  name = "${var.prefix}-${var.name}"
  description = var.description
  schedule = var.schedule
  time_zone = var.timezone
  attempt_deadline = "320s"
  paused = !var.enabled

  retry_config {
    retry_count = 1
  }

  http_target {
    http_method = var.http_target.http_method 
    uri = var.http_target.uri
    body = base64encode(var.http_target.body)

    headers = {
      API_KEY = var.http_target.apiKey
    }
  }
}

