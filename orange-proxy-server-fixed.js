/**
 * Orange API Proxy Server - Fixed Version
 * Uses Node.js built-in https module instead of node-fetch
 */

const express = require('express');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Orange API endpoints
const ORANGE_LOGIN_URL = 'https://xpapis.orange.jo/xyz/sso/v1/dev/keycloak/user/login';
const ORANGE_SESSION_TOKEN_URL = 'https://xpapis.orange.jo/xyz/dev/v1/faceTech/session-token';
const ORANGE_ENROLLMENT_3D_URL = 'https://xpapis.orange.jo/xyz/dev/v1/faceTech/enrollment-3d';
const ORANGE_MATCH_3D_2D_IDSCAN_URL = 'https://xpapis.orange.jo/xyz/dev/v1/faceTech/match-3d-2d-idscan';

// Helper function to make HTTPS requests
function makeHttpsRequest(url, options, postData) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve({ statusCode: res.statusCode, data: jsonData });
                } catch (error) {
                    resolve({ statusCode: res.statusCode, data: data });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (postData) {
            req.write(postData);
        }
        req.end();
    });
}

// Proxy endpoint for Orange login
app.post('/api/orange/login', async (req, res) => {
    try {
        console.log('Proxying Orange login request...');

        const headers = {
            'User-Agent': 'XYZ-App-Development/6.3.1 (com.jorange.xyz; build:15; iOS 18.1.0) Alamofire/5.10.1',
            'Accept-Encoding': 'br;q=1.0, gzip;q=0.9, deflate;q=0.8',
            'Accept-Language': 'ar',
            'deviceType': 'APPLE',
            'deviceName': 'Simulator iPhone XS',
            'apikey': 'AAovYox7hwgpunMvejdzod9pTJGGx7VF',
            'versionNo': '6.3.1',
            'deviceId': 'FB5ED4CE-A867-4DFD-B9D3-16052CE8C522',
            'Content-Type': 'application/json',
            'Cookie': 'TS017628b8=01fe6d5cc9bf2c83e723785835bcdc6e527c33bb7e7aeb180d3e40f7ca1b6c144c9f903bf12d7563885f58a599a488a23eade64631;TS017628b8028=018046f5fe9f7bf29e46807899434e27ce6cbc53b0045042922a2a65a9151b341257e90c988a144bde1aa834824959e1eeee635b81; JSESSIONID=E2E330BD8C1D69E55724A4D8636672FD; TS017628b8=01fe6d5cc91f5733cc7d3a35077972d0a4d3d6a31d27fa2eb607b091d73a3d6ed03f47d8ab66f1fe2fddd49b2fb55111629b86b90ad667fd1f4ad3fbfbd02b60d8a3beae5b; TS017628b8028=018046f5fed140fbf983062076e60f6a9398025745045042922a2a65a9151b341257e90c982984758be670ac486e0fba0e6b778a60'
        };

        const options = {
            method: 'POST',
            headers: headers
        };

        const response = await makeHttpsRequest(ORANGE_LOGIN_URL, options, JSON.stringify(req.body));

        console.log('Orange login response:', response.statusCode);
        res.status(response.statusCode).json(response.data);

    } catch (error) {
        console.error('Orange login proxy error:', error);
        res.status(500).json({ error: 'Proxy server error', details: error.message });
    }
});

// Proxy endpoint for Orange session token
app.get('/api/orange/session-token', async (req, res) => {
    try {
        console.log('Proxying Orange session token request...');

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Authorization header required' });
        }

        const headers = {
            'User-Agent': 'facetec|sdk|ios|com.jorange.xyz|df8r7HTSHOIejaiSyfjTg3iV0ywOyEBk|B245D870-BE20-4FD1-A36E-403495495628|iPhone12,1|9.6.71|en_JO|en|30AAD9CD-AD33-4759-B68E-E3A1E84B0388',
            'X-User-Agent': 'facetec|sdk|ios|com.jorange.xyz|df8r7HTSHOIejaiSyfjTg3iV0ywOyEBk|B245D870-BE20-4FD1-A36E-403495495628|iPhone12,1|9.6.71|en_JO|en|30AAD9CD-AD33-4759-B68E-E3A1E84B0388',
            'Authorization': authHeader,
            'Cookie': 'JSESSIONID=DD54465768139986627A39D4DD0E3ED2; TS017628b8=01fe6d5cc935e5d8e85d641c2822f471d3d8c78b6427fa2eb607b091d73a3d6ed03f47d8ab66f1fe2fddd49b2fb55111629b86b90a1c7c10d175824a72b3e1e33c5a950f2c; TS017628b8028=018046f5fed140fbf983062076e60f6a9398025745045042922a2a65a9151b341257e90c982984758be670ac486e0fba0e6b778a60'
        };

        const options = {
            method: 'GET',
            headers: headers
        };

        const response = await makeHttpsRequest(ORANGE_SESSION_TOKEN_URL, options);

        console.log('Orange session token response:', response.statusCode);
        res.status(response.statusCode).json(response.data);

    } catch (error) {
        console.error('Orange session token proxy error:', error);
        res.status(500).json({ error: 'Proxy server error', details: error.message });
    }
});

