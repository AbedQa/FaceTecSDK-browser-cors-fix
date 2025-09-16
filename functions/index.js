const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const https = require("https");

setGlobalOptions({ maxInstances: 10 });

// Orange API URLs
const ORANGE_LOGIN_URL = "https://xpapis.orange.jo/xyz/sso/v1/dev/keycloak/user/login";
const ORANGE_SESSION_TOKEN_URL = "https://xpapis.orange.jo/xyz/dev/v1/faceTech/session-token";
const ORANGE_ENROLLMENT_3D_URL = "https://xpapis.orange.jo/xyz/dev/v1/faceTech/enrollment-3d";
const ORANGE_MATCH_3D_2D_IDSCAN_URL = "https://xpapis.orange.jo/xyz/dev/v1/faceTech/match-3d-2d-idscan";

// Helper function to make HTTPS requests
function makeHttpsRequest(url, options, postData = null) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: data,
                });
            });
        });

        req.on("error", (error) => {
            reject(error);
        });

        if (postData) {
            req.write(postData);
        }
        req.end();
    });
}

// Orange Login endpoint
exports.orangeLogin = onRequest({ cors: true }, async (req, res) => {
    logger.info("Proxying Orange login request...");

    try {
        const options = {
            method: "POST",
            headers: {
                "User-Agent": "XYZ-App-Development/6.3.1 (com.jorange.xyz; build:15; iOS 18.1.0) Alamofire/5.10.1",
                "Accept-Encoding": "br;q=1.0, gzip;q=0.9, deflate;q=0.8",
                "Accept-Language": "ar",
                "deviceType": "APPLE",
                "deviceName": "Simulator iPhone XS",
                "apikey": "AAovYox7hwgpunMvejdzod9pTJGGx7VF",
                "versionNo": "6.3.1",
                "deviceId": "FB5ED4CE-A867-4DFD-B9D3-16052CE8C522",
                "Content-Type": "application/json",
                "Cookie": "TS017628b8=01fe6d5cc9bf2c83e723785835bcdc6e527c33bb7e7aeb180d3e40f7ca1b6c144c9f903bf12d7563885f58a599a488a23eade64631;TS017628b8028=018046f5fe9f7bf29e46807899434e27ce6cbc53b0045042922a2a65a9151b341257e90c988a144bde1aa834824959e1eeee635b81; JSESSIONID=840BF67B920279096B4A7C5BF5915F8A; TS017628b8=01fe6d5cc9599050cc7d6309189c58432727a1d4ddec3b4bf4847fe452a64c3be670303405dd533a909bcbf8b3b211b6d4fc58d8a00c5bc5a0789f114635074c16918d54c3; TS017628b8028=018046f5fed140fbf983062076e60f6a9398025745045042922a2a65a9151b341257e90c982984758be670ac486e0fba0e6b778a60",
            },
        };

        const postData = JSON.stringify(req.body);
        const response = await makeHttpsRequest(ORANGE_LOGIN_URL, options, postData);

        logger.info(`Orange login response: ${response.statusCode}`);
        res.status(response.statusCode).json(JSON.parse(response.body));
    } catch (error) {
        logger.error("Orange login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Orange Session Token endpoint
exports.orangeSessionToken = onRequest({ cors: true }, async (req, res) => {
    logger.info("Proxying Orange session token request...");

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).json({ error: "Authorization header required" });
        }

        const options = {
            method: "GET",
            headers: {
                "User-Agent": "facetec|sdk|ios|com.jorange.xyz|df8r7HTSHOIejaiSyfjTg3iV0ywOyEBk|B245D870-BE20-4FD1-A36E-403495495628|iPhone12,1|9.6.71|en_JO|en|30AAD9CD-AD33-4759-B68E-E3A1E84B0388",
                "X-User-Agent": "facetec|sdk|ios|com.jorange.xyz|df8r7HTSHOIejaiSyfjTg3iV0ywOyEBk|B245D870-BE20-4FD1-A36E-403495495628|iPhone12,1|9.6.71|en_JO|en|30AAD9CD-AD33-4759-B68E-E3A1E84B0388",
                "Authorization": authHeader,
                "Cookie": "JSESSIONID=840BF67B920279096B4A7C5BF5915F8A; TS017628b8=01fe6d5cc9599050cc7d6309189c58432727a1d4ddec3b4bf4847fe452a64c3be670303405dd533a909bcbf8b3b211b6d4fc58d8a00c5bc5a0789f114635074c16918d54c3; TS017628b8028=018046f5fed140fbf983062076e60f6a9398025745045042922a2a65a9151b341257e90c982984758be670ac486e0fba0e6b778a60",
            },
        };

        const response = await makeHttpsRequest(ORANGE_SESSION_TOKEN_URL, options);

        logger.info(`Orange session token response: ${response.statusCode}`);
        res.status(response.statusCode).json(JSON.parse(response.body));
    } catch (error) {
        logger.error("Orange session token error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Orange 3D Enrollment endpoint
exports.orangeEnrollment3d = onRequest({ cors: true }, async (req, res) => {
    logger.info("Proxying Orange 3D enrollment request...");

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).json({ error: "Authorization header required" });
        }

        const options = {
            method: "POST",
            headers: {
                "User-Agent": "facetec|sdk|ios|com.jorange.xyz|df8r7HTSHOIejaiSyfjTg3iV0ywOyEBk|B245D870-BE20-4FD1-A36E-403495495628|iPhone12,1|9.6.71|en_JO|en|30AAD9CD-AD33-4759-B68E-E3A1E84B0388",
                "X-User-Agent": "facetec|sdk|ios|com.jorange.xyz|df8r7HTSHOIejaiSyfjTg3iV0ywOyEBk|B245D870-BE20-4FD1-A36E-403495495628|iPhone12,1|9.6.71|en_JO|en|30AAD9CD-AD33-4759-B68E-E3A1E84B0388",
                "Authorization": authHeader,
                "Content-Type": "application/json",
                "Cookie": "JSESSIONID=840BF67B920279096B4A7C5BF5915F8A; TS017628b8=01fe6d5cc9599050cc7d6309189c58432727a1d4ddec3b4bf4847fe452a64c3be670303405dd533a909bcbf8b3b211b6d4fc58d8a00c5bc5a0789f114635074c16918d54c3; TS017628b8028=018046f5fed140fbf983062076e60f6a9398025745045042922a2a65a9151b341257e90c982984758be670ac486e0fba0e6b778a60",
            },
        };

        const postData = JSON.stringify(req.body);
        const response = await makeHttpsRequest(ORANGE_ENROLLMENT_3D_URL, options, postData);

        logger.info(`Orange 3D enrollment response: ${response.statusCode}`);
        res.status(response.statusCode).json(JSON.parse(response.body));
    } catch (error) {
        logger.error("Orange 3D enrollment error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Orange 3D-2D ID Scan Match endpoint
exports.orangeMatch3d2dIdscan = onRequest({ cors: true }, async (req, res) => {
    logger.info("Proxying Orange 3D-2D ID scan match request...");

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).json({ error: "Authorization header required" });
        }

        const options = {
            method: "POST",
            headers: {
                "User-Agent": "facetec|sdk|ios|com.jorange.xyz|df8r7HTSHOIejaiSyfjTg3iV0ywOyEBk|B245D870-BE20-4FD1-A36E-403495495628|iPhone12,1|9.6.71|en_JO|en|30AAD9CD-AD33-4759-B68E-E3A1E84B0388",
                "X-User-Agent": "facetec|sdk|ios|com.jorange.xyz|df8r7HTSHOIejaiSyfjTg3iV0ywOyEBk|B245D870-BE20-4FD1-A36E-403495495628|iPhone12,1|9.6.71|en_JO|en|30AAD9CD-AD33-4759-B68E-E3A1E84B0388",
                "Authorization": authHeader,
                "Content-Type": "application/json",
                "Cookie": "JSESSIONID=840BF67B920279096B4A7C5BF5915F8A; TS017628b8=01fe6d5cc9599050cc7d6309189c58432727a1d4ddec3b4bf4847fe452a64c3be670303405dd533a909bcbf8b3b211b6d4fc58d8a00c5bc5a0789f114635074c16918d54c3; TS017628b8028=018046f5fed140fbf983062076e60f6a9398025745045042922a2a65a9151b341257e90c982984758be670ac486e0fba0e6b778a60",
            },
        };

        const postData = JSON.stringify(req.body);
        const response = await makeHttpsRequest(ORANGE_MATCH_3D_2D_IDSCAN_URL, options, postData);

        logger.info(`Orange 3D-2D ID scan match response: ${response.statusCode}`);
        res.status(response.statusCode).json(JSON.parse(response.body));
    } catch (error) {
        logger.error("Orange 3D-2D ID scan match error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
