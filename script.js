const displayButtons = document.querySelectorAll('.displayBtn');
const equalsButton = document.querySelector('.equalsBtn');
const clearButton = document.querySelector('#clear');
const eraseButton = document.querySelector('#erase');
const screenText = document.querySelector('#screenText');

const operators = ['+', '-', '*', '/'];
let calculationValues = [];
let numberValues = [];
let currentValue = '';
let activeOperator = false;

// Event Listeners
displayButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentValue.length >= 9) {
            return;
        }
        calculationValues.push(button.id);
        storeValue(button.id)
        btnFeedback(button.id);
    });
});

window.addEventListener('keydown', function (e) {
    if (currentValue.length >= 9) {
        return;
    }
    const btnKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '='];
    if (btnKeys.includes(e.key)) {
        calculationValues.push(e.key);
        storeValue(e.key);
    }
    if (e.key == 'Enter') {
        calculate('=');
    }
    if (e.key == 'Backspace') {
        eraseValue();
    }
}, false);


equalsButton.addEventListener('click', (e) => calculate(e.target.id));

clearButton.addEventListener('click', () => clear());

eraseButton.addEventListener('click', () => eraseValue());

// Calculator Functions

function eraseValue() {
    if (calculationValues.length > 1) {
        calculationValues.pop();
        displayValues();
    } else {
        clear();
    }
}

function storeValue(id) {
    if (id === '=') {
        numberValues.push(currentValue);
        currentValue = '';
        // display result
    } else if (operators.includes(id)) {
        numberValues.push(currentValue);
        currentValue = '';
        numberValues.push(id);
        activeOperator = true;
        displayValues();

    } else {
        currentValue += id;
        displayValues();
    }
}

const displayValues = () => {
    screenText.textContent = calculationValues.join('');
}

const calculate = (id) => {
    storeValue(id)

    let sum = 0;
    while (numberValues.length > 1) {
        if (sum == 0) {
            if (numberValues[1] == '/' && numberValues[2] == '0') {
                screenText.textContent = "Can't divide by 0!!";
                return;
            }
            sum += operate(parseInt(numberValues[0]), numberValues[1], parseInt(numberValues[2]));
            numberValues.splice(0, 3);
        } else {
            if (numberValues[0] == '/' && numberValues[1] == '0') {
                screenText.textContent = "Can't divide by 0!!";
                return;
            }
            sum = operate(sum, numberValues[0], parseInt(numberValues[1]));
            numberValues.splice(0, 2);
        }
    }

    // display result
    screenText.textContent = sum;

    // Clear arrays and values;
    numberValues = [];
    calculationValues = [];
    currentValue = '';
}


const clear = () => {
    calculationValues = [];
    numberValues = [];
    currentValue = '';
    screenText.textContent = 0;
}

// Basic Math Functions
const add = (val1, val2) => val1 + val2;
const subtract = (val1, val2) => val1 - val2;
const multiply = (val1, val2) => val1 * val2;
const divide = (val1, val2) => val1 / val2;

const operate = (val1, operator, val2) => {
    switch (operator) {
        case '+':
            return add(val1, val2);
            break;
        case ('-'):
            return subtract(val1, val2);
            break;
        case '*':
            return multiply(val1, val2);
            break;
        case '/':
            return divide(val1, val2);
            break;
        default:
            break;
    }
}
