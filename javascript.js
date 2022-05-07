function add(a, b) {
    return a+b;
}

function substract(a, b) {
    return a-b;
}

function multiply(a, b) { 
    return a*b;
}

function divide(a, b) {
    return a/b;
}

function percent(a, b) {
    return a/100 * b;
}

function operate(operator, a, b) {
    return operator(a, b);
}



const display = document.querySelector('.display')
const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const decimal = document.querySelector('.decimal')


let firstNum = '',
    secondNum = '',
    result = 0,
    operator = '',
    rm = '';


function getNum() {
    numbers.forEach(number => number.addEventListener('click', function () {
        if ( operator === '') {
            firstNum += number.textContent;
            display.textContent = firstNum;
        } else {
            secondNum += number.textContent;
            display.textContent = secondNum;
        }
    }));
}
getNum();


function calculator() {
    operators.forEach(op => op.addEventListener('click', function() {
        if (operator === '') {
            operator = op.textContent;
            display.textContent = operator;
        }
        if ( secondNum !== '') {
            switch(operator) {
                case '+':
                    result = add(+firstNum, +secondNum);
                    break;
                case '-':
                    result = substract(+firstNum, +secondNum);
                    break;
                case '/':
                    result = divide(+firstNum, +secondNum);
                    break;
                case '*':
                    result = multiply(+firstNum, +secondNum);
                    break;
                case '%':
                    result = percent(+firstNum, +secondNum);
                    break;
                
                default:
                    break;
            }
            firstNum = result;
            display.textContent = firstNum;
            operator = op.textContent;
            secondNum = '';  
            //display.textContent = operator; for secind screen
        }
            if (operator === '=') {
                operator = '';            
            } 

    }))
}
calculator();

function reset(){
    const clear = document.querySelector('.clear')
    clear.addEventListener('click', () => {
        firstNum = '';
        secondNum = '';
        operator = '';
        result = '';
        equal = false;
        display.textContent = '';
    });
}
reset();

function del(){
    const toDel = document.querySelector('.del')
    toDel.addEventListener('click', () => {
        if ( firstNum !== '' && secondNum === '' && operator === '') {
            firstNum = firstNum
                            .toString()
                            .slice(0, -1);
            display.textContent = firstNum;
        } else if ( firstNum !== '' && secondNum === '' && operator !== ''){
            operator = operator.slice(0, -1);
            display.textContent = operator;
        } else {
            secondNum = secondNum.slice(0, -1);
            display.textContent = secondNum;
        }
    });
}
del();

let firstNumDecimal = false,
    secondNumDecimal = false;

function addDecimals() {
    decimal.addEventListener('click', () =>{
        if ( firstNumDecimal == false){
            if ( display.textContent === firstNum) {
                firstNum += '.';
                display.textContent = firstNum;
                decimalPressed = true;
            }
        }
        if (secondNumDecimal == false){
            if (display.textContent === secondNum) {
                secondNum += '.';
                display.textContent = secondNum;
                secondNumDecimal = false;
            }
            
        }

    })
}
addDecimals();