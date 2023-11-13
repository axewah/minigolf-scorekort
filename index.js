let court = null;

getCourt();
async function getCourt(){


    let response = await fetch("info.json");
    court = await response.json();


} 

const players = {};

loadStartPage();



function loadStartPage(){
    let main = document.createElement("div");
    main.className = "main";
    document.body.appendChild(main);
    let divInput = document.createElement("div");
    divInput.id = "divInput";
    let divNames = document.createElement("div");
    divNames.id = "divNames";
    let divStart = document.createElement("div");
    divStart.id = "divStart";
    main.appendChild(divInput);
    main.appendChild(divNames);
    main.appendChild(divStart);
    let form = document.createElement("form");
    divInput.appendChild(form);
    let inputN = document.createElement("input");
    inputN.placeholder = "Name";
    inputN.id = "Name";
    form.appendChild(inputN);
    let buttonSave = document.createElement("button");
    form.appendChild(buttonSave);
    buttonSave.innerText = "Save";
    buttonSave.addEventListener("click", addPlayer);
    let buttonStart = document.createElement("button");
    divStart.appendChild(buttonStart);
    buttonStart.innerText = "Start";
    buttonStart.addEventListener("click", startGame);
}

function addPlayer(e){
    if(document.getElementById("Name").value != ""){
        let name = document.getElementById("Name");
        players[name.value] = {};
        players[name.value]["score"] = 0;


        let h4 = document.createElement("h4");
        h4.innerText = name.value;
        h4.className = name.value;

        let button = document.createElement("button");
        button.innerText = "remove";
        button.className = name.value;
        button.addEventListener("click", removePlayer)

        let div = document.createElement("div");
        div.className = "names";
        div.classList.add(name.value);
        div.appendChild(h4);
        div.appendChild(button);
        
        document.getElementById("divNames").appendChild(div);
        name.value = "";
    }
       
    e.preventDefault();
}

function removePlayer(e){
    delete players[e.target.className];
    while(document.querySelector("."+e.target.className)) document.querySelector("."+e.target.className).remove();

    e.preventDefault();
}

function startGame(){
    if(document.querySelector(".holes")){
        while(document.querySelector(".holes")){
            document.querySelector(".holes").remove();
        }
    }
    
    for(key in court.court){
        createHole(key);
    }
    let button = document.createElement("button");
    document.querySelector(".main").appendChild(button);
    button.addEventListener("click", createResult);
    button.innerText = "Results";
    button.className = "holes";
}

function createHole(c){
    let div = document.createElement("div");
    div.className = "holes";
    div.id = "hole"+(court.court[c].id);
    document.querySelector(".main").appendChild(div);
    let h2 = document.createElement("h2");
    h2.innerText = ("Hole " + court.court[c].id);
    div.appendChild(h2);
    let h4 = document.createElement("h4");
    h4.innerText = ("Par " + court.court[c].par);
    div.appendChild(h4);
    let i = document.createElement("i");
    i.innerText = court.court[c].info;
    div.appendChild(i);
    for(key in players){
        let input = document.createElement("input");
        input.placeholder = key;
        input.type = "number";
        input.name = key;
        input.classList.add(key);
        input.dataset.id = court.court[c].id;
        input.addEventListener("input", scoreInput)
        div.appendChild(input);
    }
}

function scoreInput(e){
    if(e.target.value != "" && e.target.value < 1) e.target.value = 1;
    if(e.target.value < 1){
        e.target.value = "";
        if(players[e.target.name][e.target.dataset.id]){
            players[e.target.name]["score"] -= players[e.target.name][e.target.dataset.id];
            players[e.target.name][e.target.dataset.id] = "";
        }
    } 
    else{
        if(players[e.target.name][e.target.dataset.id]){
            players[e.target.name]["score"] -= players[e.target.name][e.target.dataset.id];
        }
        players[e.target.name][e.target.dataset.id] = parseInt(e.target.value);
        players[e.target.name]["score"] += players[e.target.name][e.target.dataset.id];
    }   
}

function emptyPage(){
    document.querySelector(".main").classList.toggle("hidden");
}

function createResult(){

    emptyPage();
    let divRes = document.createElement("div");
    divRes.className = "result";
    document.body.appendChild(divRes);
    let h1 = document.createElement("h1");
    h1.innerText = "Results";
    divRes.appendChild(h1);
    let button = document.createElement("button");
    button.innerText = "Return";
    button.addEventListener("click", returnMain);
    divRes.appendChild(button);

    let keys = Object.keys(players);
    keys.sort((a,b)=>players[a]["score"]-players[b]["score"]);
    keys.forEach((p)=>{
        
    


        let div = document.createElement("div");
        divRes.appendChild(div);

        let text = document.createElement("p");
        div.appendChild(text);
        text.innerText = p + " " + (players[p]["score"]);
    });
}

function returnMain(){
    emptyPage();
    while(document.querySelector(".result")){
        document.querySelector(".result").remove();
    }
}