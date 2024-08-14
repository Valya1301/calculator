function clearDisplay() {
    document.getElementById('display').value = '';
}

function appendValue(value) {
    const display = document.getElementById('display');
    let currentValue = display.value;

    
    if (currentValue === 'Error' && !['+', '-', '*', '/', '%'].includes(value)) {
        display.value = ''; 
    }

    if (value === '.') {
    
        if (['+', '-', '*', '/'].includes(currentValue.slice(-1)) || currentValue === '') {
            display.value += '0.';
        } else if (!currentValue.includes('.')) {
            
            display.value += value;
        }
    } else if (['+', '-', '*', '/'].includes(value)) {
        
        if (currentValue === '' || ['+', '-', '*', '/'].includes(currentValue.slice(-1))) {
            if (['+', '-', '*', '/'].includes(currentValue.slice(-1))) {
                display.value = currentValue.slice(0, -1) + value;
            } else {
                display.value += value;
            }
        } else {
            display.value += value;
        }
    } else {
        
        display.value += value;
    }
}

function toggleSign() {
    const display = document.getElementById('display');
    if (display.value) {
        display.value = (parseFloat(display.value) * -1).toString();
    }
}

function calculate() {
    const display = document.getElementById('display');
    try {
        let expression = display.value.replace(/%/g, '/100');

        if (/\/0/.test(expression)) {
            throw new Error('Division by zero');
        }

        
        expression = new Function('return ' + expression)();
        display.value = expression;
    } catch (error) {
        display.value = 'Error';
    }
}
