"use strict";

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

const By = webdriver.By;


let browser;

describe("index", function () {

    beforeEach(function (done) {
        this.timeout(20000);
        browser = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.firefox())
            .setFirefoxOptions(new firefox.Options().headless())
            .forBrowser('firefox')
            .build();
            //withCapabilities(webdriver.Capabilities.firefox()).build();

        browser.get("http://localhost:3000/");
        done();
    });

    afterEach(function (done) {
        browser.quit();
        done();
    });

    // Test case
    it("Test index", function (done) {
        // Check correct title
        browser.getTitle().then(function (title) {
            assert.equal(title, "React App");
        });

        // // Check correct heading
        // browser.findElement(By.css("h1")).then(function (element) {
        //     element.getText().then(function (text) {
        //         assert.equal(text, "JSRamverk");
        //     });
        // });

        // // Check correct URL ending
        // browser.getCurrentUrl().then(function (url) {
        //     assert.ok(url.endsWith("/"));
        // });

        done();
    });



    // it("Test go to Home", function (done) {
    //     // Use nav link to go to home page
    //     browser.findElement(By.linkText("Rapporter")).then(function (element) {
    //         element.click();
    //     });

    //     // Check correct heading
    //     browser.findElement(By.css("h2")).then(function (element) {
    //         element.getText().then(function (text) {
    //             assert.equal(text, "Week");
    //         });
    //     });

    //     // Check correct URL ending
    //     browser.getCurrentUrl().then(function (url) {
    //         assert.ok(url.endsWith("reports/"));
    //     });

    //     done();
    // });
});