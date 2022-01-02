const Page = require('./page');

class BookSection extends Page{

    get inputSearchBox() {return $('#searchBox')}
    get btnSearch() {return $('#basic-addon2')}

    get textHeaderImage() {return $("//div[text()='Image']")}
    get textHeaderTitle() {return $("//div[text()='Title']")}
    get textHeaderAuthor() {return $("//div[text()='Author']")}
    get textHeaderPulisher() {return $("//div[text()='Publisher']")}

    get imgBookImages() {return $$("//div[@role='gridcell']/img")}
    get textBookNames() {return $$("//div[@class='action-buttons']/span/a")}
    get textBookAuthors() {return $$("//div[@class='action-buttons']/../following-sibling::div[1]")}
    get textBookPublishers() {return $$("//div[@class='action-buttons']/../following-sibling::div[2]")}
    get btnBookDelete() {return $$("//span[@id='delete-record-undefined']")}

    get btnFooterPrevious() {return $("//button[text()='Previous']")}
    get btnFooterNext() {return $("//button[text()='Next']")}
    get btnFooterCurrentPage() {return $("//div[@class='-pageJump']/input")}
    get btnFooterTotalPages() {return $("//span[@class='-totalPages']")}


    searchBookByName(bookName){
        this.inputSearchBox.waitForDisplayed();
        this.inputSearchBox.setValue(bookName);

        this.btnSearch.waitForDisplayed();
        this.btnSearch.click();

        assert.equal(this.getAllBookNames(1)[0], bookName, "")
    }

    checkBookAfterDeletion(){
        const totalBooks = 0;
        this.btnFooterCurrentPage.waitForDisplayed();

        let bookNames = this.textBookNames;

        browser.waitUntil(()=>{
            bookNames = this.textBookNames;
            return bookNames.length >= totalBooks;
        },6000);

        let names = bookNames.map((name)=>{
            //console.log("Hello World---->",name.getText());
                return name.getText();
        })
        //console.log("Hello Salim---->",names);
        return names;
    }

    getAllBookNames(){
        const totalBooks = 1;
        this.btnFooterCurrentPage.waitForDisplayed();

        let bookNames = this.textBookNames;

        browser.waitUntil(()=>{
            bookNames = this.textBookNames;
            return bookNames.length >= totalBooks;
        },6000);

        let names = bookNames.map((name)=>{
            //console.log("Hello World---->",name.getText());
             return name.getText();
        })
        //console.log("Hello Salim---->",names);
        return names;
    }

    searchBookByAuthorName(authorName){
        this.inputSearchBox.waitForDisplayed();
        this.inputSearchBox.setValue(authorName);

        this.btnSearch.waitForDisplayed();
        this.btnSearch.click();

        assert.equal(this.getAllBookAuthors()[0], authorName, "Author Name is not appear in search")
    }

    getAllBookAuthors(){
        const totalBooks = 1;
        let bookAuthors = this.textBookAuthors;

        browser.waitUntil(()=>{
            bookAuthors = this.textBookAuthors;
            return bookAuthors.length >= totalBooks;
        },6000);

        let authors = bookAuthors.map((author)=>{
            return author.getText()
        })

        return authors;
    }

    searchBookByPublisherName(publisherName){
        this.inputSearchBox.waitForDisplayed();
        this.inputSearchBox.setValue(publisherName);

        this.btnSearch.waitForDisplayed();
        this.btnSearch.click();

        assert.equal(this.getAllBookPublishers()[0], publisherName, "Publisher Name is not appear in search")
    }

    getAllBookPublishers(){
        const totalBooks = 1;
        let bookPublishers = this.textBookPublishers;

        browser.waitUntil(()=>{
            bookPublishers = this.textBookPublishers;
            return bookPublishers.length >= totalBooks;
        },6000);

        let publishers = bookPublishers.map((publisher)=>{
            return publisher.getText();
        })

        return publishers;
    }

    deleteBookByName(bookName){
        this.inputSearchBox.waitForDisplayed();
        this.inputSearchBox.setValue(bookName);

        this.btnSearch.waitForDisplayed();
        this.btnSearch.click();

        this.getAllBookDeleteButton()[0].click();

        assert.equal(this.getAllBookNames(1)[0], bookName, "")
    }

    getAllBookDeleteButton(){
        //browser.pause(1000);
        return this.btnBookDelete;
    }

    selectBookByName(bookName){
        this.searchBookByName(bookName);
        this.clickFirstBook();
    }

    selectBookByAuthorName(authorName){
        this.searchBookByAuthorName(authorName);
        this.clickFirstBook();
    }

    selectBookByPublisherName(publisherName){
        this.searchBookByPublisherName(publisherName);
        this.clickFirstBook();
    }

    clickFirstBook(){
        this.clickBookByIndex(0);
    }

    clickBookByIndex(index){
        let bookName = this.textBookNames;
        browser.waitUntil(()=>{
            bookName = this.textBookNames;
            return bookName.length >= index
        }, 6000)
        bookName[index].click();
    }

    sortBooksTitleAsAscending(){
        let bookTitle = this.textHeaderTitle.parentElement();

        browser.waitUntil(()=>{
            this.textHeaderTitle.click();
            return bookTitle.getAttribute("class").includes("-asc")
        },6000);
    }

    sortBooksTitleAsDescending(){
        let bookTitle = this.textHeaderTitle.parentElement();

        browser.waitUntil(()=>{
            this.textHeaderTitle.click();
            return bookTitle.getAttribute("class").includes("-desc")
        },6000);
    }

    sortBooksAuthorAsAscending(){
        let bookAuthor = this.textHeaderAuthor.parentElement();

        browser.waitUntil(()=>{
            this.textHeaderAuthor.click();
            return bookAuthor.getAttribute("class").includes("-asc")
        },6000);
    }

    sortBooksAuthorAsDescending(){
        let bookAuthor = this.textHeaderAuthor.parentElement();

        browser.waitUntil(()=>{
            this.textHeaderAuthor.click();
            return bookAuthor.getAttribute("class").includes("-desc")
        },6000);
    }

    //textHeaderPulisher
    sortBooksPulisherAsAscending(){
        let bookPulisher = this.textHeaderPulisher.parentElement();

        browser.waitUntil(()=>{
            this.textHeaderPulisher.click();
            return bookPulisher.getAttribute("class").includes("-asc")
        },6000);
    }

    sortBooksPulisherAsDescending(){
        let bookPulisher = this.textHeaderPulisher.parentElement();

        browser.waitUntil(()=>{
            this.textHeaderPulisher.click();
            return bookPulisher.getAttribute("class").includes("-desc")
        },6000);
    }
}

module.exports = new BookSection();