/* let n = 5;

function testfactorial(n) {
    let result = 1
    if (n < 0){
        return -1;
     }
     else if(n == 0){
        return 1;
     }
    for(let x= 2; x <= n; x++){
        result = result * x;
    }
    return result;
   
}
console.log(testfactorial(n)); */


/*
Assignment Requirements: 5 = 5*4*3*2*1 => 120
1. Write a function named `factorial` that accepts an argument `n`, which is a non-negative integer, and returns its factorial.
2. Include a check to ensure that the factorial is not computed for negative numbers. If a negative number is passed, the function should throw an error.
3. Use a loop to compute the factorial. Initialize a result variable and multiply it by each integer from 2 up to `n`.
4. Include example calls to the `factorial` function with different integers to demonstrate the function’s functionality. Include at least one example where an error is thrown due to a negative input.
*/


let n2 = 5;
let testFactorial = (n2)=> {
    let result2 = 1;
    if (n2 < 0){
        return -1;
    }
     else if(n2 == 0){
        return 1;
    }
    for(let x= n2; x > 1; x--){
        result2 = result2 * x;
        console.log(result2);
       
    }
    return result2;
}
console.log(testFactorial(n2));
