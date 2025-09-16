# 🚀 Deploy CORS Proxy to Vercel (Free)

Since Firebase Functions require billing, here's how to deploy your CORS proxy to Vercel for free:

## Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

## Step 2: Create Vercel Configuration
Already created: `vercel.json` in your project root

## Step 3: Deploy
```bash
vercel --prod
```

## Step 4: Update Your Client Code
After deployment, Vercel will give you a URL like:
`https://your-app-name.vercel.app`

Update your `OrangeAuthenticationProcessor.js`:
```javascript
this.firebaseFunctionsURL = "https://your-vercel-url.vercel.app";
this.orangeLoginURL = this.firebaseFunctionsURL + "/api/orange/login";
this.orangeSessionTokenURL = this.firebaseFunctionsURL + "/api/orange/session-token";
```

## Alternative: Railway (Also Free)
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

## Alternative: Render (Also Free)
1. Go to render.com
2. Connect your GitHub repo
3. Deploy as Web Service
4. Use the provided URL

All these services provide HTTPS URLs that will work with CORS!
