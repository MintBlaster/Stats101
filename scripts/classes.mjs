// Parent Class
class SeriesCalculator {
    constructor(data) {
        this.data = data;
        this.result = null;
        this.solutionTableArray = [];
    }

    static showSolution(formulaText, solutionText, answerText, solutionTableArray) {
        let solutionTableBody = document.getElementById("solution-table-body");

        // Clear any existing rows in the table
        while (solutionTableBody.firstChild) {
            solutionTableBody.removeChild(solutionTableBody.firstChild);
        }

        for (let i = 0; i < solutionTableArray.length; i++) {
            // Create a new row
            let tr = document.createElement("tr");

            // Loop through the columns
            for (let j = 0; j < Object.keys(solutionTableArray[i]).length; j++) {
                let td = document.createElement("td");
                let columnName = Object.keys(solutionTableArray[i])[j];
                td.innerHTML = solutionTableArray[i][columnName];
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

        let solutionDiv = document.getElementById("solution-div");
        solutionDiv.appendChild(formula);
        solutionDiv.appendChild(solution);
        solution.appendChild(answer);

        MathJax.typeset();
    }
}

// Individual series class
export class IndividualSeriesCalculator extends SeriesCalculator {
    constructor(data) {
        super(data);
    }

    calculateDirectMethod() {
        const total = this.data.length;
        const sumOfAllNumbers = this.data.reduce((acc, value) => acc + Number(value), 0);
        this.result = sumOfAllNumbers / total;

        const formulaText = `\\( \\overline{x} = \\frac {\\sum x} {n} \\)`;
        const solutionText = `\\( \\overline{x} = \\frac {\\ ` + sumOfAllNumbers + `  } { ` + total + ` } \\)`;
        const answerText = `\\(\\overline{x} = ${this.result} \\)`;

        const solutionTableArray = this.data.map((x, index) => [index, x]);

        SeriesCalculator.showSolution(formulaText, solutionText, answerText, solutionTableArray);
    }

    calculateShortcutMethod(assumedMean) {
        const total = this.data.length;
        const deviations = this.data.map((value) => Number(value) - Number(assumedMean));
        const sumOfDeviations = deviations.reduce((acc, deviation) => acc + deviation, 0);
        this.result = assumedMean + sumOfDeviations / total;

        const formulaText = `\\( \\overline{x} = A + \\frac {\\sum d} {n} \\)`;
        const solutionText = `\\( \\overline{x} = ${assumedMean} +  \\frac {${sumOfDeviations}} {${total}} \\)`;
        const answerText = `\\(\\overline{x} = ${this.result} \\)`;

        const solutionTableArray = this.data.map((x, index) => [index, x, deviations[index]]);

        SeriesCalculator.showSolution(formulaText, solutionText, answerText, solutionTableArray);
    }
}


// Discrete series class
class DiscreteSeriesCalculator extends SeriesCalculator {
    constructor(data) {
        super(data);
    }

    calculateDirectMethod() {
        // To be implemented...
    }

    calculateShortcutMethod() {
        // To be implemented...
    }

    calculate() {
        // To be implemented...
    }
}

// Continuous series class
class ContinuousSeriesCalculator extends SeriesCalculator {
    constructor(data) {
        super(data);
    }

    calculateDirectMethod() {
        // To be implemented...
    }

    calculateShortcutMethod() {
        // To be implemented...
    }
    calculateStepDeviationMethod() {
        // To be implemented...
    }

    calculate() {
        // To be implemented...
    }
}
