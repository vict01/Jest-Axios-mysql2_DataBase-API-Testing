<h1 style="font-weight: bold;">
  <center>Automation Framework for Backend and Database Testing</center>
</h1>

<p align="left" style="font-size: 1.2rem; font-weight: bold;">
  This framework is made up mostly of the following tools
</p>

```
1. Jest: JS Framework used to write tests for unit and/or backend testing.
2. mysql2: MySQL connector library used by Sequelize to connect to the DB server.
3. axios: JS library used for handling HTTP requests. 
```

<p align="left" style="font-size: 1.2rem; font-weight: bold;"> Framework Structure </p>

##
The structure of this framework consists mainly of the following folders/files

1. `_tests_`: Folder that contains the test files that encompases the scenarios to be executed.backend.
2. `data`: Folder that contains JSON files where is writen the data imported from DB, and other data to be consumed.
3. `resources`: Folder that contains configuration files required to connect to the DB and set the tests up.
4. `env.file.template.json`: File that should contain the configuration based on which the test will be executed.
5. `jest.config.js` and `setupTests.js`: Files that contain general configuration regarding how the framework behaves.
##

<p align="left" style="font-size: 1.2rem; font-weight: bold;"> Requirements to run the test </p>

- Open a terminal console and make sure you are in the root path of the project, and run the command below to install dependencies.
   - `npm i`
- Go to the package.json file and update the *AWS_PROFILE* variable within the script _set:profile_ according which env you're gonna use (test, dev or prod).
- To load the AWS_PROFILE, run:
   - `npm run set:profile`
>Alternatively you can update the env constant in the `setupTests.js` file under the same premise as the AWS_PROFILE variable.

- Clone and rename the file env.file.template.json according each path mentioned in the `setupTests.js` file, then populate variables as appropriate for each file. 
- If you need to update your AWS credentials, do it by pasting in the termnal the commands provided by your Set AWS environment variables for terminal console.
   
<p align="left" style="font-size: 1.2rem; font-weight: bold;"> How to run the test </p>

- To run all the tests, run
   - `npm t`

- To run only a specific test file
   - Open the package.json file
   - Go to "filtered" within the section scripts
   - Replace the name of the test file on the right of --testMatch=**/
   - Save changes
   - run:\
     `npm run filtered`

- To run only tests that use local connection:
   - Creat your test file starting with the word "local" and run:\
     `npm run local`

- To run only tests that use remote connection:
   - Creat your test file starting with any word other than "local" and run:\
     `npm run remote`

- To run only any specific test suite or test
   - Add the word ".only" after the word "describe" or "test" as appropriate.

- To skip any specific test suite or test
   - Add the word ".skip" after the word "describe" or "test" as appropriate.

- To omit any specific test file
   - Change the name of the file by adding .txt at the end
  >Alternatively you can also make use of the argument testPathIgnorePatterns in the `package.json` how it's done in the remote command.