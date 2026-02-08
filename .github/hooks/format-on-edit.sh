#!/bin/bash

# Read JSON from stdin
json_input=$(cat)

# Extract toolName from JSON
tool_name=$(echo "$json_input" | jq -r '.toolName')

# Only run prettier if toolName is "create" or "edit"
if [ "$tool_name" = "create" ] || [ "$tool_name" = "edit" ]; then
  npx prettier --write .
fi
