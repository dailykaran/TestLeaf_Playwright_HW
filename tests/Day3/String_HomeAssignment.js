
// Given a string s consisting of words and spaces, return the length of the last word in the string.
// Example 1:trail1
let s = "Hello World";
let getSplit = s.split(" ");
console.log(`${getSplit[1].length}`);


// Example 1:trail2
let s2 = "Hello, testing world";
s2 = s2.split(" ");
console.log('The last word length is ' + `${s2[s2.length - 1].length}`);




// Example 2: trail1
let es = " fly me  to the  moon ";
let sTrim = es.trim(); //It's trim the sentence from start and end;
console.log(sTrim);


let sTrimReplace = sTrim.replace(/ +/g, " "); // Search for a blank space in the sentence and then replace it with a single space. g -global, / +/ - search
sTrimReplace = sTrimReplace.split(" ");
console.log(sTrimReplace);
console.log('The last word length is ' + `${sTrimReplace[sTrimReplace.length - 1].length}`);


// Example 3:
/* Bubblesort learned from website. In array: comparing to the neighbor's value and then swapping positions.
Sort happens in ascending/alphabetical order.
*/
function sortString(arrayLetters) {
    let n = arrayLetters.length;
    for (let i = 0; i < n-1; i++)
        for (let j = 0; j < n-i-1; j++)  // larger value moved to last position
            if (arrayLetters[j] > arrayLetters[j+1]) {
                let temp = arrayLetters[j];              // value swapping the positions
                arrayLetters[j] = arrayLetters[j+1];
                arrayLetters[j+1] = temp;
            }          
    return arrayLetters;
}


function getAnagrams(word1, word2){
    let text1;
    let text2;
    text1 =  sortString(word1.split(""));
    text2 =  sortString(word2.split(""));
    if(text1.join() === text2.join()){   // comparing two strings are anagrams.
        return console.log("the anagram word is " + true);
    }else{
        return console.log("the anagram word is " + false);
    }
}


// Anagrams occur when two words are sorted in an array and the return values are in the same place.
let getWords = " Listen, SILENT ";  // input anagrams
getAnagrams(getWords.trim().split(",")[0].toLowerCase(), getWords.trim().split(",")[1].toLowerCase().trim());
