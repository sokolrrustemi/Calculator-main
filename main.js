const screen1 = document.querySelector(".screen-1");
const result = document.querySelector(".result");
const numbersElement = document.querySelectorAll(".number");
const operationsElement = document.querySelectorAll(".operation");
const equalOpt = document.querySelector(".equal")
const allClear = document.querySelector(".all-clear");
const lastClear = document.querySelector(".last-clear");

let displayNum1 = '';
let displayNum2 = '';
let displayResult = null;
let lastOperation = '';
let optState = false;


numbersElement.forEach( number => {
    number.addEventListener('click',(e)=>{

        if(e.target.innerText === '.' && !optState)
        {
            optState = true;
        } else if(e.target.innerText === '.' && optState)
        {
            return;
        }
        displayNum2 += e.target.innerText;
        result.innerText = displayNum2;
    })

});

operationsElement.forEach(operation =>{
    operation.addEventListener("click", (e)=>{
    
        if (!displayNum2) displayResult;
        optState = false;
        const optName = e.target.innerText;
        if(displayNum1 && displayNum2 && lastOperation) {
            mathOperation();
        }else {
            displayResult = parseFloat(displayNum2)
        }
        clearVar(optName)
        lastOperation = optName;
    })
})

function clearVar(name = ''){
    displayNum1 += displayNum2 + '' + name + '';
    screen1.innerText = displayNum1;
    displayNum2 = '';
    result.innerText = displayResult;
}

function mathOperation (){
    if(lastOperation === 'x'){
        displayResult = parseFloat(displayResult) * parseFloat(displayNum2);
    }else if (lastOperation === '+'){
        displayResult = parseFloat(displayResult) + parseFloat(displayNum2);
    }else if (lastOperation === '-'){
        displayResult = parseFloat(displayResult) - parseFloat(displayNum2);
    }else if (lastOperation === '/'){
        displayResult = parseFloat(displayResult) / parseFloat(displayNum2);
    }else if (lastOperation === '%'){
        displayResult = parseFloat(displayResult) % parseFloat(displayNum2);
    }
}

equalOpt.addEventListener('click',(e)=>{
    if (!displayNum2 || !displayNum1) return;
    optState = false;
    mathOperation();
    clearVar();
    result.innerText = displayResult
    displayNum1 = '';
})

allClear.addEventListener('click', (e)=>{
    screen1.innerText = '';
    displayNum1 = '';
    displayNum2 = '';
    displayResult = '';
    result.innerText = '0';
});

lastClear.addEventListener('click', (e)=>{
    result.innerText = result.innerText.slice(0,-1);
    displayNum2 = result.innerText
    console.log("asd= "+displayNum2)
    if(displayNum2==''){
        result.innerText = 0
    }
});


// To type on the keyboard
window.addEventListener('keydown',(e)=>{
    if (
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.' 
        ) {
            clcikBtnElmnt(e.key);
    } else if (
        e.key === '+' ||
        e.key === '-' ||
        e.key === '/' ||
        e.key === '%' 
    ){
        clickOperation(e.key);
    }else if(e.key === '*'){
        clickOperation('x');
    } else if (e.key == 'Enter' || e.key ==='='){
        clickEqual();
    }
});

function clcikBtnElmnt(key){
    numbersElement.forEach(button => {
        if (button.innerText === key) {
            button.click();
        }
    })
}

function clickOperation(key){
    operationsElement.forEach(button => {
        if(button.innerText === key){
            button.click();
        }
    })
}

function clickEqual(){
    equalOpt.click();
}