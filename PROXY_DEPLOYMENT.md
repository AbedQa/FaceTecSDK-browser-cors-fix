# 🚀 Deploy Orange API Proxy Server to Vercel

## Quick Deploy to Vercel (Recommended - Free)

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub (recommended)

### Step 2: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy the proxy server
vercel --prod

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - What's your project's name? orange-jood-proxy
# - In which directory is your code located? ./
```

### Step 3: Your proxy will be available at:
`https://orange-jood-proxy.vercel.app`

## Alternative: Deploy via GitHub

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Add Orange API proxy server"
git branch -M main
git remote add origin https://github.com/yourusername/orange-jood-proxy.git
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect the Node.js project
5. Deploy!

## ✅ After Deployment

Your proxy server will be available at:
- **Login**: `https://orange-jood-proxy.vercel.app/api/orange/login`
- **Session Token**: `https://orange-jood-proxy.vercel.app/api/orange/session-token`
- **Enrollment**: `https://orange-jood-proxy.vercel.app/api/orange/enrollment-3d`
- **ID Match**: `https://orange-jood-proxy.vercel.app/api/orange/match-3d-2d-idscan`

## 🔧 Test the Proxy

Visit: `https://orange-jood-proxy.vercel.app/health`

You should see:
```json
{
  "status": "OK",
  "message": "Orange API Proxy Server is running"
}
```

## 📱 Test the Full App

1. Go to: https://orange-jood.web.app
2. Click "🔐 Orange Authentication"
3. Click "Match Face To ID"
4. Enjoy your working Orange Jood app! 🎉

## 🆘 Troubleshooting

If you get CORS errors:
1. Make sure the proxy server is deployed and accessible
2. Check the URLs in the client files match your deployed proxy URL
3. Verify the proxy server is responding at `/health`

## 📞 Support

- Vercel Dashboard: https://vercel.com/dashboard
- Your Firebase App: https://orange-jood.web.app
