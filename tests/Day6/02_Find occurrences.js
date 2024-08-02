// Learn how to count the occurrences of a specific element in an array using JavaScript.
const nums = [2, 4, 5, 2, 1, 2];


const occur = {};
for (let elem of nums) {
    if(occur[elem]){
        occur[elem] += 1;
    } else {
        occur[elem] = 1;
    }
}
console.log(occur[2]);
