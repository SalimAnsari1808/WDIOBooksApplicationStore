const { assert } = require('chai');
const Page = require('./page');
const AlertUtility = require('../utility/AlertUtil');
const WaitUtility = require('../utility/waitUtil');
const BookSection = require('../pageobjects/bookSection.page')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProfilePage extends Page {
    /**
     * define selectors using getter methods
     */
    get lnkProfilePage() { return $("//span[text()='Profile']")}
    
    get btnGoToBookStore() { return $("//button[text()='Go To Book Store']")}
    get btnDeleteAccount() { return $("//button[text()='Delete Account']")}
    get btnDeleteAllBooks() { return $("//button[text()='Delete All Books']")}

    get textModelHeader() { return $("//div[@class='modal-header']/div")}
    get btnModelHeaderClose() { return $("//div[@class='modal-header']/button")}
    get textModelBody() { return $("//div[@class='modal-body']")}
    get btnModelFooterOk() { return $('#closeSmallModal-ok')}
    get btnModelFooterCancel() { return $('#closeSmallModal-cancel')}


    goToProfilePage(){
        this.lnkProfilePage.scrollIntoView();
        this.lnkProfilePage.click();

        WaitUtility.waitForPageUrlLoad("profile");

        assert.include(browser.getUrl(), "profile", "Profile Page not appear on Application");
    }

    waitForPageLoad(){
        browser.waitUntil(()=>{
            return this.getMainHeaderText()==='Profile';
        },6000)
    }

    clickGoToBookStore(){
        this.btnGoToBookStore.waitForDisplayed();
        this.btnGoToBookStore.scrollIntoView();
        this.btnGoToBookStore.click();

        WaitUtility.waitForPageUrlLoad("books");
        
        assert.equal(this.getMainHeaderText(), "Book Store");
    }

    clickDeleteAccount(){
        this.btnDeleteAccount.waitForDisplayed();
        this.btnDeleteAccount.scrollIntoView();
        this.btnDeleteAccount.click();
    }

    clickDeleteAllBooks(){
        this.btnDeleteAllBooks.waitForDisplayed();
        this.btnDeleteAllBooks.scrollIntoView();
        this.btnDeleteAllBooks.click();

        this.textModelHeader.waitForDisplayed();

        assert.isTrue(this.textModelHeader.isDisplayed());
    }

    checkModelHeaderText(){
        this.textModelHeader.waitForDisplayed();
        const headerText = this.textModelHeader.getText();

        assert.equal(headerText, "Delete All Books");
    }

    clickModelHeaderCloseButton(){
        this.btnModelHeaderClose.waitForDisplayed();
        this.btnModelHeaderClose.click();

        assert.isNotTrue(this.btnModelHeaderClose.isDisplayed());
    }

    checkModelBody(){
        this.textModelBody.waitForDisplayed();

        const bodyText = this.textModelBody.getText();

        assert.equal(bodyText, "Do you want to delete all books?");
    }

    clickModelFooterOkButton(){
        this.btnModelFooterOk.waitForDisplayed();
        this.btnModelFooterOk.click();

        assert.isNotTrue(this.btnModelFooterOk.isDisplayed());
    }

    clickModelFooterCancelButton(){
        this.btnModelFooterCancel.waitForDisplayed();
        this.btnModelFooterCancel.click();

        assert.isNotTrue(this.btnModelFooterCancel.isDisplayed());
    }

    verifyAllBooksDeleted(){
        AlertUtility.verifyAllBookDeletedAlertText();
    }

    deleteAllBooks(){
        this.clickDeleteAllBooks();
        this.clickModelFooterOkButton();
        AlertUtility.verifyAllBookDeletedAlertText();
    }

    deleteBookByName(bookName){
        BookSection.inputSearchBox.waitForDisplayed();
        BookSection.inputSearchBox.setValue(bookName);

        BookSection.btnSearch.waitForDisplayed();
        BookSection.btnSearch.click();

        BookSection.getAllBookDeleteButton()[0].click();

        this.clickModelFooterOkButton();
        AlertUtility.verifySingleBookDeleteAlertText();

        BookSection.inputSearchBox.waitForDisplayed();
        BookSection.inputSearchBox.setValue(bookName);

        BookSection.btnSearch.waitForDisplayed();
        BookSection.btnSearch.click();

        assert.isTrue(BookSection.checkBookAfterDeletion().length==0)

        BookSection.inputSearchBox.waitForDisplayed();
        BookSection.inputSearchBox.setValue("");

        BookSection.btnSearch.waitForDisplayed();
        BookSection.btnSearch.click();
    }
}

module.exports = new ProfilePage();
