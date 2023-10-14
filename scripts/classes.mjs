// Parent Class
class SeriesCalculator {
    constructor(data) {
        this.data = data;
        this.result = null;
        this.solutionTableArray = [];
    }

    static showSolution(formulaText, solutionText, answerText, headerText, footerText, solutionTableArray) {
        let solutionTableHeader = document.getElementById('solution-table-header');
        let solutionTableFooter = document.getElementById('solution-table-footer');
        let solutionTableBody = document.getElementById("solution-table-body");

        // Clear any existing rows in the table
        while (solutionTableBody.firstChild) {
            solutionTableBody.removeChild(solutionTableBody.firstChild);
        }
        solutionTableHeader.innerHTML = "";

        // Display Header
        solutionTableHeader.innerHTML = headerText;
        solutionTableFooter.innerHTML = footerText;

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

        const headerText = `<tr><th>Sr No.</th><th> x </th></tr>`;
        const footerText = `<tr><th>Total : </th><th> ${sumOfAllNumbers} </th></tr>`
        const formulaText = `\\( \\overline{x} = \\frac {\\sum x} {n} \\)`;
        const solutionText = `\\( \\overline{x} = \\frac {\\ ${sumOfAllNumbers}  } { ${total} } \\)`;
        const answerText = `\\(\\overline{x} = ${this.result} \\)`;

        const solutionTableArray = this.data.map((x, index) => [index + 1, x]);

        SeriesCalculator.showSolution(formulaText, solutionText, answerText, headerText, footerText, solutionTableArray);
    }

    calculateShortcutMethod(assumedMean) {

        const total = this.data.length;
        const deviations = this.data.map((value) => value - assumedMean);
        const sumOfDeviations = deviations.reduce((acc, deviation) => acc + deviation, 0);

        this.result = Number(assumedMean) + sumOfDeviations / total;

        const headerText = `<tr><th>Sr No.</th><th> x </th><th> d = x - a </th></tr>`;
        const footerText = `<tr><th>Total</th><th></th><th> ${sumOfDeviations}</th></tr>`;
        const formulaText = `\\( \\overline{x} = A + \\frac {\\sum d} {n} \\)`;
        const solutionText = `\\( \\overline{x} = ${assumedMean} +  \\frac {${sumOfDeviations}} {${total}} \\)`;
        const answerText = `\\(\\overline{x} = ${this.result} \\)`;

        const solutionTableArray = this.data.map((x, index) => [index + 1, x, deviations[index]]);

        SeriesCalculator.showSolution(formulaText, solutionText, answerText, headerText, footerText, solutionTableArray);
    }
}


// Discrete series class
export class DiscreteSeriesCalculator extends SeriesCalculator {
    constructor(data) {
        super(data);
    }

    calculateDirectMethod() {
        const total = this.data.length;
        let sumOfAllNumbersIntoFrequencies = 0;
        let sumOfFrequencies = 0;

        for (let i = 0; i < total; i++) {
            sumOfAllNumbersIntoFrequencies += this.data[i][0] * this.data[i][1];
            sumOfFrequencies += Number(this.data[i][1]);
        }

        this.result = sumOfAllNumbersIntoFrequencies / sumOfFrequencies;

        const headerText = `<tr><th>Sr No.</th><th> x </th><th> f </th><th>fx</th></tr>`;
        const footerText = `<tr><th>Total</th><th></th><th> ${sumOfFrequencies}</th><th>${sumOfAllNumbersIntoFrequencies}</th></tr>`;
        const formulaText = `\\( \\overline{x} = \\frac {\\sum fx} {N} \\)`;
        const solutionText = `\\( \\overline{x} = \\frac {${sumOfAllNumbersIntoFrequencies}} {${sumOfFrequencies}} \\)`;
        const answerText = `\\(\\overline{x} = ${this.result} \\)`;

        const solutionTableArray = this.data.map((x, index) => [index + 1, x[0], x[1], x[0] * x[1]]);

        SeriesCalculator.showSolution(formulaText, solutionText, answerText, headerText, footerText, solutionTableArray);
    }

    calculateShortcutMethod() {
        const total = this.data.length;
        const assumedMean = this.data[Math.floor(total / 2)][0];
        const deviations = this.data.map((value) => value[0] - assumedMean);

        let sumOfFrequencyIntoDeviations = 0;
        let sumOfFrequencies = 0;


        for (let i = 0; i < total; i++) {
            sumOfFrequencyIntoDeviations += deviations[i] * this.data[i][1];
            sumOfFrequencies += Number(this.data[i][1]);
        }
        this.result = Number(assumedMean) + sumOfFrequencyIntoDeviations / sumOfFrequencies;

        const headerText = `<tr><th>Sr No.</th><th> x </th><th> f </th><th> d </th><th> fd </th></tr>`;
        const footerText = `<tr><th>Total</th><th></th><th>${sumOfFrequencies}</th><th></th><th>${sumOfFrequencyIntoDeviations}</th></tr>`;
        const formulaText = `\\( \\overline{x} = A + \\frac {\\sum fd} {N} \\)`;
        const solutionText = `\\( \\overline{x} = ${assumedMean} +  \\frac {${sumOfFrequencyIntoDeviations}} {${sumOfFrequencies}} \\)`;
        const answerText = `\\(\\overline{x} = ${this.result} \\)`;

        const solutionTableArray = this.data.map((x, index) => [index + 1, x[0], x[1], deviations[index], deviations[index] * x[1]]);

        SeriesCalculator.showSolution(formulaText, solutionText, answerText, headerText, footerText, solutionTableArray);
    }
}

