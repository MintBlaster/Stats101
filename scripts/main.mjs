import { IndividualSeriesCalculator, DiscreteSeriesCalculator, ContinuousSeriesCalculator } from "./classes.mjs";

let addNumberButton = document.getElementById("add-number");
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

            numberArray.push([Number(data)]);

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
    // Clear the number array on the series or method change
    numberArray = [];

    // Show the methods according to the series selected 
    if (series.value === "individual" || series.value === "discrete") {
        method.querySelector("option[value='step-deviation']").style.display = "none";
    }
    else {
        method.querySelector("option[value='step-deviation']").style.display = "block";
    }

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

    for (let i = 0; i < numberArray[0].length; i++) {
        // create number of rows
        let tr = document.createElement("tr");

        if (series.value === "continuous") {
            for (let j = 0; j < numberArray.length; j++) {
                if (i === 0) {
                    let tdRange = document.createElement("td");
                    tdRange.innerHTML = ` ${numberArray[j][0]} -  ${numberArray[j][1]}`;
                    tr.appendChild(tdRange);
                }
                else if (i === 2) {
                    let tdFreq = document.createElement("td");
                    tdFreq.innerHTML = ` ${numberArray[j][2]} `;
                    tr.appendChild(tdFreq);
                }
            }

        }
        else {
            for (let j = 0; j < numberArray.length; j++) {
                let td = document.createElement("td");
                td.innerHTML = ` ${numberArray[j][i]} `;
                tr.appendChild(td);
            }
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
    clearSolution();

    if (series.value == "individual") {
        const isc = new IndividualSeriesCalculator(numberArray);
        if (method.value == "direct") {
            isc.calculateDirectMethod();
        } else if (method.value == "shortcut") {
            let assumedMean = document.getElementById('assumed-mean').value;
            isc.calculateShortcutMethod(assumedMean)
        }
    }

    else if (series.value == "discrete") {
        const dsc = new DiscreteSeriesCalculator(numberArray);
        if (method.value == "direct") {
            dsc.calculateDirectMethod();
        } else if (method.value == "shortcut") {
            dsc.calculateShortcutMethod();
        }
    }

    else if (series.value == "continuous") {
        const csc = new ContinuousSeriesCalculator(numberArray);
        if (method.value == "direct") {
            csc.calculateDirectMethod();
        }
        else if (method.value == "shortcut") {
            csc.calculateShortcutMethod();
        } else if (method.value == "step-deviation") {
            csc.calculateStepDeviationMethod();
        }

        calculated = true;
        document.getElementById('solution-container').scrollIntoView({ behavior: "smooth" });
    }
}


function clearSolution() {
    numberArray = [];

    let solutionDiv = document.getElementById("solution-div");
    let solutionTableHeader = document.getElementById('solution-table-header');
    let solutionTableFooter = document.getElementById('solution-table-footer');
    let solutionTableBody = document.getElementById("solution-table-body");

    // Remove the content added by showSolution function
    solutionTableBody.innerHTML = "";
    solutionTableHeader.innerHTML = "";
    solutionTableFooter.innerHTML = "";
    solutionDiv.innerHTML = "";
}

showInputFields();