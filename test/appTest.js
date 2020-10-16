// This is the basic unit test for the app, it is based on Mocha and Chai(for assertions)
// npm install mocha chai --save-dev

// Import Chai for assertions.
const assert = require('chai').assert;
const expect = require('chai').expect;
// Import app.js
//const app = require('../app');
// Import twitter function, uut stands for unit under test
const uutFuncTwit = require('../app.js').funcTwit;
// Import GitHub function
const uutFuncGithub = require('../app').funcGitHub;

// Create test for app.js
describe('App', function(){
    // Test 1
    it('Test 1: Twitter API function should return Promise',function(){
        // call the uut
        console.log("Test statring");
        let result = uutFuncTwit("zain");
        console.log(result);
        //console.log(typeOf(result));
        assert.typeOf(result, 'Promise');
    });
/*
    // Test 2
    it('Test 2: Twitter test search twUsername should be Zain uddin', (done)=>{
        let result = uutFuncTwit;
        result
            .then((res) =>
            {
                //twData = res;
                twData = res[0].twUsername;
                // console.log(res);
                assert.equal(twData,"Zain uddin");
                done();
            })
            .catch((err) => {
                console.log("Error: ", err );
                done(err)
            });
    });

    // Test 3: Passed and search for Reactive projects
    it('Test 3: GitHub Function Test', (done)=>{
        let result = uutFuncGithub;
        result
            .then((res) =>
            {
                //console.log(typeof(res));
                assert.equal(res,'[{"gitHubProjectName":"direct2DConvPy","githubProjectDesccription":"Direct 2D Conv on Multiple Inputs/Channels and Kernels.","twitterData":[{"twUsername":"Zain uddin","twText":"direct2DConvPy, wow what a project"}]}]');
                done();
            })
            .catch((err) => {
                console.log("Error: ", err );
                done(err)
            });
    }).timeout(10000);       // Wait for 5 seconds in case of no response or a delay in response.
*/
});
