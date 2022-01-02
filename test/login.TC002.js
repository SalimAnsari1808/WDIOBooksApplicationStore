const LoginPage = require('../pageobjects/login.page');
const LoginData = require('../testData/login.data');
const { assert } = require('chai');

describe("Verify Logout functionality", ()=>{

    it("Log out from the profile",()=>{
        global.logoutFlag = false;
        // Step1	Launch the URL:- https://demoqa.com/login
        LoginPage.open();

        // Step2	Enter the valid user name
        // Step3	Enter the valid password
        // Step4	Click on login button
        LoginPage.login(LoginData.usename, LoginData.password);

        // Step5	Click on log out button
        LoginPage.logout();
    });
});     