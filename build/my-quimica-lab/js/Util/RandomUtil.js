class RandomUtil {
    static getRandomIntInRange(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}