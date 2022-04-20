class ResourceCenter {
    constructor(resourceName) {
        this.resourceAmount = 0;
        this.resourceName = resourceName;
    }

    incrementResourceAmount(valueToIncrement) {
        this.resourceAmount += valueToIncrement;
    }
    
    decreaseResourceAmount(valueToDecrease) {
        let newAmount = this.getResourceAmount() - valueToDecrease;

        this.resourceAmount = newAmount >= 0 ? newAmount : 0;
    }

    getResourceAmount() {
        return this.resourceAmount;
    }

    getResourceID() {
        return this.resourceName;
    }
}