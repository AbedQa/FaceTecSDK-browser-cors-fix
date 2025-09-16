/**
 * Orange API Authentication Processor
 * Handles the two-step authentication process:
 * 1. Login to get access token
 * 2. Use access token to get FaceTec session token
 */

function OrangeAuthenticationProcessor() {
    // Firebase Functions URLs for CORS proxy (deployed to Firebase)
    this.firebaseFunctionsURL = "https://us-central1-orange-jood.cloudfunctions.net";
    this.orangeLoginURL = this.firebaseFunctionsURL + "/orangeLogin";
    this.orangeSessionTokenURL = this.firebaseFunctionsURL + "/orangeSessionToken";
    this.accessToken = null;
    this.sessionToken = null;
}

OrangeAuthenticationProcessor.prototype.login = function (callback) {
    var self = this;

    // Prepare login payload (encrypted data from your curl example)
    var loginPayload = {
        "payload": "siGKZdMwBaYctTWV4tMaa8FttOwluLQB22BICxOA3MLtk4Yc5SsF1C3IKprSOEzZzZcdWVbhxobIY4Wxmp7bSaz0wsA8EB7gTpnK4JD3yeQ="
    };

    // Orange API headers from your curl command
    var headers = {
        "Accept-Encoding": "br;q=1.0, gzip;q=0.9, deflate;q=0.8",
        "Accept-Language": "ar",
        "deviceType": "APPLE",
        "deviceName": "Simulator iPhone XS",
        "apikey": "AAovYox7hwgpunMvejdzod9pTJGGx7VF",
        "versionNo": "6.3.1",
        "deviceId": "FB5ED4CE-A867-4DFD-B9D3-16052CE8C522",
        "Content-Type": "application/json"
    };

    console.log("Attempting Orange login via Firebase Functions:", this.orangeLoginURL);

    fetch(this.orangeLoginURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(loginPayload),
        mode: "cors"
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("HTTP " + response.status + ": " + response.statusText);
            }
            return response.json();
        })
        .then(function (data) {
            if (data.statusCode === 200 && data.data && data.data.accessToken) {
                self.accessToken = data.data.accessToken;
                console.log("Orange login successful. Access token received.");
                callback(true, data.data);
            } else {
                console.error("Orange login failed:", data);
                callback(false, data);
            }
        })
        .catch(function (error) {
            console.error("Orange login error:", error);
            callback(false, { error: error.message });
        });
};

OrangeAuthenticationProcessor.prototype.getSessionToken = function (callback) {
    var self = this;

    if (!this.accessToken) {
        console.error("No access token available. Please login first.");
        callback(false, { error: "No access token available" });
        return;
    }

    // Orange API headers for session token request
    var headers = {
        "Authorization": "Bearer " + this.accessToken
    };

    console.log("Getting Orange session token via Firebase Functions:", this.orangeSessionTokenURL);

    fetch(this.orangeSessionTokenURL, {
        method: "GET",
        headers: headers,
        mode: "cors"
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("HTTP " + response.status + ": " + response.statusText);
            }
            return response.json();
        })
        .then(function (data) {
            if (data.success && data.sessionToken) {
                self.sessionToken = data.sessionToken;
                console.log("Orange session token received:", data.sessionToken);
                callback(true, data);
            } else {
                console.error("Orange session token request failed:", data);
                callback(false, data);
            }
        })
        .catch(function (error) {
            console.error("Orange session token error:", error);
            callback(false, { error: error.message });
        });
};

OrangeAuthenticationProcessor.prototype.authenticate = function (callback) {
    var self = this;

    console.log("Starting Orange authentication process...");

    // Step 1: Login to get access token
    this.login(function (loginSuccess, loginData) {
        if (loginSuccess) {
            console.log("Login successful, getting session token...");

            // Step 2: Get session token using access token
            self.getSessionToken(function (sessionSuccess, sessionData) {
                if (sessionSuccess) {
                    console.log("Orange authentication completed successfully");
                    callback(true, {
                        accessToken: self.accessToken,
                        sessionToken: self.sessionToken,
                        userData: loginData.userAccount,
                        sessionData: sessionData
                    });
                } else {
                    console.error("Failed to get session token:", sessionData);
                    callback(false, { error: "Failed to get session token", details: sessionData });
                }
            });
        } else {
            console.error("Login failed:", loginData);
            callback(false, { error: "Login failed", details: loginData });
        }
    });
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OrangeAuthenticationProcessor;
}
