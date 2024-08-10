


enum Environment {
    local = "Sprint",
    development = "Pair_Programming",
    Staging = "QA_Release",
    Production = "Live_Release"
}

function runTests(environment: Environment): void{
    console.log(`This test suite is executed for ${environment} purpose.`);
}

runTests(Environment.local);
runTests(Environment.Production);
runTests(Environment.Staging);
runTests(Environment.development);

