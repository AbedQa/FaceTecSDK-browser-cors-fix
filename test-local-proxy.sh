#!/bin/bash

echo "🧪 Testing Local CORS Proxy Server..."
echo "📋 This will run the proxy locally for immediate testing"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install express http-proxy-middleware cors
fi

echo ""
echo "🌐 Starting local proxy server on http://localhost:3000"
echo "📡 This will proxy Orange API calls and add CORS headers"
echo ""
echo "Available endpoints:"
echo "  POST http://localhost:3000/api/orange/login"
echo "  GET  http://localhost:3000/api/orange/session-token"
echo ""
echo "⚠️  For this to work, update your OrangeAuthenticationProcessor.js to use:"
echo "   this.firebaseFunctionsURL = 'http://localhost:3000';"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Update client to use localhost temporarily
if grep -q "us-central1-orange-jood.cloudfunctions.net" sample-apps/sample-app-js/processors/OrangeAuthenticationProcessor.js; then
    echo "🔧 Temporarily updating client to use localhost..."
    sed -i '' 's|https://us-central1-orange-jood.cloudfunctions.net|http://localhost:3000|g' sample-apps/sample-app-js/processors/OrangeAuthenticationProcessor.js
    sed -i '' 's|/orangeLogin|/api/orange/login|g' sample-apps/sample-app-js/processors/OrangeAuthenticationProcessor.js
    sed -i '' 's|/orangeSessionToken|/api/orange/session-token|g' sample-apps/sample-app-js/processors/OrangeAuthenticationProcessor.js
fi

node cors-proxy-server.js
