// if-else and switch case


function launchBrowser(browserName){
    //let browserName = nameOfBrowser;
    if ( browserName === "Chrome"){
        console.log("Yes, You are using the Chrome");
    }else{
        console.log("No, You are using the " + browserName + " browser");
    }
}
launchBrowser("chrome");


function runTests(testType){
    switch (testType) {
        case "smoke":
            console.log("You are running the " + testType + " type");
            break;
        case "sanity":
            console.log("You are running the " + testType + " type");
            break;
        case "regression":
            console.log("You are running the "+ testType + " type");
            break;
        default:
            console.log("You are running the "+ testType + "t ype" );
            break;
    }
}
let testType = "regression"
runTests(testType);
