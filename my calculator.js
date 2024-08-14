function clearDisplay() {
    document.getElementById('display').value = '';
}

function appendValue(value) {
    const display = document.getElementById('display');
    let currentValue = display.value;


    if (currentValue === 'Error' && !['+', '-', '*', '/', '%', '(', ')'].includes(value)) {
        display.value = ''; 
    }

    
    if (value === ',') {
        if (['+', '-', '*', '/'].includes(currentValue.slice(-1)) || currentValue === '') {
            display.value += '0,';
        } else if (!currentValue.includes(',')) {
            display.value += value;
        }
    }

    else if (['+', '-', '*', '/'].includes(value)) {
        if (currentValue === '' || ['+', '-', '*', '/'].includes(currentValue.slice(-1))) {
            if (['+', '-', '*', '/'].includes(currentValue.slice(-1))) {
                display.value = currentValue.slice(0, -1) + value;
            } else {
                display.value += value;
            }
        } else {
            display.value += value;
        }
    }

    else {
        display.value += value;
    }
}

function toggleSign() {
    const display = document.getElementById('display');
    if (display.value) {
        if (/^\((.*)\)$/.test(display.value)) {
            display.value = display.value.slice(1, -1);
        } else {
            display.value = (parseFloat(display.value.replace(',', '.')) * -1).toString().replace('.', ',');
        }
    }
}

function toggleParentheses() {
    const display = document.getElementById('display');
    let currentValue = display.value;
    const openCount = (currentValue.match(/\(/g) || []).length;
    const closeCount = (currentValue.match(/\)/g) || []).length;

    if (openCount > closeCount) {
        display.value += ')';
    } else {
        display.value += '(';
    }
}

function calculate() {
    const display = document.getElementById('display');
    try {
        let expression = display.value.replace(/,/g, '.').replace(/%/g, '/100');

        if (/\/0/.test(expression)) {
            throw new Error('Division by zero');
        }

        expression = math.evaluate(expression);
        display.value = expression.toString().replace('.', ',');
    } catch (error) {
        display.value = 'Error';
    }
}
