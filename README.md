# FaceTec SDK Browser with CORS Solution

A complete implementation of FaceTec SDK for web browsers with a working solution for CORS (Cross-Origin Resource Sharing) issues when integrating with Orange APIs.

## 🚫 The CORS Problem

When using FaceTec SDK in a browser to connect to Orange APIs (`https://xpapis.orange.jo`), you encounter CORS errors because the Orange API server doesn't send the required CORS headers. This blocks legitimate browser requests due to security policies.

## ✅ The Solution

This project provides **multiple working solutions** to bypass CORS restrictions:

### 1. 🚀 Vercel Deployment (Recommended)
Deploy a serverless CORS proxy to Vercel (free):
```bash
./deploy-vercel.sh
```

### 2. 🔥 Firebase Functions
Deploy to Firebase Functions (requires billing):
```bash
firebase deploy --only functions
```

### 3. 🧪 Local Development
Test locally with proxy server:
```bash
./test-local-proxy.sh
```

## 📁 Project Structure

```
├── sample-apps/
│   └── sample-app-js/           # Main FaceTec sample application
│       ├── processors/
│       │   └── OrangeAuthenticationProcessor.js  # ✅ CORS-fixed processor
│       └── index.html
├── api/
│   └── orange-proxy.js          # Vercel serverless function
├── functions/
│   └── index.js                 # Firebase Functions
├── core-sdk/                    # FaceTec SDK files
├── vercel.json                  # Vercel deployment config
├── firebase.json                # Firebase config
└── deploy-vercel.sh             # Easy deployment script
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 14+
- FaceTec SDK License (update in Config.js)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd FaceTecSDK-browser-cors-fix
   ```

2. **Choose your deployment method:**

   **Option A: Deploy to Vercel (Free)**
   ```bash
   npm install -g vercel
   ./deploy-vercel.sh
   ```

   **Option B: Test Locally**
   ```bash
   ./test-local-proxy.sh
   ```

   **Option C: Firebase Functions**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase deploy --only functions
   ```

3. **Update your app URL** in `OrangeAuthenticationProcessor.js` with the deployed URL

## 🔧 Configuration

### Orange API Credentials
Update the following in `OrangeAuthenticationProcessor.js`:
- `apikey`: Your Orange API key
- `deviceId`: Your device identifier
- `payload`: Your encrypted login payload

### FaceTec License
Update `Config.js` with your FaceTec production license key.

## 🌐 API Endpoints

The CORS proxy provides these endpoints:

- `POST /api/orange/login` - Orange user authentication
- `GET /api/orange/session-token` - FaceTec session token
- `POST /api/orange/enrollment-3d` - 3D face enrollment
- `POST /api/orange/match-3d-2d-idscan` - Face matching with ID scan

## 🧪 Testing

### Local Testing
```bash
# Start local proxy server
./test-local-proxy.sh

# Open your browser to
http://localhost:8080/sample-apps/sample-app-js/
```

### Production Testing
After deploying to Vercel or Firebase:
```bash
# Your deployed URL
https://your-app.vercel.app/sample-apps/sample-app-js/
```

## 🚀 Deployment Options

### Vercel (Recommended - Free)
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Easy deployment

### Firebase Functions
- ⚠️ Requires billing account
- ✅ Google Cloud integration
- ✅ Scalable
- ✅ Built-in monitoring

### Railway / Render
Alternative free hosting options also supported.

## 🔒 Security Notes

- The CORS proxy only forwards requests to Orange APIs
- All original headers and authentication are preserved
- No sensitive data is stored in the proxy
- HTTPS enforced in production deployments

## 📝 Browser Support

- ✅ Chrome (all versions)
- ✅ Firefox (all versions)  
- ✅ Safari (all versions)
- ✅ Edge (all versions)
- ✅ Mobile browsers

**No more need for `--disable-web-security` flags!**

## 🐛 Troubleshooting

### Common Issues

1. **CORS errors still appearing**
   - Ensure your proxy is deployed and running
   - Check the URL in `OrangeAuthenticationProcessor.js`
   - Verify the proxy endpoints are accessible

2. **Firebase deployment fails**
   - Enable billing in Firebase Console
   - Check that Cloud Build API is enabled

3. **Local proxy not working**
   - Install dependencies: `npm install express http-proxy-middleware cors`
   - Check that port 3000 is available

### Debug Mode
Enable detailed logging by opening browser dev tools and checking console output.

## 📚 Documentation

- [FaceTec SDK Documentation](https://dev.facetec.com/)
- [CORS Explanation](./CORS_EXPLANATION.html)
- [Deployment Guide](./deploy-to-vercel.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- FaceTec for the excellent SDK
- Orange for the API integration
- Vercel for free hosting
- Firebase for cloud functions

---

**Need help?** Open an issue or check the troubleshooting section above.