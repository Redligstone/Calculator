const functions = document.querySelectorAll('.button.function');
let buttons = document.querySelectorAll('.button');
let operators = document.querySelectorAll('.button.operator');

let displayInput = document.querySelector('.display__input');
let displayOutput = document.querySelector('.display__output');

let input = document.querySelector('div[type="text"].text__input');
let output = document.querySelector('div[type="text"].text__output');

let equalPressed = false;
let operatorPressed = false;
let delPressed = false;
let acPressed = false;

let preInput = ''

function equals(){
    try{
        currentValue = preInput
        input.innerHTML = clearInput(preInput)
        result = eval(currentValue)
        if( result === undefined 
            || currentValue ==='' 
            || preInput ==='invalid input'){
        input.style.color = 'rgb(235, 96, 86)'
        input.style.transitionDuration = '0s'
        output.style.transitionDuration = '0s'
        preInput = 'Invalid input'
        output.innerHTML =''
        input.innerHTML = clearInput(preInput)
        }else{
            input.style.transitionDuration = '0.5s'
            output.style.transitionDuration = '0.5s'
    
            output.innerHTML = eval(preInput);
            input.style.fontSize = '25px';
            input.style.color = 'rgb(107, 107, 107)';
            input.style.marginBottom = '10px'
    
            output.style.fontSize = '50px';
            output.style.color = 'rgb(215, 216, 216)'
            output.style.marginBottom = '15px'
            output.style.top = '-15px'
            displayOutput.style.marginTop = '5px'
            output.style.paddingTop = '0px'
        }
    } catch (e){
        input.style.color = 'rgb(235, 96, 86)'
        input.style.transitionDuration = '0s'
        output.style.transitionDuration = '0s'
        preInput = 'Invalid input';
        output.innerHTML = ''
        input.innerHTML = clearInput(preInput)
    }
}

function reset(){
    preInput = '';
    output.innerHTML = '';
    input.style.fontSize = '50px';
    output.style.fontSize = '25px';
}
function continueInput(){
    preInput = output.innerHTML
    output.innerHTML = '';
    input.style.fontSize = '50px';
    input.style.color = 'rgb(215, 216, 216)'
    output.style.fontSize = '25px';
}

for (let func of functions ){
    func.addEventListener('click', ()=>{
    if(func.innerHTML == 'AC'){
        preInput = ''
        input.innerHTML = clearInput(preInput)
        output.innerHTML = ''
        output.style.top = '0px'
        displayOutput.style.marginTop = '5px'
        delPressed = false;
        operatorPressed = false;
        acPressed = true;
        if(output.innerHTML === 'undefined'){
            output.innerHTML = ''
        }
    }
    if(func.innerHTML.toLowerCase() == 'del'){
        if(preInput.length < 2 && input.innerHTML.length < 2|| preInput === '' && input.innerHTML ==='' && output.innerHTML == undefined){
            output.innerText = ''
        }

        if(preInput ==='Invalid input' ){
            preInput = '';
            input.innerHTML = ''
        }
        else{
        delPressed = true;
        let inputValue = preInput.split('');
        inputValue.splice(-1,1);
        preInput = inputValue.join('');
        input.innerHTML = clearInput(preInput)
        
        input.style.fontSize = '50px';
        input.style.color = 'rgb(215, 216, 216)'
        input.style.marginBottom = '22px'

        output.style.fontSize = '25px';
        output.style.color = 'rgb(107, 107, 107)';
        output.style.marginBottom = '15px'
        output.style.top = '0px'
        output.style.paddingTop = '10px'
        displayOutput.style.marginTop = '5px'
        }
    }
    })
}
for (let button of buttons){
    button.addEventListener('click', ()=>{
        if(button.innerText == '0'){
        zero();
        }
        if(button.innerText == '00'){
        doubleZero()
        }
        if(button.innerText == 'X'){
        letOperator('*');
        operatorPressed = true;
        if(equalPressed && !delPressed){
            equalPressed = false;
            continueInput()
            letOperator('*')
        }
        }
        if(button.innerText == '-'){
        letOperator('-');
        operatorPressed = true;
        if(equalPressed && !delPressed){
            equalPressed = false;
            continueInput();
            letOperator('-');
        }
        }
        if(button.innerText == '+'){
        letOperator('+');
        operatorPressed = true;
        if(equalPressed && !delPressed){
            equalPressed = false;
            continueInput()
            letOperator('+');
        }
        }
        if(button.innerText == '÷'){
        letOperator('/');
        operatorPressed = true;
        if(equalPressed && !delPressed){
            equalPressed = false;
            continueInput();
            letOperator('/');
        }
        }
        if(button.innerText == '%'){
        letOperator('%');
        operatorPressed = true;
        if(equalPressed && !delPressed){
            equalPressed = false;
            continueInput();
            letOperator('%');
        }
        }
        if(button.innerText == '.'){
            if(!dot())
        letOperator('.');
        if(equalPressed && !delPressed){
            equalPressed = false;
            continueInput()
            letOperator('*')
        }
        }
        if(button.innerText == '='){
        equals();
        equalPressed = true;
        operatorPressed = false;
        delPressed = false;
        }
    })
}


