#!/bin/bash

echo "Authenticating with Xray..."

TOKEN=$(curl -s -H "Content-Type: application/json" \
    -X POST "https://xray.cloud.getxray.app/api/v2/authenticate" \
    -d "{\"client_id\":\"$XRAY_CLIENT_ID\",\"client_secret\":\"$XRAY_CLIENT_SECRET\"}" \
    | tr -d '"')

if [[ -z "$TOKEN" ]]; then
    echo "Authentication failed!"
    exit 1
fi

echo "Authentication successful."

echo "Uploading Cucumber JSON report to Xray..."

RESPONSE=$(curl -s \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -X POST \
    --data @reports/cucumber.json \
    "https://xray.cloud.getxray.app/api/v2/import/execution/cucumber")

echo "$RESPONSE"

EXEC_ID=$(echo "$RESPONSE" | jq -r '.key')

echo "Check Xray Execution ID: $EXEC_ID"
