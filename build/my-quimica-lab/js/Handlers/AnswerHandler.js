class AnswerHandler{

    constructor(resourceController){
        this._resourceController = resourceController;
        this._answerState = false;
        this._resourceAmountPerAnswer = 10;
        this._resourceMultiplier = 1;
    }

    handleAnswer(attemptAnswerIndex, correctAnswerIndex) {
        if(attemptAnswerIndex === correctAnswerIndex) {
            this._handleCorrect('glassware');
            this._answerState = true;
        } else {
            this._answerState = false;
            this._handleIncorrect();
        }
    }

    _handleCorrect(resource){
        // soundFXController.play('correct-answer');
        this._resourceMultiplier += 0.25;
        this._resourceController.increment(resource, this._resourceAmountPerAnswer * this._resourceMultiplier);
    }

    _handleIncorrect(resource){
        // soundFXController.play('wrong-answer');
        this._resourceMultiplier = 1;
    }

    isAnswerCorrect() {
        return this._answerState;
    }

    get resourceMultiplier(){
        return this._resourceMultiplier;
    }

    resetMultiplier() {
        this._resourceMultiplier = 1;
    }

}   