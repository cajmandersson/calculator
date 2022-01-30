
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
