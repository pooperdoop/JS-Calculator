var calculation = ""; // saves value of field when needed
var periodCheck = false; // checks if period exists within a number
var parCheck = false; // checks whether open or close parenthesis should be placed
var parCount = 0; // number of open parenthesis within the equation
var currentEquation; // takes the first part of the equation if parentheses are involved
var currentEquationAnswer; // answer to the first equation
var currentAns = ""; // the current answer to the field


function EnterInput(input){
    Cleanup();
    let lastChar = document.getElementById("enterfield").value.slice(-1);

    if (typeof input === 'number' && input >= 0 && input <= 9) {
        // Handle numbers
        if(lastChar == ')'){
            appendToField('×');
        }
        appendToField(input);
        parCheck = true;
    } else if (input === 'P') {
        // Handle parentheses 
        // Handles parenthesis calculation
        if (!parCheck) {
            if(calculation == ""){
            }else{
                if(lastChar >= 0 && lastChar <= 9 || lastChar == ')'){
                    appendToField('×');
                    }
            }
            appendToField('(');
            parCount++;

        } else {
            appendToField(')');
            parCount--;
        }

    } else if (input === '.') {
        // Handle decimal point
        if (!periodCheck) {
            appendToField('.');
            periodCheck = true;
        }
        parCheck = false;
    } else if(input ==='√'){
        appendToField('√(');
        parCount++;
    }
    checkforCalculation();
    calculation = document.getElementById('enterfield').value;
    // saves input field value to be used in different functions (deleting and clearing)
    CheckForPar();
}

function EnterAction(n){
    Cleanup();  
    let calculationfield = document.getElementById('enterfield').value;
    switch (n){
        case 'D':
            CheckForPar(); 
            let lastChar = document.getElementById("enterfield").value.slice(-1);
            if(lastChar == "."){
                periodCheck = false;
            }
            if(lastChar == "("){
                parCount--;
            }
            if(lastChar == ")"){
                parCount++;
                if(parCount > 0){
                    parCheck = true;
                }
            }

            del = calculationfield.substring(0, calculationfield.length-1); 
            document.getElementById('enterfield').value = del;
            calculation = document.getElementById('enterfield').value;
            alert(calculation)

            if(calculation.slice(-1) == "("){

                parCheck = false;
            }
            checkforCalculation();
            break;
        case 'C':
            document.getElementById('enterfield').value = "";
            calculation = "";
            periodCheck = false;
            parCheck = false;
            parCount = 0;
            currentAns = [];
            break;
            // effectively, a reset to the inputs and values of vars

    }
}

function EnterOperator(n){
    checkforCalculation();
    Cleanup();  
    let enterfield = document.getElementById('enterfield').value;
    if(n != "="){
        if(enterfield.length == 0 && n != "-" || enterfield == "-"){
            // returns if input is any operator except - or if inputfield only consists of a -
            return;
        } else{
            let lastChar = enterfield.slice(-1);
            // getst the last character
            if(lastChar == "+" || lastChar == "-" || lastChar == "÷" || lastChar =="×" || lastChar =="%"){

                let del = enterfield.substring(0, enterfield.length-1); 
                changeFieldValue(del +n);
                // removes previous operator and replaces it with the new operator inputted 

            }else{
                if(lastChar == "."){
                   appendToField("0" + n);
                   CheckForPar();
                } else{
                   appendToField(n);
                   CheckForPar();
                }
                periodCheck = false;

            }   // Handles period operator reiteration 
        }
    }
    else{
         if(document.getElementById('enterfield').value == ""){
            // prevents any output if enterfield is empty
            return;
         }else{
            try{

                changeFieldValue(currentAns);
            }
            catch(e){
                changeFieldValue("Format Error");
            }
            parCheck = false;
            parCount = 0;
        }
    }
}

function CheckForPar(){
    const enterField = document.getElementById('enterfield');
    if(parCount == 0){
        parCheck = false;
        currentEquation = enterField.value;
        currentEquationAnswer = currentEquation;
        CheckForMathFunction(currentEquationAnswer);
    }
    // checks if there are any parenthesis in the inputfield
}
function checkforCalculation(){
    if(calculation.length == 0){
        calculation = "";
    }
}

function appendToField(value){

    // Gets current value of the input field
    const enterField = document.getElementById('enterfield');
    // appends input to current value 
    enterField.value += value;
}

function changeFieldValue(value){
    const enterField = document.getElementById('enterfield');
    enterField.value = value;

    if(enterfield.value.includes('.')){
        periodCheck = true;
    }else{
        periodCheck =false;
    }
}

function Cleanup(){
    const enterField = document.getElementById('enterfield');

    if(enterField.value == "Format Error"){
        enterField.value ="";
        calculation = "";
    }
}

function CheckForMathFunction(currentValue){
    if(currentValue.includes("√")){
        SquareRootFunction();
    } else{

        currentValue = currentValue.replaceAll("÷", "/")
        currentValue = currentValue.replaceAll("×", "*")
        //Replaces characters with equation friendly operators

        currentValue = eval(currentValue);
        currentAns = currentValue;
        console.log(currentAns);
    }
}

function SquareRootFunction(){
    let startChar = currentEquationAnswer.lastIndexOf("√") + 2;
    let parenthesesCount = 1;
    let sqrRtEquation = "(";

    while(parenthesesCount != 0){
        console.log(parenthesesCount)

        let currentChar = currentEquationAnswer.charAt(startChar);
        sqrRtEquation += currentChar;

        if(currentChar === "("){
            parenthesesCount++;
        } else if(currentChar === ")"){
            parenthesesCount--;
        }
        startChar++;
    }
    console.log(sqrRtEquation);
    let removable = "√"+sqrRtEquation;

    sqrRtEquation = sqrRtEquation.replaceAll("÷", "/")
    sqrRtEquation = sqrRtEquation.replaceAll("×", "*")

    let evalResult = eval(sqrRtEquation);
    let finalSqrrt = Math.sqrt(evalResult);
    currentEquationAnswer = currentEquationAnswer.replace(removable, finalSqrrt);

    console.log(evalResult);
    console.log(finalSqrrt);
    console.log(currentEquationAnswer);

    CheckForMathFunction(currentEquationAnswer);

}