let operatorsArr = ['/', '%', '-', '+','*','.'];
function checkOperators(arr){
    const currentValue = preInput;
    const lastLetter = currentValue[currentValue.length - 1];
    const hasOperators = arr.includes(lastLetter);
        
    if(hasOperators) {
        return true;
    } else return false;
    
}
function letOperator(operator){
    if(!checkOperators(operatorsArr)){
        if(preInput !== '' || operator =='-' ){
            preInput += operator;
            input.innerHTML = clearInput(preInput)
        }
    } else if(preInput !== '-' || preInput === 'Invalid input'){
            updatedValue = preInput.split('');
            updatedValue.pop();
            updatedValue = updatedValue.join('');
            preInput = updatedValue;
            preInput += operator;
            input.innerHTML = clearInput(preInput)
    }
}
let checkNumbers = function(){
    let currentValue = preInput; 
    let lastCharacter = currentValue.slice(-1);
    let secondLastCharacter = currentValue.slice(-2,-1);
    if (lastCharacter === '0' && secondLastCharacter === '-'
    ||lastCharacter === '0' && secondLastCharacter === '+'
    ||lastCharacter === '0' && secondLastCharacter === '*'
    ||lastCharacter === '0' && secondLastCharacter === '/'
    ||lastCharacter === '0' && secondLastCharacter === '%'
){
    return true;
}else if(currentValue == '0'){
    return true;
} 
else{ return false}
}

function numbers(){
    let numArr = ['1','2','3','4','5','6','7','8','9'];
        for (let button of buttons){
            button.addEventListener('click',()=>{ 
                if(!checkNumbers() && button.innerHTML == numArr[button.innerHTML - 1]){
                        preInput += numArr[button.innerHTML - 1]
                        input.innerHTML = clearInput(preInput)
                        acPressed = false;
                        if(equalPressed && !delPressed){
                            equalPressed = false;
                            reset()
                            input.style.color = 'rgb(215, 216, 216)'
                            preInput += numArr[button.innerHTML - 1]
                            input.innerHTML = clearInput(preInput)
                        }
                }
            })
        }
}
numbers()

