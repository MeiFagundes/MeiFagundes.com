class JSONProxy{

    constructor() {}
    
    async getJSON(source){
        
        if (source === undefined)
            throw new Error("JSON source is undefined!");

        let resp = await fetch(source)
        .catch(err => {
            
        });

        if (resp === undefined)
            return undefined;

        let json = await resp.json();

        return json;
    }
}