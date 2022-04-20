let sendBtn = document.getElementById("send-btn");
let responseTextfield = document.getElementById("response-text");
let queryText = document.getElementById("query-text");
let responseEl = document.getElementById("response");
let loadingMsgEl = document.getElementById("loading-message");

sendBtn.addEventListener("click", async () => {

    let request = new Request();
    loadingMsgEl.style.display = "flex";
    let responseText = await request.sendQuery(queryText.value);
    loadingMsgEl.style.display = "none";
    responseText = responseText;
    responseText = responseText.replace(/    /g, "‎‎‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‎");
    setResponseText(responseText);
    
});

function setResponseText(response){
    responseTextfield.innerHTML = response;
    responseEl.style.display = "flex";
}

// Execute a function when the user releases a key on the keyboard
queryText.addEventListener("keyup", (e) => {
    
  if (e.keyCode === 13) {
      
    e.preventDefault();
    sendBtn.click();
  }
});