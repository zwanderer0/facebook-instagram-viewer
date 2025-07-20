#!/bin/bash

# Create new Netlify site
echo "Creating new Netlify site..."

# Use expect to handle interactive prompts
expect << EOF
spawn netlify sites:create
expect "? Team:"
send "\r"
expect "? Project name"
send "\r"
expect eof
EOF

# Now deploy
echo "Deploying site..."
netlify deploy --dir=public --prod