

class WaitUtility{

    waitForPageUrlLoad(pageURL){
        browser.waitUntil(()=>{
            return browser.getUrl().includes(pageURL);
        }, 6000)
    }
    
}

module.exports = new WaitUtility();