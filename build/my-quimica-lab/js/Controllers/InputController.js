class InputController {
    constructor(sceneInput) {
        this._sceneInput = sceneInput;
        this._keyActions = [];
    }

    update() {
        for (let keyboardKey of this._keyActions) {
            if (Phaser.Input.Keyboard.JustDown(keyboardKey.key)) {
                let callback = keyboardKey.action.bind(keyboardKey.objectReference);
                callback(keyboardKey.actionArgument);
            }
        }
    }

    addKeyEvent(key, eventCallback, eventArg = null, objectReference = null) {
        let tempObj = {
            key: this._sceneInput.keyboard.addKey(key),
            action: eventCallback,
            actionArgument: eventArg,
            objectReference: objectReference
        }

        this._keyActions.push(tempObj);
    }
}