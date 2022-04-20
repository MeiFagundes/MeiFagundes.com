class CharacterUtil {
    static getNext (character) {
        return String.fromCharCode(character.charCodeAt(0) + 1);
    }
}