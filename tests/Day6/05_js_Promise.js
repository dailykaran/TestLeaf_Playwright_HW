/*
JavaScript Promise
Complete the following tasks to practice creating and handling Promises in JavaScript.


*/






let conditionalPromise = new Promise((resolve, reject) => {
    let ramNum = Math.random();
    if(ramNum > 0.5){
        resolve('Resolved successfully. ' + ramNum)
    }else{
        reject('Rejected ' + ramNum)
    }


}).then((results) => {
    console.log(results);
}).catch((error) => {
    console.log(error);
})


