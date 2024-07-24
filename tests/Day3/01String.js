// reverse a string and check that word as Palindrome 

let companyName = "refer";

function reverseTest() {
    let char = companyName.split("");
    //console.log(char);
    let reverse = " "
    for(let index = char.length-1; index >= 0; index--){
        reverse = reverse + char[index]
    }
    return reverse;
}

function checkPalindrome(palindromeWords){
    //if(palindromeWords === companyName ){
    //or
    if(palindromeWords.includes(companyName) ){
        return console.log("Both word are same and return " + true);
    }else{
        return console.log("Both word are same and return " + false);
    }
}

let palindromeWords = reverseTest();
checkPalindrome(palindromeWords.trim());

