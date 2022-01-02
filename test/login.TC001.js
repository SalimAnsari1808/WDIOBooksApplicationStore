const LoginPage = require('../pageobjects/login.page');
const BookStorePage = require('../pageobjects/bookStore.page');
const ProfilePage = require('../pageobjects/profile.page')
const BookSection = require('../pageobjects/bookSection.page')
const LoginData = require('../testData/login.data');
const { assert } = require('chai');


describe("Verify Login functionality",()=>{
    it("Login with valid username and Password",()=>{
        //Step1	Launch the URL:- https://demoqa.com/login
        LoginPage.open();

        //Step2	Enter the valid user name
        //Step3	Enter the valid password
        //step4	Click on login button
        LoginPage.login(LoginData.usename, LoginData.password);

        //step5	Verify the user logged in successfully
        assert.equal(LoginPage.getLoggedInUser(), LoginData.usename);
    });

    it("Login with invalid username and valid Password",()=>{
        global.logoutFlag = false;
        //Step1	Launch the URL:- https://demoqa.com/login
        LoginPage.open();

        //Step2	Enter the invalid user name
        //Step3	Enter the valid password
        //step4	Click on login button
        LoginPage.loginError("Invalid", LoginData.password);

        //step5 Invalid username or password message appear
        assert.equal(LoginPage.getLoginError(),LoginData.loginError);
    });

    it("Login with valid username and invalid Password",()=>{
        global.logoutFlag = false;
        //Step1	Launch the URL:- https://demoqa.com/login
        LoginPage.open();

        //Step2	Enter the valid user name
        //Step3	Enter the invalid password
        //step4	Click on login button
        LoginPage.loginError(LoginData.usename, "Invalid");

        //step5 Invalid username or password message appear
        assert.equal(LoginPage.getLoginError(),LoginData.loginError);
    });

    it("login with blank credentials",()=>{
        global.logoutFlag = false;
        // Step1	Launch the URL:- https://demoqa.com/login
        LoginPage.open();

        // Step2	Do not enter the user name
        // Step3	Do not enter the password
        // step4	Click on login button
        LoginPage.btnSubmit.click();

        // Step5	Hover the mouse on red highligted username section
        // Step6	Hover the mouse on red highligted password section
        usernameColor = LoginPage.inputUsername.getCSSProperty("border-color");
        passwordColor = LoginPage.inputPassword.getCSSProperty("border-color");
   
        assert.equal(usernameColor.parsed.hex, "#dc3545")
        assert.equal(passwordColor.parsed.hex, "#dc3545")
    })
});