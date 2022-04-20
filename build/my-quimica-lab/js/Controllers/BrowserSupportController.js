class BrowserSupportController {
    constructor(deviceInfo) {
        this.deviceInfo = deviceInfo;
        this.gameResources = {
            'audio': ['webAudio', 'ogg'],
            'features': ['canvas', 'localStorage']
        }
    }

    checkCompatibility() {
        let supportCheck = {
            support: true,
            notSupportedFeatures: []
        }

        for (let feature of Object.keys(this.gameResources)) {
            for (let technology of this.gameResources[feature]) {
                if (!this.deviceInfo[feature][technology]) {
                    supportCheck.support = false;
                    supportCheck.notSupportedFeatures.push(technology);
                }
            }
        }

        return supportCheck;
    }
}