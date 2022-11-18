const { assert } = require('chai');

describe('Страницы имеют статическое содержание:', function () {
    it("Страница главная:", async function ({browser})  {
        await browser.url("#");
        await browser.setWindowSize(1440, 1000);
        await browser.setTimeout({
            'pageLoad': 20000,
            'script': 60000
        });
        const page = await browser.$(".Application");
        await page.waitForExist();
    });

    it("Страница доставка: ", async function ({browser})  {
        await browser.url("http://localhost:3000/hw/store/delivery");
        await browser.setWindowSize(1440, 1000);

        const page = await browser.$(".Delivery");
        await browser.setTimeout({
            'pageLoad': 10000,
            'script': 60000
        });
        await page.waitForExist();
    });

    it("Страница контактов: ", async function ({browser})  {
        await browser.url("http://localhost:3000/hw/store/contacts");
        await browser.setWindowSize(1440, 1000);
        const page = await browser.$(".Contacts");
        await browser.setTimeout({
            'pageLoad': 10000,
            'script': 60000
        });
        await page.waitForExist();
    });
});