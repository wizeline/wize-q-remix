resource "google_cloud_run_service" "app" {
  location = var.region
  name     = "${var.prefix}-app"

  template {
    spec {
      containers {
        image = "gcr.io/wizeline-questions/wize-q-remix:${var.short_sha}"
        resources {
          limits = {
            "cpu"    = var.cr_cpu_limit
            "memory" = var.cr_memory_limit
          }
        }
        env {
          name  = "AUTH0_CLIENT_ID"
          value = var.auth0_client_id
        }
        env {
          name  = "AUTH0_CLIENT_SECRET"
          value = var.auth0_client_secret
        }
        env {
          name  = "AUTH0_DOMAIN"
          value = var.auth0_domain
        }
        env {
          name  = "SESSION_SECRET"
          value = var.session_secret
        }
        env {
          name  = "NODE_ENV"
          value = var.node_env
        }
        env {
          name  = "SLACK_WEBHOOK_URL"
          value = var.slack_webhook_url
        }
        env {
          name = "SLACK_WEBHOOK_URL_ADMIN"
          value = var.slack_webhook_url_admin
        }
        env {
          name  = "SLACK_WIZEQ_DOMAIN"
          value = var.slack_wizeq_domain
        }
        env {
          name  = "DATABASE_URL"
          value = var.db_url
        }
        env {
          name  = "BASE_URL"
          value = var.base_url
        }
        env {
          name = "EMAIL_HOST"
          value = var.email_host
        }
        env {
          name = "EMAIL_PORT"
          value = var.email_port
        }
        env {
          name = "EMAIL_AUTH_USER"
          value = var.email_auth_user
        }
        env {
          name = "EMAIL_AUTH_PASSWORD"
          value = var.email_auth_password
        }
        env {
          name = "EMAIL_SERVICE"
          value = var.email_service
        }
        env {
          name = "API_KEY"
          value = var.api_key
        }
      }

    }

    metadata {
      annotations = {
        "run.googleapis.com/client-name"          = "terraform"
        // "run.googleapis.com/cloudsql-instances"   = var.db_connection_name
        "autoscaling.knative.dev/maxScale"        = var.cr_max_scale
        "run.googleapis.com/vpc-access-connector" = google_vpc_access_connector.connector.id
        "run.googleapis.com/vpc-access-egress"    = "private-ranges-only"
      }
    }
  }

  autogenerate_revision_name = true
  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [
    google_vpc_access_connector.connector
  ]
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.app.location
  project  = google_cloud_run_service.app.project
  service  = google_cloud_run_service.app.name

  policy_data = data.google_iam_policy.noauth.policy_data
}

resource "google_vpc_access_connector" "connector" {
  region         = var.region
  name           = substr("${var.prefix}-connector", 0, 25)
  ip_cidr_range  = var.cidr_range
  network        = "default"
  max_throughput = 1000
}
