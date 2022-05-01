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

let firstNum = '',
    secondNum = '',
    result = 0,
    operator = '',
    equal = false;


function getNum() {
    numbers.forEach(number => number.addEventListener('click', function () {
        if ( operator === '') { // get first number
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
        if ( op.textContent === '='){
            equal = true;
        } else {
            operator = op.textContent;
            display.textContent = operator;
        }
        if (equal == true){
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
            display.textContent = result;
            firstNum = result;
            secondNum = '';
            equal = false;
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
    const del = document.querySelector('.del')
    del.addEventListener('click', () => {
        if(firstNum !== '' && operator === '' && secondNum === '') {
            firstNum = firstNum.slice(0,-1);
            display.textContent = firstNum;
        } else if (firstNum !== '' && operator !== '' && secondNum === ''){
            operator = '';
            display.textContent = operator;
        } else {
            secondNum.slice(0,-1);
            display.textContent = secondNum;
        }
    });
}
del();