function zero(){
    let currentValue = preInput; 
    let lastCharacter = currentValue.slice(-1);
    let secondLastCharacter = currentValue.slice(-2,-1);
    let thirdLastCharacter = currentValue.slice(-3,-2);
    let fourthLastCharacter = currentValue.slice(-4,-3);
    let fifthLastCharacter = currentValue.slice(-5,-4);
    let sixthLastCharacter = currentValue.slice(-6,-5);
    let seventhLastCharacter = currentValue.slice(-7,-6);
    let eigthLastCharacter = currentValue.slice(-8,-7);
    let ninthLastCharacter = currentValue.slice(-9,-8);
    let tenthLastCharacter = currentValue.slice(-10,-9);
    let eleventhLastCharacter = currentValue.slice(-11,-10);
    let twelveththLastCharacter = currentValue.slice(-12,-11);
    let thirteenththLastCharacter = currentValue.slice(-13,-12);
    let fourteenthLastCharacter = currentValue.slice(-14,-13);
    let hasDot = currentValue.indexOf('.') !== -1;

    if (!hasDot && currentValue ==='0'){
        return;
    }
    else if(lastCharacter === '0' && secondLastCharacter === '-' 
    ||lastCharacter === '0' && secondLastCharacter === '*' 
    ||lastCharacter === '0' && secondLastCharacter === '+'
    ||lastCharacter === '0' && secondLastCharacter === '/'
    ||lastCharacter === '0' && secondLastCharacter === '%'
    ||lastCharacter === '0' && secondLastCharacter === '*'){
    return
    }
    else if (hasDot && lastCharacter !== '0') {
        preInput +='0';
    }
    else if (!hasDot && lastCharacter !== '0' ) {
        preInput +='0';
    }
    else if (lastCharacter === '.' || hasDot) {
        preInput +='0';
    }
    else if (
        lastCharacter !== '.' && 
        lastCharacter === '0' && secondLastCharacter !== '0' 
        || lastCharacter === '0' && thirdLastCharacter !== '0' 
        || lastCharacter === '0' && fourthLastCharacter !== '0' 
        || lastCharacter === '0' && fifthLastCharacter !== '0' 
        || lastCharacter === '0' && sixthLastCharacter !== '0' 
        || lastCharacter === '0' && seventhLastCharacter !== '0' 
        || lastCharacter === '0' && eigthLastCharacter !== '0' 
        || lastCharacter === '0' && ninthLastCharacter !== '0'
        || lastCharacter === '0' && tenthLastCharacter !== '0'
        || lastCharacter === '0' && eleventhLastCharacter !== '0'
        || lastCharacter === '0' && twelveththLastCharacter !== '0'
        || lastCharacter === '0' && thirteenththLastCharacter !== '0'
        || lastCharacter === '0' && fourteenthLastCharacter !== '0') {
        
        preInput +='0'
    }
    input.innerHTML = clearInput(preInput)
}

function doubleZero(){
    let currentValue = preInput; 
    let lastCharacter = currentValue.slice(-1);
    let secondLastCharacter = currentValue.slice(-2,-1);
    let thirdLastCharacter = currentValue.slice(-3,-2);
    let fourthLastCharacter = currentValue.slice(-4,-3);
    let fifthLastCharacter = currentValue.slice(-5,-4);
    let sixthLastCharacter = currentValue.slice(-6,-5);
    let seventhLastCharacter = currentValue.slice(-7,-6);
    let eigthLastCharacter = currentValue.slice(-8,-7);
    let ninthLastCharacter = currentValue.slice(-9,-8);
    let tenthLastCharacter = currentValue.slice(-10,-9);
    let eleventhLastCharacter = currentValue.slice(-11,-10);
    let twelveththLastCharacter = currentValue.slice(-12,-11);
    let thirteenththLastCharacter = currentValue.slice(-13,-12);
    let fourteenthLastCharacter = currentValue.slice(-14,-13);
    let hasDot = currentValue.indexOf('.') !== -1;
    if (!hasDot && currentValue ==='0'){
        return;
    }
    else if(currentValue ==='0' || currentValue == ''){
        return;
    }
    else if(lastCharacter == '*' || 
    lastCharacter === '+' ||
    lastCharacter === '/' ||
    lastCharacter === '%' ||
    lastCharacter === '*' ||
    lastCharacter === '-'){
        return;
    }
    else if(lastCharacter === '0' && secondLastCharacter === '-' 
    ||lastCharacter === '0' && secondLastCharacter === '*' 
    ||lastCharacter === '0' && secondLastCharacter === '+'
    ||lastCharacter === '0' && secondLastCharacter === '/'
    ||lastCharacter === '0' && secondLastCharacter === '%'
    ||lastCharacter === '0' && secondLastCharacter === '*'){
    return
    }
    else if (hasDot && lastCharacter !== '0') {
        preInput +='00';
    }
    else if (!hasDot && lastCharacter !== '0' ) {
        preInput +='00';
    }
    else if (lastCharacter === '.' || hasDot) {
        preInput +='00';}
    else if (
        lastCharacter !== '.' && 
        lastCharacter === '0' && secondLastCharacter !== '0' 
        || lastCharacter === '0' && thirdLastCharacter !== '0' 
        || lastCharacter === '0' && fourthLastCharacter !== '0' 
        || lastCharacter === '0' && fifthLastCharacter !== '0' 
        || lastCharacter === '0' && sixthLastCharacter !== '0' 
        || lastCharacter === '0' && seventhLastCharacter !== '0' 
        || lastCharacter === '0' && eigthLastCharacter !== '0' 
        || lastCharacter === '0' && ninthLastCharacter !== '0'
        || lastCharacter === '0' && tenthLastCharacter !== '0'
        || lastCharacter === '0' && eleventhLastCharacter !== '0'
        || lastCharacter === '0' && twelveththLastCharacter !== '0'
        || lastCharacter === '0' && thirteenththLastCharacter !== '0'
        || lastCharacter === '0' && fourteenthLastCharacter !== '0') {
        preInput +='00';
    }
    input.innerHTML = clearInput(preInput)
}

