//  Grade Calculation
// switch statements in JavaScript to categorize data based on multiple conditions.

function evaluateStudentGrade(getMarks) {
    let getGrade;
    switch (true) {
        case (getMarks > 90):
            getGrade = "A+"
            console.log("You got " +  getGrade + " grade and scored  " + getMarks);
            break;
        case (getMarks <=90 && getMarks >=80):
            getGrade = "A"
            console.log("You got " +  getGrade + " grade and scored  " + getMarks);
            break;
        case (getMarks <=80 && getMarks >=70):
            getGrade = "B+"
            console.log("You got " +  getGrade + " grade and scored  " + getMarks);
            break;
        case (getMarks <=70 && getMarks >=60):
            getGrade = "B"
            console.log("You got " +  getGrade + " grade and scored  " + getMarks);
            break;
        case (getMarks <=60 && getMarks >=50):
            getGrade = "C"
            console.log("You got " +  getGrade + " grade and scored  " + getMarks);
            break;
        case (getMarks <=50 && getMarks >=40):
            getGrade = "D"
            console.log("You got " +  getGrade + " grade and scored  " + getMarks);
            break;
        default:
            console.log(getMarks + 'mark does not come under any grade ');
            break;
    }
}

var inputMark = 81;
evaluateStudentGrade(inputMark);
