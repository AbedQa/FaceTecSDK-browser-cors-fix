#!/bin/bash

echo "🚀 Deploying Orange CORS Proxy to Vercel..."
echo "📋 This will solve the CORS issue by deploying to a free hosting service"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo ""
echo "🌐 Deploying to Vercel..."
echo "📡 This will create a public HTTPS URL for your CORS proxy"
echo ""

# Deploy to Vercel
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Copy the deployment URL from above"
echo "2. Update your OrangeAuthenticationProcessor.js with the new URL"
echo "3. Replace 'https://us-central1-orange-jood.cloudfunctions.net' with your Vercel URL"
echo ""
echo "Example:"
echo "this.firebaseFunctionsURL = 'https://your-app-name.vercel.app';"
echo ""
