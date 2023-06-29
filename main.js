const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operator]');
const equalBtn = document.querySelector('[data-equal');
const deleteBtn = document.querySelector('[data-delete]');
const ACBtn = document.querySelector('[data-all-clear]')
const previousOperandText = document.querySelector('[data-previous]');
const currentOperandText = document.querySelector('[data-current]');

class Calculator {
    constructor(previousOperandText,currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    delete () {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }
    
    calculate () {
        let result;

        const previousOperandFloat = parseFloat(this.previousOperand);
        const currentOperandFloat = parseFloat(this.currentOperand);

        if (isNaN(previousOperandFloat) || isNaN(currentOperandFloat)) return;

        switch (this.operation) {
            case "+":
                result = previousOperandFloat + currentOperandFloat;
                break;
            case "-":
                result = previousOperandFloat - currentOperandFloat;
                break;
            case "*":
                result = previousOperandFloat * currentOperandFloat;
                break;
            case ":":
                result = previousOperandFloat / currentOperandFloat;
                break;
            default:
                return;
        }

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    chooseOperation(operation) {
        if (this.currentOperand === "" ) return;

        if (this.previousOperand != '') {
            this.calculate();
        }

        this.operation = operation;

        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    appendNumber(number) {
        if (this.currentOperand.includes(".") && number === "." ) return;
        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }

    clear () {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    updateDisplay() {
        this.previousOperandText.innerText = `${this.previousOperand} ${this.operation || ''}` ;
        this.currentOperandText.innerText = this.currentOperand;
    }
}

const calculator = new Calculator(
    previousOperandText,
    currentOperandText
);

for ( const numberBtn of numberBtns) {
    numberBtn.addEventListener('click', () =>{
        calculator.appendNumber(numberBtn.innerText);
        calculator.updateDisplay();
    });
}

for ( const operationBtn of operationBtns) {
    operationBtn.addEventListener('click', () => {
        calculator.chooseOperation(operationBtn.innerText);
        calculator.updateDisplay();
    })
}

ACBtn.addEventListener('click', () =>{
    calculator.clear();
    calculator.updateDisplay();
});

equalBtn.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})