const LoginPage = require('../pageobjects/login.page');
const BookStorePage = require('../pageobjects/bookStore.page');
const ProfilePage = require('../pageobjects/profile.page')
const BookSection = require('../pageobjects/bookSection.page')
const LoginData = require('../testData/login.data');
const { assert } = require('chai');

describe("Verify column Sorting on Book Store Page",()=>{
    it("Title column sorting on Book Store Page",()=>{
        // Step1	Launch the URL:- https://demoqa.com/login
        LoginPage.open();

        // Step2	Enter the valid user name
        // Step3	Enter the valid password
        // Step4	Click on login button
        LoginPage.login(LoginData.usename, LoginData.password);

        // Step5	Now click on book store button
        ProfilePage.clickGoToBookStore();
        BookStorePage.waitForPageLoad();

        // step6	Click on title to sort the books by title
        let beforeSorting = BookSection.getAllBookNames();

        BookSection.sortBooksTitleAsAscending();

        let afterSorting = BookSection.getAllBookNames();
        beforeSorting.sort()
        console.log("Before Sorting--->",beforeSorting);
        console.log("After Sorting--->",afterSorting);

        assert.deepEqual(afterSorting, beforeSorting.sort());
    })

    it("Author column sorting on Book Store Page",()=>{
        // Step1	Launch the URL:- https://demoqa.com/login
        LoginPage.open();

        // Step2	Enter the valid user name
        // Step3	Enter the valid password
        // Step4	Click on login button
        LoginPage.login(LoginData.usename, LoginData.password);

        // Step5	Now click on book store button
        ProfilePage.clickGoToBookStore();
        BookStorePage.waitForPageLoad();

        // step6	Click on title to sort the books by title
        let beforeSorting = BookSection.getAllBookAuthors();
        beforeSorting.sort();

        BookSection.sortBooksAuthorAsAscending();

        let afterSorting = BookSection.getAllBookAuthors();
    
        //console.log("Before Sorting--->",beforeSorting);
        //console.log("After Sorting--->",afterSorting);

        assert.deepEqual(afterSorting, beforeSorting);

        beforeSorting.reverse();

        BookSection.sortBooksAuthorAsDescending();

        afterSorting = BookSection.getAllBookAuthors();
    
        //console.log("Before Sorting--->",beforeSorting);
        //console.log("After Sorting--->",afterSorting);

        assert.deepEqual(afterSorting, beforeSorting);
    })
    
    it("Publisher column sorting on Book Store Page",()=>{
        // Step1	Launch the URL:- https://demoqa.com/login
        LoginPage.open();

        // Step2	Enter the valid user name
        // Step3	Enter the valid password
        // Step4	Click on login button
        LoginPage.login(LoginData.usename, LoginData.password);

        // Step5	Now click on book store button
        ProfilePage.clickGoToBookStore();
        BookStorePage.waitForPageLoad();

        // step6	Click on title to sort the books by title
        let beforeSorting = BookSection.getAllBookPublishers();
        beforeSorting.sort();

        BookSection.sortBooksPulisherAsAscending();

        let afterSorting = BookSection.getAllBookPublishers();
    
        //console.log("Before Sorting--->",beforeSorting);
        //console.log("After Sorting--->",afterSorting);

        assert.deepEqual(afterSorting, beforeSorting);

        beforeSorting.reverse();

        BookSection.sortBooksPulisherAsDescending();

        afterSorting = BookSection.getAllBookPublishers();
    
        //console.log("Before Sorting--->",beforeSorting);
        //console.log("After Sorting--->",afterSorting);

        assert.deepEqual(afterSorting, beforeSorting);
    })
})