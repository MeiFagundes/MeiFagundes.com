class NomenclatureQuestionType extends QuestionType {
    constructor() {
        super();
    }

    generateQuestion(molecules) {
        const choosenMolecule = molecules[RandomUtil.getRandomIntInRange(0, molecules.length - 1)],
              alternativeMolecules = super._getAlternativeMolecules(molecules, choosenMolecule, "nomeIUPAC");

        const questionDescription = `Vou te falar uma coisa: existe uma molécula cuja fórmula molecular é
            ${choosenMolecule["formulaMolecular"]}. Incrível, não é? Mais incrível ainda é o nome IUPAC desse composto,
            que é... `,
              questionAlternatives = ArrayUtil.shuffle([choosenMolecule, ...alternativeMolecules]).map(molecule => molecule.nomeIUPAC),
              correctAnswerIndex = questionAlternatives.indexOf(choosenMolecule.nomeIUPAC);
        
        return {
            description: questionDescription,
            alternatives: questionAlternatives,
            correctAnswerIndex: correctAnswerIndex,
            imgSrcPath: ""
        }
    }
}