// Continuous series class
export class ContinuousSeriesCalculator extends SeriesCalculator {
    constructor(data) {
        super(data);
    }

    calculateDirectMethod() {
        const total = this.data.length;
        const midpoints = this.data.map((value) => (Number(value[0]) + Number(value[1])) / 2);

        let sumOfFrequencyIntoMidpoints = 0;
        let sumOfFrequencies = 0;

        for (let i = 0; i < total; i++) {
            sumOfFrequencyIntoMidpoints += this.data[i][2] * midpoints[i];
            sumOfFrequencies += Number(this.data[i][2])
        }

        this.result = sumOfFrequencyIntoMidpoints / sumOfFrequencies;

        const headerText = `<tr><th>Sr No.</th><th> Range </th><th> f </th><th> x </th><th> fx </th></tr>`;
        const footerText = `<tr><th>Total</th><th> Range </th><th> ${sumOfFrequencies} </th><th></th><th> ${sumOfFrequencyIntoMidpoints} </th></tr>`;
        const formulaText = `\\( \\overline{x} = \\frac {\\sum fx} {N} \\)`;
        const solutionText = `\\( \\overline{x} = \\frac {${sumOfFrequencyIntoMidpoints}} {${sumOfFrequencies}} \\)`;
        const answerText = `\\(\\overline{x} = ${this.result} \\)`;

        const solutionTableArray = this.data.map((x, index) => [index + 1, `${String(x[0])} - ${String(x[1])}`, x[2], midpoints[index], midpoints[index] * x[2]]);

        SeriesCalculator.showSolution(formulaText, solutionText, answerText, headerText, footerText, solutionTableArray);

    }

    calculateShortcutMethod() {
        const total = this.data.length;
        const midpoints = this.data.map((value) => (Number(value[0]) + Number(value[1])) / 2);
        const assumedMean = midpoints[Math.floor(total / 2)];
        const deviations = midpoints.map((value) => Number(value) - Number(assumedMean));

        let sumOfFrequenciesIntoMidpoints = 0;
        let sumOfFrequencies = 0;

        for (let i = 0; i < total; i++) {
            sumOfFrequenciesIntoMidpoints += deviations[i] * this.data[i][2];
            sumOfFrequencies += Number(this.data[i][2])
        }

        this.result = Number(assumedMean) + (sumOfFrequenciesIntoMidpoints / sumOfFrequencies);

        const headerText = `<tr><th>Sr No.</th><th> Range </th><th> f </th><th> x </th><th> d = x - a </th><th> fd </th></tr>`;
        const footerText = `<tr><th>Total</th><th> </th><th> ${sumOfFrequencies} </th><th>  </th><th> </th><th> ${sumOfFrequenciesIntoMidpoints} </th></tr>`;
        const formulaText = `\\( \\overline{x} = A + \\frac {\\sum f d} {N} \\)`;
        const solutionText = `\\( \\overline{x} = ${assumedMean}  +  \\frac {${sumOfFrequenciesIntoMidpoints}} {${sumOfFrequencies}} \\)`;
        const answerText = `\\(\\overline{x} = ${this.result} \\)`;

        const solutionTableArray = this.data.map((x, index) => [index + 1, `${String(x[0])} - ${String(x[1])}`, x[2], midpoints[index], deviations[index], deviations[index] * x[2]]);

        SeriesCalculator.showSolution(formulaText, solutionText, answerText, headerText, footerText, solutionTableArray);

    }
    calculateStepDeviationMethod() {
        const total = this.data.length;
        const midpoints = this.data.map((value) => (Number(value[0]) + Number(value[1])) / 2);
        const assumedMean = midpoints[Math.floor(total / 2)];
        const deviations = midpoints.map((value) => Number(value) - Number(assumedMean));
        const difference = this.data[1][0] - this.data[0][0];
        const stepDeviations = deviations.map((value) => Number(value) / difference);

        let sumOfStepDeviationsIntoFrequency = 0;
        let sumOfFrequencies = 0;

        for (let i = 0; i < total; i++) {
            sumOfStepDeviationsIntoFrequency += stepDeviations[i] * this.data[i][2];
            sumOfFrequencies += Number(this.data[i][2])
        }

        this.result = Number(assumedMean) + (sumOfStepDeviationsIntoFrequency / sumOfFrequencies);

        const headerText = `<tr><th>Sr No.</th><th> Range </th><th> f </th><th> x </th><th> d = x - a </th><th> d' = x / i </th><th> fd'</th> </tr>`;
        const footerText = `<tr><th>Total</th><th> </th><th> ${sumOfFrequencies} </th><th> </th><th>  </th><th>  </th><th> ${sumOfStepDeviationsIntoFrequency} </th> </tr>`;
        const formulaText = `\\( \\overline{x} = A + \\frac {\\sum f d'} {N} \\)`;
        const solutionText = `\\( \\overline{x} = ${assumedMean} + \\frac {${sumOfStepDeviationsIntoFrequency}} {${sumOfFrequencies}} \\)`;
        const answerText = `\\(\\overline{x} = ${this.result} \\)`;

        const solutionTableArray = this.data.map((x, index) => [index + 1, `${String(x[0])} - ${String(x[1])}`, x[2], midpoints[index], deviations[index], stepDeviations[index], stepDeviations[index] * x[2]]);

        SeriesCalculator.showSolution(formulaText, solutionText, answerText, headerText, footerText, solutionTableArray);

    }
}