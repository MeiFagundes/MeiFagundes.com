class QuestionController {
  constructor(sourcePath, resourceController) {
    this._sourcePath = sourcePath;
    let answerHandler = new AnswerHandler(resourceController);
    this._modalController = new QuestionModalController(answerHandler);
  }

  presentNewQuestion() {
    if (this._moleculeArrayCache == !undefined)
      this._generateQuestion(moleculeArray);
    else {
      let moleculesPromise = this._getMolecules();
      moleculesPromise.then((moleculeArray) => {
        this._moleculeArrayCache = moleculeArray;
        this._generateQuestion(moleculeArray);
      });
    }
  }

  _generateQuestion(moleculeArray) {
    let question = this._chooseQuestionType();

    this._modalController.displayQuestion(
      question.generateQuestion(moleculeArray)
    );
    this._modalController.showQuestionModal();
  }

  async _getMolecules() {
    let jproxy = new JSONProxy();

    return await jproxy.getJSON(
      `${this._sourcePath}/assets/molecule-database.json`
    );
  }

  _chooseQuestionType() {
    let min = 0,
      max = 2;

    switch (Math.floor(Math.random() * (max - min + 1)) + min) {
      case 0:
        return new FunctionalGroupQuestionType();
      case 1:
        return new HybridizationQuestionType();
      case 2:
        return new NomenclatureQuestionType();

      default:
        return new NomenclatureQuestionType();
    }
  }
}
