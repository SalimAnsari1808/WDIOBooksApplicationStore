

class AlertUtility{

    waitForAlert(){
        browser.waitUntil(()=>{
            try {
                browser.getAlertText();
                return true;
            } catch (error) {
                return false;
            }
        }, 6000);
    }

    verifyAlertText(alertText){
        this.waitForAlert();
        assert.include(browser.getAlertText(),alertText);

        browser.acceptAlert();
    }

    verifyAddedBookAlertText(){
        this.verifyAlertText("Book added to your collection.");
    }
    
    verifyDuplicateBookAlertText(){
        this.verifyAlertText("Book already present in the your collection!");
    }
    
    verifyAllBookDeletedAlertText(){
        this.verifyAlertText("All Books deleted.");
    }

    verifySingleBookDeleteAlertText(){
        this.verifyAlertText("Book deleted.");
    }
}

module.exports = new AlertUtility();