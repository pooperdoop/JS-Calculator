var calculation;
function EnterNum(n){

    if(document.getElementById('enterfield').value == "undefined"){
        document.getElementById('enterfield').value ="";
    }

    switch (n){
        case 0:
            document.getElementById('enterfield').value += '0'; break;
        case 1:
            document.getElementById('enterfield').value += '1'; break;
        case 2:
            document.getElementById('enterfield').value += '2'; break;
        case 3:
            document.getElementById('enterfield').value += '3'; break;
        case 4:
            document.getElementById('enterfield').value +='4'; break;
        case 5:
            document.getElementById('enterfield').value +='5'; break;
        case 6:
            document.getElementById('enterfield').value +='6'; break;
        case 7:
            document.getElementById('enterfield').value +='7'; break;
        case 8:
            document.getElementById('enterfield').value +='8'; break;
        case 9:
            document.getElementById('enterfield').value +='9'; break;
        case '.':
             document.getElementById('enterfield').value +='.'; break;
    }
    calculation = document.getElementById('enterfield').value ;
}

function EnterAction(n){
    let calculationfield =  document.getElementById('enterfield').value;
    switch (n){
        case 'D': 

            del = calculationfield.substring(0, calculationfield.length-1); 
            document.getElementById('enterfield').value = del;
            calculation =  document.getElementById('enterfield').value
            break;
        case 'C':
            document.getElementById('enterfield').value = '';
            calculation = document.getElementById('enterfield').value
            break;

    }
}

function EnterOperator(n){
    if(n != "="){
        document.getElementById('enterfield').value += n;
    }
    else{
        document.getElementById('enterfield').value = eval(calculation)
    }
}