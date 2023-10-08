let numberToBeAdded = document.getElementById("new-number");
let addNumberButton = document.getElementById("add-number");
let table = document.getElementById("table");
let solutionDiv = document.getElementById("solution-div");
let series = document.getElementById("series");
let method = document.getElementById("methods"); 

let numberArray = [];


addNumberButton.addEventListener('click', () => {

    let newNumber = parseInt(numberToBeAdded.value);
    
    numberArray.push(newNumber);
    numberToBeAdded.value = "";

    showTable(newNumber);
})

series.addEventListener('change', checkForChange);
method.addEventListener('change', checkForChange);

function checkForChange(){
    if (series.value == "individual"){
        // code ..
    }
    else if (series.value == "discrete"){
        // code ..
    }
    else if (series.value == "continuous"){
        // code ..
    }
}

if (series.value == "individual" && method.value == "shortcut"){
    document.getElementById("assumed-mean").style.display = "block";
}
else {
    document.getElementById("assumed-mean").style.display = "none";
}


function fillTable(newNumber) {

    let newRow = document.createElement("tr");
    let newData = document.createElement("td");
    newData.innerHTML = newNumber;
    newRow.appendChild(newData);
    table.appendChild(newRow);
}

function calculate(){
    if (series.value = "individual"){
        if (method.value = "direct"){
            direct();
        }
        else if (methods.value = "shortcut"){
            // code for shortcut method go here ....
        }
    }
}

function direct(){
    sumOfAllNumbers = 0;
    let total = numberArray.length;
    for (i = 0; i < total; i++){
        sumOfAllNumbers += numberArray[i];
    }
    mean = sumOfAllNumbers / total;

    showSolution(total);
}

function shortCut(){
    sumOfAllNumbers = 0;

    let total = numberArray.length;
    for (i = 0; i < total; i++){
        sumOfAllNumbers += numberArray[i];
    }
    mean = sumOfAllNumbers / total;

    showSolution(total);
}

function showSolution(total) {
    let formula = document.createElement("p");
    let solution = document.createElement("p");
    let answer = document.createElement("p");

    formula.innerHTML = " \\( \\overline{x} = \\frac {\\sum x} {n} \\) ";
    solution.innerHTML = " \\( \\overline{x} = \\frac { " + sumOfAllNumbers + " } {  " + total + " } \\) ";
    answer.innerHTML = " \\(\\overline{x}  = " + mean + " \\)";

    solutionDiv.appendChild(formula);
    solutionDiv.appendChild(solution);
    solution.appendChild(answer);

    MathJax.typeset();
}
