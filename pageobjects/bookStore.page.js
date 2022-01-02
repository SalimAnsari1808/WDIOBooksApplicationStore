const { assert } = require('chai');
const Page = require('./page');
const AlertUtility = require('../utility/AlertUtil');
const WaitUtility = require('../utility/waitUtil');


class BookStorePage extends Page{

    get lnkBookStorePage() { return $("//span[text()='Book Store']")}

    get btnBackToBookStore() {return $("//button[text()='Back To Book Store']")}
    get btnAddToYourCollection() {return $("//button[text()='Add To Your Collection']")}

    goToBookStorePage(){
        this.lnkBookStorePage.scrollIntoView();
        this.lnkBookStorePage.click();

        WaitUtility.waitForPageUrlLoad("books");
        this.waitForPageLoad();

        assert.include(browser.getUrl(), "books", "Book Store Page not appear on Application");
    }

    /**
     * Wait till main header Book Store is displayed 
     */
    waitForPageLoad(){
        browser.waitUntil(()=>{
            return this.getMainHeaderText()==='Book Store';
        },6000);

        assert.equal(this.getMainHeaderText(),'Book Store')
    }

    /**
     * Wait till main header Book Store is displayed 
     */
  
    clickBackToBookStore(){
        this.btnBackToBookStore.scrollIntoView();
        this.btnBackToBookStore.click();

        WaitUtility.waitForPageUrlLoad("books");

        assert.include(browser.getUrl(), "books", "Book Store Page not appear on Application");
    }

    addNewBookToCollection(){
        this.btnAddToYourCollection.waitForDisplayed();
        this.btnAddToYourCollection.scrollIntoView();
        this.btnAddToYourCollection.click();

        AlertUtility.verifyAddedBookAlertText();
    }

    addDuplicateBookToCollection(){
        this.btnAddToYourCollection.waitForDisplayed();
        this.btnAddToYourCollection.scrollIntoView();
        this.btnAddToYourCollection.click();

        AlertUtility.verifyDuplicateBookAlertText();
    }

}

module.exports = new BookStorePage();