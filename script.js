
const display = document.getElementById("display");
let expression = "";
let finished = false;

function updateDisplay() {
    display.value = expression || "0";
}

function appendValue(value) {
    if (finished) {
        expression = "";
        finished = false;
    }

    if (expression.length >= 50) return;

    expression += value;
    updateDisplay();
}

function clearDisplay() {
    expression = "";
    finished = false;
    updateDisplay();
}

function deleteLast() {
    if (finished) {
        expression = "";
        finished = false;
    } else {
        expression = expression.slice(0, -1);
    }

    updateDisplay();
}

function calculate() {
    if (!expression) return;

    // Allow only calculator characters.
    if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
        display.value = "Invalid input";
        expression = "";
        finished = true;
        return;
    }

    try {
        // Convert the expression into a mathematical result.
        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (typeof result !== "number" || !Number.isFinite(result)) {
            throw new Error("Invalid calculation");
        }

        expression = String(
            Number(result.toPrecision(12))
        );
        updateDisplay();
        finished = true;

    } catch (error) {
        display.value = "Error";
        expression = "";
        finished = true;
    }
}
