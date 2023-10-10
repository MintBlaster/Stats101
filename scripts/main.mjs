import { IndividualSeriesCalculator } from "./classes.mjs";

let addNumberButton = document.getElementById("add-number");
let solutionDiv = document.getElementById("solution-div");
let series = document.getElementById("series");
let method = document.getElementById("methods");

let numberArray = [];
let calculated = false;

// Event Listeners
addNumberButton.addEventListener("click", () => {

    if (calculated == true) {
        numberArray = [];
        calculated = false;
    }


    if (series.value === "individual") {
        var inputFields = document.querySelectorAll(".individual-field-input");

        if (Array.from(inputFields).every(input => input.value.trim() !== "")) {
            var data = document.getElementById("individual-data").value;

            numberArray.push([data]);

            inputFields.forEach(function (input) { input.value = "" });
        }
    } else if (series.value === "discrete") {
        var inputFields = document.querySelectorAll(".discrete-field-input");

        if (Array.from(inputFields).every(input => input.value.trim() !== "")) {
            let data = document.getElementById("discrete-data").value;
            var frequency = document.getElementById("frequency").value;

            numberArray.push([data, frequency]);

            inputFields.forEach(function (input) { input.value = "" });
        }
    } else if (series.value === "continuous") {
        var inputFields = document.querySelectorAll(".continuous-field-input");

        if (Array.from(inputFields).every(input => input.value.trim() !== "")) {
            var rangeStart = document.getElementById("range-start").value;
            var rangeEnd = document.getElementById("range-end").value;
            var frequency = document.getElementById("frequency-continuous").value;

            numberArray.push([rangeStart, rangeEnd, frequency]);

            inputFields.forEach(function (input) { input.value = "" });
        }
    }

    showInputFieldsTable();
});

// Get input values based on the selected series type
series.addEventListener("change", showInputFields);
method.addEventListener("change", showInputFields);

function showInputFields() {

    console.log('change');

    // Hide all input fields
    document.getElementById("individual-fields").style.display = "none";
    document.getElementById("discrete-fields").style.display = "none";
    document.getElementById("continuous-fields").style.display = "none";
    // Hide assumed mean container
    document.getElementById("assumed-mean-container").style.display = "none";

    // Show the field which is selected.
    if (series.value === "individual") {
        document.getElementById("individual-fields").style.display = "block";
        if (method.value === "shortcut") {
            document.getElementById("assumed-mean-container").style.display = "inline";
        }
    } else if (series.value === "discrete") {
        document.getElementById("discrete-fields").style.display = "block";
    } else if (series.value === "continuous") {
        document.getElementById("continuous-fields").style.display = "block";
    }

}

function showInputFieldsTable() {

    let inputFieldsTable = document.getElementById("input-fields-table");

    // Show the input fields table.
    inputFieldsTable.style.display = "block";

    while (inputFieldsTable.firstChild) {
        inputFieldsTable.removeChild(inputFieldsTable.firstChild);
    }
    var tbody = document.createElement(tbody);
    for (let i = 0; i < numberArray.length; i++) {
        // create number of rows
        let tr = document.createElement("tr");
        for (let j = 0; j < numberArray[0].length; j++) {
            let td = document.createElement("td");
            td.innerHTML = numberArray[i][j];
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
        inputFieldsTable.appendChild(tbody);
    }
}

document.getElementById("calculate").addEventListener("click", function () {
    calculate();
});

document.getElementById("clear-button").addEventListener("click", function () {
    clearSolution();
});

function calculate() {

    // Clear existing solution.
    clearSolution();

    if (series.value == "individual") {
        const isc = new IndividualSeriesCalculator(numberArray);
        if (method.value == "direct") {
            isc.calculateDirectMethod()
        } else if (method.value == "shortcut") {
            let assumedMean = document.getElementById('assumed-mean').value;
            isc.calculateShortcutMethod(assumedMean)
        }
    }

    calculated = true;
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

    // Hide the input field table.
    document.getElementById("input-fields-table").style.display = "none";

    solutionDiv.appendChild(formula);
    solutionDiv.appendChild(solution);
    solution.appendChild(answer);

    MathJax.typeset();
}

function clearSolution() {

    let solutionDiv = document.getElementById("solution-div");
    let solutionTableBody = document.getElementById("solution-table-body");

    // Remove the content added by showSolution function
    solutionTableBody.innerHTML = "";
    solutionDiv.innerHTML = "";
}

showInputFields();