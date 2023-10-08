
let addNumberButton = document.getElementById("add-number");
let table = document.getElementById("table");
let solutionDiv = document.getElementById("solution-div");
let series = document.getElementById("series");
let method = document.getElementById("methods"); 

let numberArray = [];

// Event Listeners
addNumberButton.addEventListener('click', () => {



    let numberToBeAdded = document.getElementById("first-number");
    let newNumber = parseInt(numberToBeAdded.value);
    
    numberArray.push(newNumber);
    numberToBeAdded.value = "";

    fillTable(newNumber);
})

series.addEventListener('change', checkForChange);
method.addEventListener('change', checkForChange);

function checkForChange(){
    // Check if series is individual and method is shortcut.
    // if yes then let user enter assumed mean. In other methods we calculate assumed-mean inside code.

    if (series.value == "individual" && method.value == "shortcut"){
        document.getElementById("assumed-mean").style.display = "block";
    }
    else {
        document.getElementById("assumed-mean").style.display = "none";
    }

    // Check which series and methods users has selected and perform specific action.
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


function fillTable(newNumber) {

    let newRow = document.createElement("tr");
    let newData = document.createElement("td");
    newData.innerHTML = newNumber;
    newRow.appendChild(newData);
    table.appendChild(newRow);
}

function calculate(){
    if (series.value == "individual"){
        if (method.value == "direct"){
            direct();
        }
        else if (method.value == "shortcut"){
            shortCut();
        }
    }
}

function direct(){
    console.log("direct");
    sumOfAllNumbers = 0;
    let total = numberArray.length;
    for (i = 0; i < total; i++){
        sumOfAllNumbers += numberArray[i];
    }
    mean = sumOfAllNumbers / total;

    let formulaText = " \\( \\overline{x} = \\frac {\\sum x} {n} \\) ";
    let solutionText = " \\( \\overline{x} = \\frac { " + sumOfAllNumbers + " } {  " + total + " } \\) ";
    let answerText = " \\(\\overline{x}  = " + mean + " \\)";

    showSolution(formulaText, solutionText, answerText);
}

function shortCut(){

    console.log("shortcut");
    assumedMean = parseFloat(document.getElementById("assumed-mean").value);

    let deviationArray = [];
    let total = numberArray.length;
    sumOfDeviations = 0;

    for (i = 0; i < total; i++){
        deviationArray[i] = numberArray[i] - assumedMean;
        sumOfDeviations += deviationArray[i];
    }

    console.log(deviationArray);
    mean = assumedMean +  ( sumOfDeviations / total );

    let formulaText = " \\( \\overline{x} = A + \\frac {\\sum d} {n} \\) ";
    let solutionText = " \\( \\overline{x} = " + assumedMean + " +  \\frac { " + sumOfDeviations + " } {  " + total + " } \\) ";
    let answerText = " \\(\\overline{x}  = " + mean + " \\)";

    showSolution(formulaText, solutionText, answerText);
}

function showSolution(formulaText, solutionText, answerText) {
    let formula = document.createElement("p");
    let solution = document.createElement("div");
    let answer = document.createElement("p");

    formula.innerHTML = formulaText;
    solution.innerHTML = solutionText;
    answer.innerHTML = answerText;

    solutionDiv.appendChild(formula);
    solutionDiv.appendChild(solution);
    solution.appendChild(answer);

    MathJax.typeset();
}


