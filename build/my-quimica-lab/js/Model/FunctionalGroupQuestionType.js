class FunctionalGroupQuestionType extends QuestionType {
    constructor() {
        super();
    };

    generateQuestion(molecules) {
        const choosenMolecule = molecules[RandomUtil.getRandomIntInRange(0, molecules.length - 1)],
              alternativeMolecules = super._getAlternativeMolecules(molecules, choosenMolecule, "grupoFuncional");

        const questionDescription = `O ${choosenMolecule["nomeIUPAC"]} ${choosenMolecule["aplicacaoPratica"]}, não é incrível?! A função orgânica
              desse composto é: `,
              questionAlternatives = ArrayUtil.shuffle([choosenMolecule, ...alternativeMolecules]).map(molecule => molecule.grupoFuncional),
              correctAnswerIndex = questionAlternatives.indexOf(choosenMolecule.grupoFuncional);
        
        return {
            description: questionDescription,
            alternatives: questionAlternatives,
            correctAnswerIndex: correctAnswerIndex,
            imgSrcPath: ""
        }
    }
}