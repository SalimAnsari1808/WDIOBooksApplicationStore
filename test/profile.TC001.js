const LoginPage = require('../pageobjects/login.page');
const BookStorePage = require('../pageobjects/bookStore.page');
const ProfilePage = require('../pageobjects/profile.page')
const BookSection = require('../pageobjects/bookSection.page')
const LoginData = require('../testData/login.data');
const { assert } = require('chai');

describe("Veify Delete Book functionality on Profile Page",()=>{

    it("Delete all books in once from profile",()=>{

        const selectedBooks = ["Git Pocket Guide", "Learning JavaScript Design Patterns", "Designing Evolvable Web APIs with ASP.NET",
        "Speaking JavaScript", "You Don't Know JS"];

        // Step1	Launch the URL:- https://demoqa.com/login
        LoginPage.open();

        // Step2	Enter the valid user name
        // Step3	Enter the valid password
        // Step4	Click on login button
        LoginPage.login(LoginData.usename, LoginData.password);

        // Step5	Now click on book store button
        ProfilePage.clickGoToBookStore();
        BookStorePage.waitForPageLoad();

        // step6	Add Multiple Book to Profile
        selectedBooks.forEach((value)=>{
            BookSection.selectBookByName(value);
            BookStorePage.addNewBookToCollection();
            BookStorePage.clickBackToBookStore();
        })

        //verify books are added on Profile Page
        ProfilePage.goToProfilePage();
        const allBookNames = BookSection.getAllBookNames();
        assert.equal[selectedBooks, allBookNames];
        
        //post condition Delete all Books
        ProfilePage.deleteAllBooks();

        assert.isTrue(BookSection.checkBookAfterDeletion().length ==0);
    })

    it("Dlete the books one by one from profile",()=>{

        const selectedBooks = ["Git Pocket Guide", "Learning JavaScript Design Patterns", "Designing Evolvable Web APIs with ASP.NET",
        "Speaking JavaScript", "You Don't Know JS"];

        // Step1	Launch the URL:- https://demoqa.com/login
        LoginPage.open();

        // Step2	Enter the valid user name
        // Step3	Enter the valid password
        // Step4	Click on login button
        LoginPage.login(LoginData.usename, LoginData.password);

        // Step5	Now click on book store button
        ProfilePage.clickGoToBookStore();
        BookStorePage.waitForPageLoad();

        // step6	Add Multiple Book to Profile
        selectedBooks.forEach((value)=>{
            BookSection.selectBookByName(value);
            BookStorePage.addNewBookToCollection();
            BookStorePage.clickBackToBookStore();
        })

        //verify books are added on Profile Page
        ProfilePage.goToProfilePage();
        const allBookNames = BookSection.getAllBookNames();
        assert.equal[selectedBooks, allBookNames];
        
        //post condition Delete all Books
        selectedBooks.forEach((value)=>{
            ProfilePage.deleteBookByName(value);
        })
    })
})