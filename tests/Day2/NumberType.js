// categorize a number as positive, negative, or zero using conditional statements in JavaScript.


function findPosNegNumber(findNumber){
    var getNumber = findNumber;
    if(getNumber > 0){
        return "The given number is positive";
    }else if(getNumber < 0) {
       
        return "The given number is negative";
    }else if(getNumber == 0) {
        return "The given number is neutral";
    }else{
        console.log("The input number is invalid");
    }
}


console.log(findPosNegNumber(4));
