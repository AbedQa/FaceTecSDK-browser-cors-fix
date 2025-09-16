# 🔥 Enable Firebase Functions (CORS Proxy)

## Step 1: Enable Billing on Firebase

1. **Go to Firebase Console**: https://console.firebase.google.com/project/orange-jood/overview
2. **Click "Upgrade"** or go to **"Usage and billing"**
3. **Add a billing account** (you can use the free tier)
4. **Firebase Functions have generous free quotas**:
   - 2 million invocations/month FREE
   - 400,000 GB-seconds/month FREE
   - 200,000 CPU-seconds/month FREE

## Step 2: Deploy Functions

After enabling billing, run:
```bash
firebase deploy --only functions
```

## Step 3: Update Your Code

Your Firebase Functions will be available at:
```
https://us-central1-orange-jood.cloudfunctions.net/orangeLogin
https://us-central1-orange-jood.cloudfunctions.net/orangeSessionToken
```

I'll update your code automatically once billing is enabled.

## Why Enable Billing?

- **Firebase Functions are essentially free** for your usage
- **More reliable** than free hosting services
- **Better performance** and uptime
- **Google Cloud infrastructure**
- **Easy to scale** if needed

## Alternative: Keep Using Vercel

If you prefer Vercel, just disable the authentication protection:
1. Vercel Dashboard → Your Project → Settings
2. Deployment Protection → Turn OFF "Vercel Authentication"
3. Save → Works immediately

Your choice! Both solutions will fix the CORS issue.