// Proxy endpoint for Orange 3D enrollment
app.post('/api/orange/enrollment-3d', async (req, res) => {
    try {
        console.log('Proxying Orange 3D enrollment request...');

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Authorization header required' });
        }

        const headers = {
            'User-Agent': 'facetec|sdk|ios|com.jorange.xyz|df8r7HTSHOIejaiSyfjTg3iV0ywOyEBk|B245D870-BE20-4FD1-A36E-403495495628|iPhone12,1|9.6.71|en_JO|en|30AAD9CD-AD33-4759-B68E-E3A1E84B0388',
            'X-User-Agent': 'facetec|sdk|ios|com.jorange.xyz|df8r7HTSHOIejaiSyfjTg3iV0ywOyEBk|B245D870-BE20-4FD1-A36E-403495495628|iPhone12,1|9.6.71|en_JO|en|30AAD9CD-AD33-4759-B68E-E3A1E84B0388',
            'Authorization': authHeader,
            'Content-Type': 'application/json',
        };

        const options = {
            method: 'POST',
            headers: headers
        };

        const response = await makeHttpsRequest(ORANGE_ENROLLMENT_3D_URL, options, JSON.stringify(req.body));

        console.log('Orange 3D enrollment response:', response.statusCode);
        res.status(response.statusCode).json(response.data);

    } catch (error) {
        console.error('Orange 3D enrollment proxy error:', error);
        res.status(500).json({ error: 'Proxy server error', details: error.message });
    }
});

// Proxy endpoint for Orange 3D-2D ID scan match
app.post('/api/orange/match-3d-2d-idscan', async (req, res) => {
    try {
        console.log('Proxying Orange 3D-2D ID scan match request...');

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Authorization header required' });
        }

        const headers = {
            'User-Agent': 'facetec|sdk|ios|com.jorange.xyz|df8r7HTSHOIejaiSyfjTg3iV0ywOyEBk|B245D870-BE20-4FD1-A36E-403495495628|iPhone12,1|9.6.71|en_JO|en|30AAD9CD-AD33-4759-B68E-E3A1E84B0388',
            'X-User-Agent': 'facetec|sdk|ios|com.jorange.xyz|df8r7HTSHOIejaiSyfjTg3iV0ywOyEBk|B245D870-BE20-4FD1-A36E-403495495628|iPhone12,1|9.6.71|en_JO|en|30AAD9CD-AD33-4759-B68E-E3A1E84B0388',
            'Authorization': authHeader,
            'Content-Type': 'application/json'
        };

        const options = {
            method: 'POST',
            headers: headers
        };

        const response = await makeHttpsRequest(ORANGE_MATCH_3D_2D_IDSCAN_URL, options, JSON.stringify(req.body));

        console.log('Orange 3D-2D ID scan match response:', response.statusCode);
        res.status(response.statusCode).json(response.data);

    } catch (error) {
        console.error('Orange 3D-2D ID scan match proxy error:', error);
        res.status(500).json({ error: 'Proxy server error', details: error.message });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Orange API Proxy Server is running' });
});

app.listen(PORT, () => {
    console.log(`Orange API Proxy Server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  POST /api/orange/login - Orange login');
    console.log('  GET /api/orange/session-token - Orange session token');
    console.log('  POST /api/orange/enrollment-3d - Orange 3D enrollment');
    console.log('  POST /api/orange/match-3d-2d-idscan - Orange 3D-2D ID scan match');
    console.log('  GET /health - Health check');
});
