const browserVersion = "Chrome"
console.log(browserVersion);


function getBrowserVersion(){
    var browserVersion;
    if(browserVersion === "Chrome"){
        browserVersion = 130
        console.log("The chrome browser version is " + browserVersion);
    }else{
        console.log("You are not using the Chrome browser");
    }
    console.log("Chrome Browser version is " + browserVersion );
}
getBrowserVersion();
