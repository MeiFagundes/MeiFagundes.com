// --- Data --- //

let localModeEnabled = false;

// --- Functions --- //

function addProjectToList(project){
    console.log(project);
    
}

function getJSON(src, callback) {

    src = window.location.pathname + src;
    $.getJSON(src, callback);
}

// --- Code --- //

if (window.location.pathname == "/") {
    localModeEnabled = true;
    console.log("Local mode enabled!");
}
else
    console.log(window.location.pathname);

getJSON("JSON/projects.json", addProjectToList);
