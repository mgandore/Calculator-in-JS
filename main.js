import { DECIMAL, EMPTY, Operator } from "./constants.js";
import { CalculatorApp, Calculator, ProgrammingCalculator, ScientificCalculator } from "./calculator.js";

function main() {
    const type = document.querySelector(".type")
    const display = document.querySelector('.display')
    const secondDisplay = document.querySelector('.second-display')
    const numbers = document.querySelectorAll('.number')
    const operators = document.querySelectorAll('.operator')
    const decimal = document.querySelector('.decimal')
    const clear = document.querySelector('.clear')
    const del = document.querySelector('.del')

    const app = new CalculatorApp();
    let calculator = app.createCalculator(type.innerHTML);

    operators.forEach(op => op.addEventListener('click', () => {
        handleOperatorClick(calculator, op, display, secondDisplay)
    }));
    numbers.forEach(number => number.addEventListener('click', () => {
        handleNumberClick(calculator, number, display)
    }));
    decimal.addEventListener('click', () => handleDecimalClick(display, calculator));
    del.addEventListener('click', () => handleDeleteClick());
    clear.addEventListener('click', () => handleResetClick());
    type.addEventListener("click", () => {
        let typeValue = type.innerHTML;
        if (typeValue === "basic") {
            typeValue = "scientific"
            type.innerHTML = typeValue
            calculator = app.createCalculator(typeValue)
        } else if (typeValue === "scientific") {
            typeValue = "programming"
            type.innerHTML = typeValue
            calculator = app.createCalculator(typeValue)
        } else {
            typeValue = "basic"
            type.innerHTML = typeValue
            calculator = app.createCalculator(typeValue)
        }

    })
}

main()


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~      Event handlers      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

/**
 * 
 * @param {Calculator} calculator 
 * @param {Element} display 
 * @param {Element} number 
*/
function handleNumberClick(calculator, number, display) {
    if (!!!calculator.operator) {
        calculator.a += number.textContent;
        display.textContent = calculator.a;
    } else {
        calculator.b += number.textContent;
        display.textContent = calculator.b;
    }
}

/**
 * 
 * @param {Calculator | ProgrammingCalculator | ScientificCalculator} calculator 
 * @param {Element} op 
 * @param {Element} display 
 * @param {Element} secondDisplay 
*/
function handleOperatorClick(calculator, op, display, secondDisplay) {
    if (!!!calculator.operator) {
        calculator.operator = op.textContent;
        display.textContent = EMPTY;
    }
    if (calculator.b) {
        calculator.a = Number(calculator.a);
        calculator.b = Number(calculator.b);
        switch (calculator.operator) {
            case Operator.ADD:
                calculator.add();
                break;
            case Operator.SUBTRACT:
                calculator.subtract();
                break;
            case Operator.DIVIDE:
                calculator.divide();
                break;
            case Operator.MULTIPLY:
                calculator.multiply();
                break;
            case Operator.PERCENT:
                calculator.percent();
                break;
            case Operator.SHIFT_LEFT:
                calculator.shiftLeft();
                break;
            case Operator.SIN:
                calculator.sin();
                break;
            default:
                break;
        }
        if (calculator.operator === Operator.DIVIDE && calculator.b === '0') {
            alert('WARNING!! You can\'t divide by 0');
        } else {
            calculator.operator = op.textContent;
        }
        calculator.b = EMPTY;
    }
    if (calculator.operator === Operator.EQUAL) {
        display.textContent = `${calculator.a}`;
        if (calculator.a) {
            secondDisplay.textContent = calculator.operator;
        }
        calculator.operator = null;
    } else {
        display.textContent = EMPTY;
        secondDisplay.textContent = `${calculator.a}${calculator.operator}`;
    }
    calculator.a = String(calculator.a);
    calculator.b = String(calculator.b);
}

function handleDecimalClick(display, calculator) {
    if (!!!calculator.a.incudes(DECIMAL)) {
        if (calculator.a && display.textContent === calculator.a) {
            calculator.a += DECIMAL;
            display.textContent = calculator.a;
        }
    }
    if (!!!calculator.v.incudes(DECIMAL)) {
        if (calculator.b && display.textContent === calculator.b) {
            calculator.b += DECIMAL;
            display.textContent = calculator.b;
        }

    }
}

function handleResetClick(display, secondDisplay, calculator) {
    display.textContent = EMPTY;
    secondDisplay.textContent = EMPTY;
    calculator.operator = null;
    calculator.a = EMPTY;
    calculator.b = EMPTY;
}

function handleDeleteClick(display, secondDisplay, calculator) {
    if (calculator.a && !!!calculator.b && !!!calculator.operator) {
        calculator.a = calculator.a
            .toString()
            .slice(0, -1);
        display.textContent = calculator.a;
        if (secondDisplay.textContent !== Operator.EQUAL) {
            secondDisplay.textContent = secondDisplay.textContent.slice(0, -1);
        }
    } else if (calculator.a && !!!calculator.b && calculator.operator) {
        calculator.operator = calculator.operator.slice(0, -1);
        display.textContent = calculator.operator;
        secondDisplay.textContent = secondDisplay.textContent.slice(0, -1);
    } else {
        calculator.b = calculator.b
            .toString()
            .slice(0, -1);
        display.textContent = calculator.b;
    };
}