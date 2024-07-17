
// javascript functions

// Function Declaration 
const double = (number) => {
    return number * 2;
}
let number = 34;
console.log(double(number));


// Arrow Function
let anonymousTest = () => {
    console.log('The anonymous test is passed today.');
}
anonymousTest();

// Anonymous Function 
function primaryFunction(){
    console.log('This message is delayed by 2 seconds');
}
setTimeout(primaryFunction, 2000);


// Callback function
// trail 1
function getUserData(callback){
    var name;
    var age;
    setTimeout((name, age)=>{
        name = "Kumar"
        age = 34
        return name, age;
    }, 1500, callback(name, age));


}


function userDetails(name, age){
    console.log("UserName: " + name + " UserAge: " + age);
}
getUserData(userDetails);






// trail 2

/* function fetchData(name, age, getUserData1){
    var name = "Kumar";
    var age = 34;
    getUserData1(name, age);
}


function getUserData2(name, age) {
    console.log("UserName: " + name + " UserAge: " + age);
}


setTimeout(fetchData, 2000, getUserData2); */

