console.log('Welcome to GitHub-Twitter API Mashup  ');
//
const express = require('express');
const web = express();          // init express framework
const port = 8000;
// Import env to load local and secret api keys.
// Store api keys and secret keys in .env file
require('dotenv').config();

// Import the Octokit constructor
// Octokit is an official clients for the GitHub API
// npm i @octokit/rest --save
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit();

// Import the twitter npm package
// npm install twitter --save
const twit = require('twitter');

//  Twitter API Constructor
const twitter = new twit({
    consumer_key:         process.env.TWITTER_APP_API_KEY,
    consumer_secret:      process.env.TWITTER_APP_API_SECRET,
    bearer_token:         process.env.TWITTER_APP_BEARER_TOKEN
  })


  // Run the funcGitHub program based on the string (strSearchGithubProjects)
  // Search for the projects on Github with the name strSearchGithubProjects
  // Look for the tweets related to the found projects
  strSearchGithubProjects = "Reactive";
  //funcGitHub(strSearchGithubProjects);

  async function funcGitHub(strSearchGithubProjects){
    var totalProjects = 0;
    var projName;
    var projDescription;
    var projData=[];
    var twData;
      try{
        let results = await octokit.search.repos({ q: strSearchGithubProjects, per_page: 10 });
        totalProjects =results.data.items.length;
        //console.log(totalProjects);
        //console.log(results);
        //console.log(results.data.items[1].full_name)
        //console.log(results.data.items[1].description)
        if(totalProjects<=0)
        {
          console.log("Github API Error: No results found for this search, Please Try Again");
          throw new Error("Github API Testing Error")
        }
        else{
            for (var i =0; i<totalProjects ;i++){
                // Store the full name of the project
                //console.log(results.data)
                projName = results.data.items[i].name;
                // Store the Description of the project
                projDescription=results.data.items[i].description;

                //console.log(projName);
                //console.log(projDescription);
                // Pass the name to Twit API to get tweets related to this project
                // await is required here, because Twitter API will take some time until the callback
                await funcTwit(projName)
                // When Promise is returned with Reselove, .then method will execute
                .then((res) =>  twData = res)
                // When Promise is returned with Reject, .catch method will execute and hence error will appear on the console about twitter API.
                .catch((err) => {
                    twData = "No Tweets are rendored, Twitter API Error"
                    console.log("Twitter API Error: ", err );
                });

                //console.log(twData);
                // Store gitHub projName, projDescription and related tweets in an array.

                var reqJson = {
                    "gitHubProjectName":projName,
                    "githubProjectDesccription":projDescription,
                    "twitterData":twData
                }
                projData.push(reqJson);

            }
            //console.log(JSON.stringify(projData));
            return JSON.stringify(projData);
        }

      }
      catch(error){ console.log("GitHub API Error : ",error);}
  }


// This function takes in 1 parameter, projName
// It returns the tweets related to the projName string.

function funcTwit (projName) {
    return new Promise((resolve, reject) => {
        twitter.get('search/tweets', {
            q: projName,
            count: 10
        })
            .then(res => {
                var tweets = res.statuses;
                // If no tweets are found return an empty array
                //console.log(tweets.length);
                if(tweets.length<=0){ return resolve("No Tweets Found for this gitHub Project"); }
                else{
                    var tweetsData= [];
                    // Populate all of the tweets and return (Twitter usernames and tweet texts) in an array
                    for (var i = 0; i < tweets.length; i++) {
                    var twUsername = tweets[i].user.name;
                    var twText = tweets[i].text;
                    var reqJson = {
                        "twUsername":twUsername,
                        "twText":twText
                    }
                    tweetsData.push(reqJson);
                    }
                    //return resolve(JSON.stringify(tweetsData));
                    return resolve(tweetsData);
                };

            })
            .catch(err => {return reject(err);});
    });
}
/*
funcTwit("nortonlifelock")
// When Promise is returned with Reselove, .then method will execute
.then((res) =>  {
  twData = res;
  console.log(res)
})
// When Promise is returned with Reject, .catch method will execute and hence error will appear on the console about twitter API.
.catch((err) => {
    twData = "No Tweets are rendored, Twitter API Error"
    console.log("Twitter API Error: ", err );
});
*/
exports.funcTwit = funcTwit;
exports.funcGitHub = funcGitHub;


web.listen(port, () => {
  console.log('Node Server Started');
})
