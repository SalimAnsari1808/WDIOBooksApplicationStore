const { assert } = require('chai');
const Page = require('./page');
const ProfilePage = require('../pageobjects/profile.page');
const WaitUtility = require('../utility/waitUtil');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */

    get inputUsername() { return $('#userName') }
    get inputPassword() { return $('#password') }
    get btnSubmit() { return $('#login') }
    get textLoggedUser() { return $('#loading-label')}

    get textUsernameValue() { return $('#userName-value')}
    get btnLogout() { return $('#submit')}

    get textErrorMessage() { return $('#name')}

    get lnkLoginPage() { return $("//span[text()='Login']")}

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    login (username, password) {
        this.inputUsername.setValue(username);
        this.inputPassword.setValue(password);
        this.btnSubmit.click(); 
        ProfilePage.waitForPageLoad();

        this.textUsernameValue.waitForDisplayed();
    }

    loginError(username, password){
        this.inputUsername.setValue(username);
        this.inputPassword.setValue(password);
        this.btnSubmit.click(); 
    }

    /**
     * overwrite specifc options to adapt it to page object
     */
    open () {
        return super.open('/login');
    }

    /**
     * Wait till main header Login is displayed 
     */
    waitForPageLoad(){
        browser.waitUntil(()=>{
            return this.getMainHeaderText()==='Login';
        },6000)
    }

    goToLoginPage(){
        this.lnkLoginPage.scrollIntoView();
        this.lnkLoginPage.click();

        WaitUtility.waitForPageUrlLoad("login");

        assert.include(browser.getUrl(), "login", "Login Page not appear on Application");
    }

    getLoggedInUser(){
        this.textUsernameValue.waitForDisplayed();
        return this.textUsernameValue.getText();
    }

    getLoginError(){
        this.textErrorMessage.waitForDisplayed();
        return this.textErrorMessage.getText();
    }

    logout(){
        this.btnLogout.waitForDisplayed();
        this.btnLogout.scrollIntoView();
        this.btnLogout.click();

        this.inputUsername.waitForDisplayed();
        
        assert.isTrue(this.inputUsername.isDisplayed());
    }
}

module.exports = new LoginPage();
