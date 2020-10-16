# Github and Twitter API Mashup
# Designer : Zain Uddin
contact: uddin.zain@gmail.com

## Objective

A simple command line API mashup of GitHub and Twitter APIs. 
Search for "any" projects on GitHub, then for each project search for tweets that mention it 
so we can see what was said about the project and who said it. The output is a summary 
of each project with a short list of recent tweets, in JSON format.

# User guide
1- We need to have twitter API keys in order to access this code. Add .env file in the project with your private keys in the following format.

TWITTER_APP_API_KEY= asdfsghfgdsadfghjg

TWITTER_APP_API_SECRET= dfghfjgdsafsghjgfdsafghj

TWITTER_APP_BEARER_TOKEN= 1324567hgdfsghjkhhgfdafgdhbfnjgm

2- The code is currently hardcoded to search projects with the name "Reactive", you can modify line number 28 of app.js to search any project names

strSearchGithubProjects = "anyProjectNamesOnGitHub";

3- Currently, I am only rendering 10 project names due to twitter limitations. You can rendor more by modifying "per_page" parameter on line 38 of app.js

let results = await octokit.search.repos({ q: strSearchGithubProjects, per_page: 10 });     // replace 10 by higher or lower numbers.

4- To run the code, type "npm start" in the terminal.


# Unit Testing
I have provided some basic Unit Testing for the functions using Mocha and Chia based Assertions.
You can pull developZain branch and run 'npm run test' to run the Unit Testing.
