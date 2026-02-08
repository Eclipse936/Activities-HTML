// ❌ Removed: const { useOptimistic } = require("react");

// Get History
function getHistory() {
    return document.getElementById("history-value").innerText;
}

// Print History (FIXED)
function printHistory(num) {
    document.getElementById("history-value").innerText = num;
}

// Get Output
function getOutput() {
    return document.getElementById("output-value").innerText;
}

// Print Output
function printOutput(num) {
    if (num == "") {
        document.getElementById("output-value").innerText = num;
    } else {
        document.getElementById("output-value").innerText = getFormattedNumber(num);
    }
}

// Format Number with Commas
function getFormattedNumber(num) {
    if (num == "-") {
        return "";
    }
    var n = Number(num);
    return n.toLocaleString("en");
}

// Remove Commas
function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ''));
}


// Operator Buttons
var operator = document.getElementsByClassName("operator");

for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function () {

        if (this.id == "clear") {
            printHistory("");
            printOutput("");
        }

        else if (this.id == "backspace") {
            var output = reverseNumberFormat(getOutput()).toString();
            if (output) {
                output = output.substring(0, output.length - 1);
                printOutput(output);
            }
        }

        else {
            var output = getOutput();
            var history = getHistory();

            if (output != "" || history != "") {

                // FIXED index issue
                if (isNaN(history[history.length - 1])) {
                    history = history.substring(0, history.length - 1);
                }

                output = output == "" ? output : reverseNumberFormat(output);
                history = history + output;

                if (this.id == "=") {
                    var result = eval(history);
                    printOutput(result);
                    printHistory("");
                } else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}


// Number Buttons
var number = document.getElementsByClassName("number");

for (var i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function () {

        var output = reverseNumberFormat(getOutput());

        // FIXED NaN check
        if (!isNaN(output)) {
            output = output + this.id;
            printOutput(output);
        }
    });
}