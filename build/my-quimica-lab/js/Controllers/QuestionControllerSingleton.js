let instance = null;

let a = "a";

class QuestionControllerSingleton{
    constructor(repoBranch = 'master', resourceController){

        if (!instance) {
            instance = new QuestionController(repoBranch, resourceController);
        }
        
        //return instance;
    }

    getInstance(){
        return instance;
    }

    set instance(newInstance){
        instance = newInstance
    }
}