let dot = function(){
    let currentValue = preInput; 
    let lastCharacter = currentValue.slice(-1);
    let secondLastCharacter = currentValue.slice(-2,-1);
    let thirdLastCharacter = currentValue.slice(-3,-2);
    let fourthLastCharacter = currentValue.slice(-4,-3);
    let fifthLastCharacter = currentValue.slice(-5,-4);
    let hasDot = currentValue.indexOf('.') !== -1;
    let operators = ['-', '+', '*', '/', '%']

    if(hasDot && lastCharacter === '.'

    ||lastCharacter !== '.' 
    && secondLastCharacter ==='.' 
    && operators.includes(fourthLastCharacter)
    
    ||lastCharacter !== '.' 
    && thirdLastCharacter ==='.' 
    && operators.includes(fifthLastCharacter)

    ||hasDot && lastCharacter !== '.' 
    && secondLastCharacter ==='.' 
    && !operators.includes(fourthLastCharacter)
    
    ||hasDot && lastCharacter !== '.' 
    && thirdLastCharacter ==='.' 
    && !operators.includes(fifthLastCharacter)
    
    ){
        return true;
    } 
    else{
        return false;
    }
}

for (elem of buttons){
    elem.addEventListener('click',()=>{
        try{
            if(!equalPressed && operatorPressed && eval(preInput) !== undefined|| delPressed && eval(preInput) !== undefined){
                output.innerHTML = eval(preInput);
                output.style.fontSize = '25px'
                output.style.marginBottom = '15px'
                output.style.color = 'rgb(107, 107, 107)'
                
                output.style.paddingTop = '10px'
                output.style.top = '0px'
                displayOutput.style.marginTop = '5px'
                console.log('cock')
            }
    
            if(elem.innerText !=='=' &&  preInput === 'Invalid input'){
                preInput = ''
                input.innerHTML = ''
            }
        }
        catch{
        }
    })
}

function clearInput(input){
    let inputArr = input.split('');
    let inputArrLength = inputArr.length;

    for (i = 0;i < inputArrLength; i++){
        if(inputArr[i] === '-'){
        inputArr[i] = `<span class="operator">-</span>`
        } else if(inputArr[i] === '+'){
        inputArr[i] = `<span class="operator">+</span>`
        }else if(inputArr[i] === '/'){
        inputArr[i] = `<span class="operator">÷</span>`
        }else if(inputArr[i] === '*'){
        inputArr[i] = `<span class="operator">x</span>`
        }else if(inputArr[i] === '%'){
        inputArr[i] = `<span class="operator">%</span>`
        }
    }
    return inputArr.join('');
}

