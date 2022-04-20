class QuestionType {
    constructor() {}

    generateQuestion(molecules) {
        throw new Error("Error! This method can't be invoked by the base class 'Question Type'.");
    }

    _getAlternativeMolecules(molecules, mainMolecule, filterField) {
        let filteredMolecules = molecules.filter((molecule) => molecule[filterField] != mainMolecule[filterField]);
        const alternativeMolecules = [];

        while(alternativeMolecules.length != 3){
           const randomMoleculeIndex = RandomUtil.getRandomIntInRange(0, filteredMolecules.length - 1),
                  randomMolecule = filteredMolecules[randomMoleculeIndex];

            alternativeMolecules.push(randomMolecule);
            filteredMolecules = filteredMolecules.filter(molecule => molecule[filterField] != randomMolecule[filterField]);
        }

        return alternativeMolecules;
    }
}