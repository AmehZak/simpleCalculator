class Calculator{
    constructor(previousOperandTxtElmt,currentOperandTxtElmt){
        this.previousOperandTxtElmt = previousOperandTxtElmt
        this.currentOperandTxtElmt = currentOperandTxtElmt
        this.clear()
    }

    clear(){
        this.cuurrentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){//get the last value from the string and chop it off
        this.cuurrentOperand = this.cuurrentOperand.toString().slice(0,-1)
    }

    appendNumber(number){
        if(number === '.' && this.cuurrentOperand.includes('.')) return
        this.cuurrentOperand = this.cuurrentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.cuurrentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.cuurrentOperand
        this.cuurrentOperand = ''
    }

    compute() {//calculer
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.cuurrentOperand)
        if (isNaN(prev || isNaN(current))) return
        switch(this.operation){
            case '+' : 
            computation = prev + current
            break
            case '-' : 
            computation = prev - current
            break
            case '*' : 
            computation = prev * current
            break
            case '÷' : 
            computation = prev / current
            break
            default : 
                return
        }

        this.cuurrentOperand = computation
        this.operation = undefined
        this.previousOperand =''

    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en',{
                maximumFractionDigits: 0})
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandTxtElmt.innerText = this.getDisplayNumber(this.cuurrentOperand )
        if(this.operation != null){
            this.previousOperandTxtElmt.innerText = 
                this.getDisplayNumber(`${this.previousOperand} ${this.operation}`)
        }else this.previousOperandTxtElmt.innerText = ' ' 
    
    }
}
const nmberButts = document.querySelectorAll('[data-number]')
const operationButts = document.querySelectorAll('[data-operation]')
const equalsButts = document.querySelector('[data-equals]')
const deleteButt = document.querySelector('[data-delete]')
const allClearButt = document.querySelector('[data-all-clear]')
const previousOperandTxtElmt = document.querySelector('[data-previous-operand]')
const currentOperandTxtElmt = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTxtElmt,currentOperandTxtElmt)

nmberButts.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButts.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButts.addEventListener('click' , button =>{
   calculator.compute()
   calculator.updateDisplay()
})

allClearButt.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
 })

deleteButt.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
 })