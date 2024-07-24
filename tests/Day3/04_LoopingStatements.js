//Looping Statements: JavaScript function named `printOddNumbers` that prints odd numbers between 1 and 2

function printOddNumbers(){
    
    for( let i =1; i <=25; i++){
        let getmodulo = i % 2;
        //let getListOdd = [ ];
        if(getmodulo == 1){
            console.log(i + " is an odd number." );
            //getListOdd.push(i);
            //console.log(getListOdd);               
        }
    }
}
printOddNumbers();
