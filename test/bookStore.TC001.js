const LoginPage = require('../pageobjects/login.page');
const BookStorePage = require('../pageobjects/bookStore.page');
const ProfilePage = require('../pageobjects/profile.page')
const BookSection = require('../pageobjects/bookSection.page')
const LoginData = require('../testData/login.data');
const { assert } = require('chai');

describe("Verify Add Book on Book Store Page",()=>{

    it("Add single books on Book Store Page",()=>{

        const firstBookName = "Git Pocket Guide";

        // Step1	Launch the URL:- https://demoqa.com/login
        LoginPage.open();

        // Step2	Enter the valid user name
        // Step3	Enter the valid password
        // Step4	Click on login button
        LoginPage.login(LoginData.usename, LoginData.password);

        // Step5	Now click on book store button
        ProfilePage.clickGoToBookStore();
        BookStorePage.waitForPageLoad();

        // step6	Enter the book name in search panel
        // Step7	Click on the book name to verify the book details
        BookSection.selectBookByName(firstBookName);
        
        // Step8	Click on Add to collection button to add the book in profile
        // Step9	Click on ok on confirmation alert pop-up
        BookStorePage.addNewBookToCollection();

        //verify booka are added on Profile Page
        ProfilePage.goToProfilePage();
        const allBookNames = BookSection.getAllBookNames();
        //assert.isTrue(allBookNames.includes(firstBookName))
        assert.include(allBookNames, firstBookName)

        //post condition Delete all Books
        ProfilePage.deleteAllBooks();
        
    })

    it("Add multiple books on Book Store Page",()=>{

        const firstBookName = "Git Pocket Guide";
        const secondBookName = "Learning JavaScript Design Patterns";

        // Step1	Launch the URL:- https://demoqa.com/login
        LoginPage.open();

        // Step2	Enter the valid user name
        // Step3	Enter the valid password
        // Step4	Click on login button
        LoginPage.login(LoginData.usename, LoginData.password);

        // Step5	Now click on book store button
        ProfilePage.clickGoToBookStore();
        BookStorePage.waitForPageLoad();

        // step6	Enter the book name in search panel
        // Step7	Click on the book name to verify the book details
        BookSection.selectBookByName(firstBookName);
        
        // Step8	Click on Add to collection button to add the book in profile
        // Step9	Click on ok on confirmation alert pop-up
        BookStorePage.addNewBookToCollection();

        // Step10	Click on back to book store button
        BookStorePage.clickBackToBookStore();

        // Step11	Click on any other book to view the book details
        BookSection.selectBookByName(secondBookName);

        // Step12	Click on Add to collection button to add the book in profile
        // Step13	Click on ok on confirmation alert pop-up
        BookStorePage.addNewBookToCollection();

        //verify booka are added on Profile Page
        ProfilePage.goToProfilePage();
        const allBookNames = BookSection.getAllBookNames();
        assert.isTrue(allBookNames.includes(firstBookName) && allBookNames.includes(secondBookName))

        //post condition Delete all Books
        ProfilePage.deleteAllBooks();
    })

    it("Add duplicate books on Book Store Page",()=>{

        const firstBookName = "Git Pocket Guide";

        // Step1	Launch the URL:- https://demoqa.com/login
        LoginPage.open();

        // Step2	Enter the valid user name
        // Step3	Enter the valid password
        // Step4	Click on login button
        LoginPage.login(LoginData.usename, LoginData.password);

        // Step5	Now click on book store button
        ProfilePage.clickGoToBookStore();
        BookStorePage.waitForPageLoad();

        // step6	Enter the book name in search panel
        // Step7	Click on the book name to verify the book details
        BookSection.selectBookByName(firstBookName);
        
        // Step8	Click on Add to collection button to add the book in profile
        // Step9	Click on ok on confirmation alert pop-up
        BookStorePage.addNewBookToCollection();

        // Step10	Click on back to book store button
        BookStorePage.clickBackToBookStore();

        // Step11	Click on same book to view the book details
        BookSection.selectBookByName(firstBookName);

        // Step12	Click on Add to collection button to add the book in profile
        // Step13	Click on ok on confirmation alert pop-up
        BookStorePage.addDuplicateBookToCollection();

        //verify booka are added on Profile Page
        ProfilePage.goToProfilePage();
        const allBookNames = BookSection.getAllBookNames();
        assert.isTrue(allBookNames.includes(firstBookName) && allBookNames.length == 1)

        //post condition Delete all Books
        ProfilePage.deleteAllBooks();
    })
})