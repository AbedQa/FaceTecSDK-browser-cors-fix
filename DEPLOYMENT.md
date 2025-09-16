# Orange Jood - FaceTec Browser SDK Deployment Guide

## 🚀 Firebase Hosting Deployment (COMPLETED)

Your FaceTec app is now live at: **https://orange-jood.web.app**

### Access URLs:
- **Main App**: https://orange-jood.web.app
- **Direct App Link**: https://orange-jood.web.app/app

## 🔧 Proxy Server Setup (Required for Orange API Integration)

The app currently uses placeholder URLs for the Orange API proxy. You need to deploy the proxy server to make the Orange integration work.

### Option 1: Deploy to Heroku (Recommended)

1. **Create a Heroku account** at https://heroku.com
2. **Install Heroku CLI** from https://devcenter.heroku.com/articles/heroku-cli
3. **Login to Heroku**: `heroku login`
4. **Create a new app**: `heroku create orange-jood-proxy`
5. **Deploy the proxy server**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```
6. **Update the URLs** in the following files:
   - `sample-apps/sample-app-js/processors/OrangeAuthenticationProcessor.js`
   - `sample-apps/sample-app-js/processors/PhotoIDMatchProcessor.js`
   
   Replace `https://your-proxy-server.herokuapp.com` with your actual Heroku URL.

### Option 2: Deploy to Railway

1. **Create a Railway account** at https://railway.app
2. **Connect your GitHub repository**
3. **Deploy** using the `proxy-server.js` file
4. **Update the URLs** in the client files

### Option 3: Deploy to Render

1. **Create a Render account** at https://render.com
2. **Create a new Web Service**
3. **Use the `proxy-server.js` file**
4. **Update the URLs** in the client files

## 📁 Project Structure

```
orange-jood/
├── sample-apps/sample-app-js/          # Main FaceTec app
│   ├── index.html                      # Main app page
│   ├── sampleAppController.js          # App controller
│   └── processors/                     # Orange API processors
├── proxy-server.js                     # Orange API proxy server
├── package.json                        # Proxy server dependencies
├── firebase.json                       # Firebase hosting config
└── DEPLOYMENT.md                       # This file
```

## 🔑 Features

- **🔐 Orange Authentication**: Two-step login process
- **🎯 Match Face To ID**: Photo ID scanning and matching
- **📋 Detailed Results**: Comprehensive display of scan results
- **🎨 Clean UI**: Black text on white background for readability

## 🛠️ Local Development

1. **Install dependencies**: `npm install`
2. **Start proxy server**: `npm start`
3. **Update URLs** to use `http://localhost:3001`
4. **Open the app** in your browser

## 📝 Notes

- The app is currently deployed to Firebase Hosting
- Orange API integration requires a proxy server due to CORS restrictions
- All Orange API credentials and headers are preserved from your original curl commands
- The proxy server handles all the complex headers and authentication

## 🆘 Support

If you need help with deployment or configuration, please check:
- Firebase Console: https://console.firebase.google.com/project/orange-jood/overview
- Your deployed app: https://orange-jood.web.app
