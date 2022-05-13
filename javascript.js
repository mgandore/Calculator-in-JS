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

//////////////////////////////////////////////////////////////////////////////////

const display = document.querySelector('.display')
const secondDisplay = document.querySelector('.second-display')
const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const decimal = document.querySelector('.decimal')


let firstNum = '',
    secondNum = '',
    result = '',
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
            display.textContent = '';
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
            if (operator === '/' && secondNum === '0'){
                alert ('WARNING!! You can\'t divide by 0');
                secondNum = '';
            } else {
                firstNum = result.toFixed(3);
                operator = op.textContent;  
                secondNum = '';
            }
        }
        if (operator === '=') {
            operator = '';
            display.textContent = `${firstNum}`;
            if ( result !== '') {
                secondDisplay.textContent = '=';
            }             
        } else {
            display.textContent = '';
            secondDisplay.textContent = `${firstNum}${operator}`;
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
        display.textContent = '';
        secondDisplay.textContent = '';
        firstNumDecimal = false,
        secondNumDecimal = false;
    });
}
reset();


function del(){
    const toDel = document.querySelector('.del')
    toDel.addEventListener('click', () => {
        if ( firstNum !== '' && secondNum === '' && operator === '') {
            ///// test if last ch is '.';
            if (firstNum.slice(-1) === '.') {
                firstNumDecimal = false;
            }
            firstNum = firstNum
                            .toString()
                            .slice(0, -1);
            display.textContent = firstNum;
            if ( secondDisplay.textContent !== '=') {
                secondDisplay.textContent = secondDisplay.textContent.slice(0, -1);
        }
 
        } else if ( firstNum !== '' && secondNum === '' && operator !== ''){
            operator = operator.slice(0, -1);
            display.textContent = operator;
            secondDisplay.textContent = secondDisplay.textContent.slice(0, -1);
        } else {
            if (secondNum.slice(-1) === '.') {
                secondNumDecimal = false;
            }
            secondNum = secondNum
                            .toString()
                            .slice(0, -1);
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
                firstNumDecimal = true;
            }
        }
        if (secondNumDecimal == false){
            if (display.textContent === secondNum) {
                secondNum += '.';
                display.textContent = secondNum;
                secondNumDecimal = true;
            }
            
        }

    });
}
addDecimals();

