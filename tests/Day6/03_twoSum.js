// Learn to identify and return pairs of indices whose elements sum up to a specific target using nested loops in JavaScript.
/* what is two sum ?
Two Sum Problem in JavScript equals finding a pair of indices present in the array of numbers given as an input that adds up to the target
sum which is also provided as an input by the user.
Given an array of integers and target sum , we will traverse the array of numbers to find out the pair of numbers ,
there can be one or more pairs of numbers that sums up to the target value given as an input source . Once the pair of numbers are found
we can look for their indices to solve the problem statement in whole.
The small catch here is each input value present in an array of numbers can be used once only
and you cannot use the same element twice for summing up , where the resultant pairs can be returned in any order.
*/




let getOutput =  (nums, tarGet) => {
    for (let x =0; x < nums.length; x++){
        for(let y= x+1; y < nums.length; y++){
            if( nums[x] + nums[y] === tarGet){
                return results = [x, y];      
            }                      
        }
    }  
}
let nums = [2, 4, 7, 8, 11, 14];
const tarGet = 18;
let results = [];
console.log(getOutput(nums, tarGet));
