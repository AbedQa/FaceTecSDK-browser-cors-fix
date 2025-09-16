/**
 * Orange-integrated Liveness Check Processor
 * Uses Orange API authentication before performing FaceTec liveness check
 */

function OrangeLivenessCheckProcessor(sessionToken, faceMapEncryptionKey, sampleApp) {
    this.sessionToken = sessionToken;
    this.faceMapEncryptionKey = faceMapEncryptionKey;
    this.sampleApp = sampleApp;
    this.success = false;
}

OrangeLivenessCheckProcessor.prototype.process = function () {
    var self = this;

    // Create FaceTec session with Orange session token
    var session = FaceTecSDK.createSession(
        [FaceTecSDK.FaceTecSessionStatus.SessionCompletedSuccessfully],
        function () {
            self.success = true;
            console.log("Orange Liveness Check completed successfully");
            self.sampleApp.onComplete(
                FaceTecSDK.getSessionResult(),
                null,
                FaceTecSDK.getNetworkResponseStatus()
            );
        },
        function () {
            self.success = false;
            console.error("Orange Liveness Check failed");
            self.sampleApp.onComplete(
                FaceTecSDK.getSessionResult(),
                null,
                FaceTecSDK.getNetworkResponseStatus()
            );
        }
    );

    // Start the liveness check with Orange session token
    session.startLivenessCheck(
        this.sessionToken,
        this.faceMapEncryptionKey
    );
};

OrangeLivenessCheckProcessor.prototype.isSuccess = function () {
    return this.success;
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OrangeLivenessCheckProcessor;
}
