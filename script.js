let addNumberButton = document.getElementById("add-number");
let inputTable = document.getElementById("input-table");
let solutionDiv = document.getElementById("solution-div");
let series = document.getElementById("series");
let method = document.getElementById("methods");

let numberArray = [];

// Event Listeners
addNumberButton.addEventListener("click", () => {
    let numberToBeAdded = document.getElementById("first-number");
    let newNumber = parseInt(numberToBeAdded.value);

    numberArray.push(newNumber);
    numberToBeAdded.value = "";

    fillTable(newNumber);
});

series.addEventListener("change", checkForChange);
method.addEventListener("change", checkForChange);

function checkForChange() {
    // Check if series is individual and method is shortcut.
    // if yes then let user enter assumed mean. In other methods we calculate assumed-mean inside code.

    if (series.value == "individual" && method.value == "shortcut") {
        document.getElementById("assumed-mean").style.display = "block";
    } else {
        document.getElementById("assumed-mean").style.display = "none";
    }

    // Check which series and methods users has selected and perform specific action.
    if (series.value == "individual") {
        // code ..
    } else if (series.value == "discrete") {
        // code ..
    } else if (series.value == "continuous") {
        // code ..
    }
}

function fillTable(newNumber) {
    let newRow = document.createElement("tr");
    let newData = document.createElement("td");
    newData.innerHTML = newNumber;
    newRow.appendChild(newData);
    inputTable.appendChild(newRow);
}

function calculate() {
    if (series.value == "individual") {
        if (method.value == "direct") {
            direct();
        } else if (method.value == "shortcut") {
            shortCut();
        }
    }
}

function direct() {
    sumOfAllNumbers = 0;
    let total = numberArray.length;
    for (i = 0; i < total; i++) {
        sumOfAllNumbers += numberArray[i];
    }
    mean = sumOfAllNumbers / total;

    let formulaText = " \\( \\overline{x} = \\frac {\\sum x} {n} \\) ";
    let solutionText = " \\( \\overline{x} = \\frac { " + sumOfAllNumbers + " } {  " + total + " } \\) ";
    let answerText = " \\(\\overline{x}  = " + mean + " \\)";

    let solutionTableArray = [];

    for (i = 0; i < total; i++) {
        solutionTableArray.push([i, numberArray[i]]);
    }
    console.log(solutionTableArray);
    console.log(solutionTableArray.length);
    console.log(solutionTableArray[0].length);
    showSolution(formulaText, solutionText, answerText, solutionTableArray);
}

function shortCut() {
    assumedMean = parseFloat(document.getElementById("assumed-mean").value);

    let deviationArray = [];
    let total = numberArray.length;
    sumOfDeviations = 0;

    for (i = 0; i < total; i++) {
        deviationArray[i] = numberArray[i] - assumedMean;
        sumOfDeviations += deviationArray[i];
    }

    mean = assumedMean + sumOfDeviations / total;

    let formulaText = " \\( \\overline{x} = A + \\frac {\\sum d} {n} \\) ";
    let solutionText = " \\( \\overline{x} = " + assumedMean + " +  \\frac { " + sumOfDeviations + " } {  " + total + " } \\) ";
    let answerText = " \\(\\overline{x}  = " + mean + " \\)";

    let solutionTableArray = [];

    for (i = 0; i < total; i++) {
        solutionTableArray.push([i, numberArray[i], deviationArray[i]]);
    }
    console.log(solutionTableArray)
    showSolution(formulaText, solutionText, answerText, solutionTableArray);
}

function showSolution(
    formulaText,
    solutionText,
    answerText,
    solutionTableArray
) {
    let solutionTableBody = document.getElementById("solution-table-body");

    for (i = 0; i < solutionTableArray.length; i++) {
        // create number of rows
        let tr = document.createElement("tr");
        for (j = 0; j < solutionTableArray[0].length; j++) {
            let td = document.createElement("td");
            td.innerHTML = solutionTableArray[i][j];
            tr.appendChild(td);
        }
        solutionTableBody.appendChild(tr);
    }

    let formula = document.createElement("p");
    let solution = document.createElement("div");
    let answer = document.createElement("p");

    formula.innerHTML = formulaText;
    solution.innerHTML = solutionText;
    answer.innerHTML = answerText;

    inputTable.remove();

    solutionDiv.appendChild(formula);
    solutionDiv.appendChild(solution);
    solution.appendChild(answer);

    MathJax.typeset();
}
