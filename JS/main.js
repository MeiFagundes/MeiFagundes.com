// --- DOM --- //

const projectList = document.querySelector(".project-list");

// --- DATA --- //

const IMG_SOURCE = "Assets/Images/";
const JSON_SOURCE = "JSON/";
const ACCENT_COLOR = "pink accent-2";
const usingLocalHost = false;

// --- FUNCTIONS --- //

function getJSON(src, callback) {
    
    if (!usingLocalHost)
        src = "https://meifagundes.github.io/" + src;
    
    $.getJSON(src, callback);
}

function addProjectToList(project){


    let articleEl = document.createElement("article");
    articleEl.classList = "z-depth-2 hoverable";

    let spanEl = document.createElement("span");

    let h3El = document.createElement("h3");
    h3El.innerHTML = project.title;
    spanEl.appendChild(h3El);

    let pEl = document.createElement("p");
    pEl.innerHTML = project.desc;
    spanEl.appendChild(pEl);

    let spanChildEl = document.createElement("span");
    spanChildEl.classList = "row-container";

    let aEl = document.createElement("a");
    aEl.href = project.location;
    aEl.innerHTML = project.locationType;
    aEl.classList = "btn waves-effect " + ACCENT_COLOR;
    let iEl = document.createElement("i");
    iEl.classList = "material-icons right";
    iEl.innerHTML = project.locationIcon;
    aEl.appendChild(iEl);
    spanChildEl.appendChild(aEl);

    aEl = document.createElement("a");
    aEl.href = project.source;
    aEl.innerHTML = "Código Fonte";
    aEl.classList = "btn waves-effect " + ACCENT_COLOR;
    iEl = document.createElement("i");
    iEl.classList = "material-icons right";
    iEl.innerHTML = project.sourceIcon;
    aEl.appendChild(iEl);
    spanChildEl.appendChild(aEl);

    spanEl.appendChild(spanChildEl);
    articleEl.appendChild(spanEl);

    let imgEl = document.createElement("img");
    imgEl.src = IMG_SOURCE + project.img;
    imgEl.classList = "materialboxed";
    articleEl.appendChild(imgEl);

    projectList.appendChild(articleEl);
}

function updateProjectList() {

    getJSON(JSON_SOURCE + "projects.json", 
        (json) =>{
            projectList.innerHTML = "";
            for (const project of json)
                addProjectToList(project);
        }
    );
}

// --- INIT --- //
$(() => {

    updateProjectList();

    M.AutoInit();
    $(".parallax").parallax();
    setTimeout(() => {
        $(".materialboxed").materialbox();
    }, 1500);
    
  }); 