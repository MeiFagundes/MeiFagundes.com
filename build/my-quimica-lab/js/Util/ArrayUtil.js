class ArrayUtil {
    static shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = RandomUtil.getRandomIntInRange(0, array.length - 1);
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }
}