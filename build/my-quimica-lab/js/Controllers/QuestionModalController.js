class QuestionModalController {
    constructor(answerHandler) {
        this._questionModalEl = document.querySelector("#questionScreen");
        this._questionTitleEl = document.querySelector("#questionScreen > h3");
        this._questionDescriptionEl = document.querySelector("#questionScreen > p");
        this._questionImageEl = document.querySelector("#questionScreen > img");
        this._alternativeListEl = document.querySelector("#questionScreen > ul");
        this._closeModalBtnEl = document.getElementById('closeQuestionScreenBtn');
        this._nextQuestionSpanEl = document.querySelector("#questionScreen > span");
        this._hasAnswered = false;
        this._answerHandler = answerHandler;
        this._questionNumber = 1;
        this._answeredQuestions = [];
        this._currentQuestion = {};

        this._delegateCloseEvents();
    }

    showQuestionModal() {
       this._questionModalEl.style.display = 'inline';
    }

    closeQuestionModal() {
        this._questionModalEl.style.display = 'none';
    }

    displayQuestion(question) {
        const finalQuestionNumber = this._questionNumber < 10 ? "0" + this._questionNumber : this._questionNumber,
              resourceMultiplier = this._answerHandler.resourceMultiplier;

        this._currentQuestion = question;
        this._questionTitleEl.innerHTML = `Questão ${finalQuestionNumber} (${resourceMultiplier}x)`;
        this._questionDescriptionEl.innerHTML = question.description;
        this._questionImageEl.src = question.imgSrcPath ? question.imgSrcPath : "";
        this._populateAlternativesList(question.alternatives, question.correctAnswerIndex);

        this._questionNumber++;
        this._hasAnswered = false;
        this._nextQuestionSpanEl.innerHTML = "Aperte 'E' para pular a questão";
    }

    _populateAlternativesList(alternatives, correctAnswerIndex) {
        this._alternativeListEl.innerHTML = '';
        let currentAlternativeCharacter = "A";
        
        alternatives.map((questionAlternative, alternativeIndex) => {
            const alternativeEl = document.createElement('li');

            alternativeEl.innerHTML = `${currentAlternativeCharacter}) ${questionAlternative}`;

            alternativeEl.addEventListener('click', () => {
                this._handleAnswerAttempt(alternativeIndex, correctAnswerIndex);
            })

            this._alternativeListEl.appendChild(alternativeEl);
            currentAlternativeCharacter = CharacterUtil.getNext(currentAlternativeCharacter);
        })
    }

    _highlightAnswers(attemptIndex, correctAnswerIndex) {
        const correctListItem = this._alternativeListEl.children[correctAnswerIndex];

        if(attemptIndex !== correctAnswerIndex) {
            const attemptListItem = this._alternativeListEl.children[attemptIndex];

            attemptListItem.style.backgroundColor = '#A81826';
        }

        correctListItem.style.backgroundColor = '#0DA400';
    }

    _delegateCloseEvents() {
        this._closeModalBtnEl.addEventListener('click', () => {
            this._handleQuit();
        })

        document.addEventListener('keydown', (evt) => {
            if(evt.key === 'Escape') {
                this._handleQuit();
            }         
        })
    }

    _handleAnswerAttempt(attemptIndex, correctAnswerIndex) {
        if(!this._hasAnswered) {
            this._answerHandler.handleAnswer(attemptIndex, correctAnswerIndex);
            this._highlightAnswers(attemptIndex, correctAnswerIndex);
            this._hasAnswered = true;
            this._nextQuestionSpanEl.innerHTML = "Aperte 'E' para ir para a próxima questão";

            //TODO: Move this code to a dedicated class
            this._answeredQuestions.push({
                questionDescription: this._currentQuestion.description,
                alternatives: this._currentQuestion.alternatives,
                wasAnswerCorrect: this._answerHandler.isAnswerCorrect()
            })

            localStorage.setItem('userAnswers', JSON.stringify(this._answeredQuestions));
        }
    }

    _handleQuit() {
        this.closeQuestionModal();
        this._questionNumber = 1;
        this._answerHandler.resetMultiplier();
    }

}