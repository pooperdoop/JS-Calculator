var calculation; // saves value of field when needed
var periodCheck = false; // checks if period exists within a number
var ParCheck = false; // checks whether open or close parenthesis should be placed
var parCount = 0; // number of open parenthesis within the equation




function EnterNum(input){
    CheckForPar();
    Cleanup();

    if (typeof input === 'number' && input >= 0 && input <= 9) {
        // Handle numbers
        appendToField(input);
        ParCheck = true;
    } else if (input === 'P') {
        // Handle parentheses
        if (!ParCheck) {
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
        ParCheck = false;
    }
    calculation = document.getElementById('enterfield').value ;
    // saves input field value to be used in different functions (deleting and clearing)
}

function EnterAction(n){
    Cleanup();
    CheckForPar();
    
    let calculationfield = document.getElementById('enterfield').value;
    switch (n){
        case 'D': 
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
                    ParCheck = true;
                }
            }
            del = calculationfield.substring(0, calculationfield.length-1); 
            document.getElementById('enterfield').value = del;

            break;
        case 'C':
            document.getElementById('enterfield').value = '';
            periodCheck = false;
            ParCheck = false;
            parCount = 0;
            break;

    }
    calculation =  document.getElementById('enterfield').value
}

function EnterOperator(n){
    Cleanup();
    let enterfield = document.getElementById('enterfield').value;
    if(n != "="){
        if(enterfield.length == 0 && n != "-" || enterfield == "-"){
            // returns if input is any operator except - or if inputfield only consists of a -
            return;
        } else{
            let lastChar = enterfield.value.slice(-1);
            // getst the last character
            if(lastChar == "+" || lastChar == "-" || lastChar == "/" || lastChar =="*" || lastChar =="%"){

                let del = enterfield.substring(0, enterfield.length-1); 
                changeFieldValue(del +n);
                // removes previous operator and replaces it with the new operator inputted 

            }else{
                if(lastChar == "."){
                   appendToField("0" + n);
                } else{
                   appendToField(n);
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
                changeFieldValue(eval(calculation));
            }
            catch(e){
                changeFieldValue("Format Error");
            }
            periodCheck = false;
            ParCheck = false;
            parCount = 0;
        }
    }
}

function CheckForPar(){
    if(parCount == 0){
        ParCheck = false;
    }
    // checks if there are any parenthesis in the inputfield
}
function Cleanup(){
    if(document.getElementById('enterfield').value == "undefined" || document.getElementById('enterfield').value == "Format Error"){
        document.getElementById('enterfield').value ="";
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
}