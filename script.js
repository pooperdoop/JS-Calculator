var calculation;
var periodCheck = false;
var ParCheck = false;
var parCount = 0;




function EnterNum(n){
    CheckForPar();
    Cleanup();

    switch (n){
        case 0:
            document.getElementById('enterfield').value += '0'; 
            ParCheck = true; 
            break;
        case 1:
            document.getElementById('enterfield').value += '1'; 
            ParCheck = true; 
            break;
        case 2:
            document.getElementById('enterfield').value += '2'; 
            ParCheck = true; 
            break;
        case 3:
            document.getElementById('enterfield').value += '3'; 
            ParCheck = true; 
            break;
        case 4:
            document.getElementById('enterfield').value +='4'; 
            ParCheck = true; 
            break;
        case 5:
            document.getElementById('enterfield').value +='5'; 
            ParCheck = true; 
            break;
        case 6:
            document.getElementById('enterfield').value +='6'; 
            ParCheck = true; 
            break;
        case 7:
            document.getElementById('enterfield').value +='7'; 
            ParCheck = true; 
            break;
        case 8:
            document.getElementById('enterfield').value +='8'; 
            ParCheck = true; 
            break;
        case 9:
            document.getElementById('enterfield').value +='9'; 
            ParCheck = true; 
            break;
        case 'P':
            if(ParCheck == false){
                document.getElementById('enterfield').value +='('; 
                parCount++;
            } else{
                document.getElementById('enterfield').value +=')'; 
                parCount--;
            }
            break;
        case '.':
            if(periodCheck == false){
             document.getElementById('enterfield').value +='.'; 
             periodCheck = true;
            } 
            ParCheck = false; 
            break;
    }
    calculation = document.getElementById('enterfield').value ;
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
            calculation =  document.getElementById('enterfield').value
            break;
        case 'C':
            document.getElementById('enterfield').value = '';
            periodCheck = false;
            ParCheck = false;
            parCount = 0;
            calculation = document.getElementById('enterfield').value
            break;

    }
}

function EnterOperator(n){
    Cleanup();
    if(n != "="){
        let calculationfield = document.getElementById('enterfield').value;
        if(calculationfield.length == 0 && n != "-" || calculationfield == "-"){
            return;
        } else{
            let lastChar = document.getElementById("enterfield").value.slice(-1);
            if(lastChar == "+" || lastChar == "-" || lastChar == "/" || lastChar =="*" || lastChar =="%"){
                let del = calculationfield.substring(0, calculationfield.length-1); 
                document.getElementById('enterfield').value = del +n;
            }else{
                if(lastChar == "."){
                    document.getElementById('enterfield').value += "0" + n;
                } else{
                    document.getElementById('enterfield').value += n;
                }
                periodCheck = false;
            }   
        }
    }
    else{
         if(document.getElementById('enterfield').value == ""){
            return;
         }else{
            try{
                document.getElementById('enterfield').value = eval(calculation);
            }
            catch(e){
                document.getElementById('enterfield').value = "Format Error";
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
}
function Cleanup(){
    if(document.getElementById('enterfield').value == "undefined" || document.getElementById('enterfield').value == "Format Error"){
        document.getElementById('enterfield').value ="";
    }
}