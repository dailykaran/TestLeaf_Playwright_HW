// JavaScript function determining whether a given number is odd or even.


function isOddOrEven(input) {
    let inputNumber = input;
    let results = inputNumber % 2
    if(inputNumber % 2 == 1){
        console.log(inputNumber + " is an odd number and result " + results);
    }else{
        console.log(inputNumber + " is even number and result "  + results);
    }
}


const input = 7
isOddOrEven(input);
