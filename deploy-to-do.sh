#!/bin/bash

# Deploy to DigitalOcean App Platform

echo "Deploying Reluctant Salesman Landing Page to DigitalOcean..."

# Set your API token
export DIGITALOCEAN_TOKEN="${DIGITALOCEAN_TOKEN:-YOUR_API_TOKEN_HERE}"

# Create the app using the app.json spec
echo "Creating app on DigitalOcean App Platform..."
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DIGITALOCEAN_TOKEN" \
  -d '{
    "spec": {
      "name": "reluctant-salesman",
      "region": "lon",
      "static_sites": [
        {
          "name": "web",
          "github": {
            "repo": "craigmaing/reluctant-salesman-landing",
            "branch": "master",
            "deploy_on_push": true
          },
          "build_command": "npm run build",
          "output_dir": "dist",
          "environment_slug": "node-js",
          "envs": [
            {
              "key": "RESEND_API_KEY",
              "value": "YOUR_RESEND_API_KEY_HERE",
              "scope": "BUILD_TIME",
              "type": "SECRET"
            },
            {
              "key": "PUBLIC_SITE_URL",
              "value": "https://thereluctantsalesman.com",
              "scope": "BUILD_TIME",
              "type": "GENERAL"
            }
          ],
          "routes": [
            {
              "path": "/"
            }
          ]
        }
      ]
    }
  }' \
  https://api.digitalocean.com/v2/apps

echo "App deployment initiated!"
echo "Visit https://cloud.digitalocean.com/apps to monitor the deployment"