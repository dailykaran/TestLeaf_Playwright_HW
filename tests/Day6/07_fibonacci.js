// Create a TypeScript program that defines a function to compute the nth Fibonacci number using a loop
// trail 1
let testFibonacci = (n)=> {
    if (n == 1)
        return 0;
    if (n == 2)
        return 1;


    let n1 = 0;
    let n2 = 1;
    let sum;


    let i = 2;
    while(i < n){
        sum = n1  + n2;
        n1 = n2;
        n2 = sum;
        //console.log('fibonacci series: '+ n2);
        i += 1;
    }
    return n2
}
let n = 10
console.log('fibonacci displayed the last iteration: '+ testFibonacci(n));




// Trail2 =>
/* fibonacci number is 10
[0, 1, 2, 3, 4, 5, 6,  7, 8,  9] this is array position
[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]


The initial two value are declared: initial =0; initial =1;
iteration start from 2
0+1 = 1
1+1 = 2
1+2 = 3
2+3 = 5
3+5 = 8
5+8 = 13
8+13 = 21
13+21 = 34


y = y-1 + y-2;
*/


let fibonacciSeries = (m)=>{
    let initial = new Array(m);
    initial.fill(0);
    initial[0] = 0;
    initial[1] = 1;
    for(let y =2; y < m; y++){
        initial[y] = initial[y - 1] + initial[y - 2];      
    }
    return initial;
}
let m = 10;
console.log('fibonacci displayed the series: ' + fibonacciSeries(m));


