const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Encoding', 'Accept-Language', 'deviceType', 'deviceName', 'apikey', 'versionNo', 'deviceId']
}));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'CORS Proxy Server is running' });
});

// Proxy for Orange Login API
app.use('/api/orange/login', createProxyMiddleware({
    target: 'https://xpapis.orange.jo',
    changeOrigin: true,
    pathRewrite: {
        '^/api/orange/login': '/xyz/sso/v1/dev/keycloak/user/login'
    },
    onProxyReq: (proxyReq, req, res) => {
        // Add any custom headers if needed
        console.log('Proxying Orange login request...');
    },
    onProxyRes: (proxyRes, req, res) => {
        // Add CORS headers to response
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, Accept-Encoding, Accept-Language, deviceType, deviceName, apikey, versionNo, deviceId';
        console.log('Orange login response:', proxyRes.statusCode);
    }
}));

// Proxy for Orange Session Token API
app.use('/api/orange/session-token', createProxyMiddleware({
    target: 'https://xpapis.orange.jo',
    changeOrigin: true,
    pathRewrite: {
        '^/api/orange/session-token': '/xyz/dev/v1/faceTech/session-token'
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying Orange session token request...');
    },
    onProxyRes: (proxyRes, req, res) => {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
        console.log('Orange session token response:', proxyRes.statusCode);
    }
}));

// Proxy for Orange Enrollment API
app.use('/api/orange/enrollment-3d', createProxyMiddleware({
    target: 'https://xpapis.orange.jo',
    changeOrigin: true,
    pathRewrite: {
        '^/api/orange/enrollment-3d': '/xyz/dev/v1/faceTech/enrollment-3d'
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying Orange enrollment request...');
    },
    onProxyRes: (proxyRes, req, res) => {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
        console.log('Orange enrollment response:', proxyRes.statusCode);
    }
}));

// Proxy for Orange Match API
app.use('/api/orange/match-3d-2d-idscan', createProxyMiddleware({
    target: 'https://xpapis.orange.jo',
    changeOrigin: true,
    pathRewrite: {
        '^/api/orange/match-3d-2d-idscan': '/xyz/dev/v1/faceTech/match-3d-2d-idscan'
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying Orange match request...');
    },
    onProxyRes: (proxyRes, req, res) => {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
        console.log('Orange match response:', proxyRes.statusCode);
    }
}));

// Start server
app.listen(PORT, () => {
    console.log(`CORS Proxy Server running on port ${PORT}`);
    console.log('Available endpoints:');
    console.log('  POST /api/orange/login - Orange login');
    console.log('  GET /api/orange/session-token - Orange session token');
    console.log('  POST /api/orange/enrollment-3d - Orange enrollment');
    console.log('  POST /api/orange/match-3d-2d-idscan - Orange match');
    console.log('  GET /health - Health check');
});

module.exports = app;
