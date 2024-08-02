/* 
sumNValues 
Learning Objective: Learn to implement a function in JavaScript that calculates and prints the cumulative sum of numbers from 1 to a given `n`.
Assignment Details: Write a function to sum all the values between 1 and n, and return the sum Take n = 5, print between 1 and 5,
and keep adding the sum of values i.e., 1+2=3, 3+3 =6, 6+4=10, 10+5 =15


Assignment Requirements:
1. Define a function with parameter `n`.
 2. Initialize `sum` to 0.
 3. Iterate from 1 to `n`.
 4. Add `i` to `sum` in each iteration.
 5. Print `i` and the current `sum`.
 6. Return `sum` after the loop.
 7. Call the function with a specific value.
 */




 let sumNValues = (n) => {
    let sum = 0;
    for(x=1; x <=n; x++){
        sum = sum + x
        console.log('Here, print between one to five: '+ x  + ' Keep added the sum: ' + sum);
    }
    return sum
}
console.log( 'Print the total sum of value: ' + sumNValues(5));



