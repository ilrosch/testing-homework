const { assert } = require('chai');
// describe('Конвертер валют ', function () {
//     it('должен появиться на странице', async function ({browser}) {
//         await browser.url("/");
//         await browser.keys(["курс доллара к рублю","Enter"]);
//         const convertor = await browser.$(".Converter");
//         await convertor.waitForExist();
//         await browser.assertView("plain", ".Convertor", {});
//     });
// });

describe('Общие требования:', function () {
    it('Вёрстка должна адаптироваться под ширину экрана 1920px', async function ({browser}) {
        await browser.url("http://localhost:3000/hw/store");
        await browser.setTimeout({
            'pageLoad': 40000,
            'script': 60000
        });
        await browser.setWindowSize(1920, 1000);
        const app = await browser.$(".Application");
        await app.waitForExist();
    });

    it('Вёрстка должна адаптироваться под ширину экрана 1440px', async function ({browser}) {
        await browser.url("#");
        await browser.setWindowSize(1440, 1000);
        const app = await browser.$(".Application");
        await app.waitForExist();
    });

    it('Вёрстка должна адаптироваться под ширину экрана 576px', async function ({browser}) {
        await browser.url("#");
        await browser.setWindowSize(576, 1000);
        const app = await browser.$(".Application");
        await app.waitForExist();
    });

    it('На ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async function ({browser}) {
        await browser.url("#");
        await browser.setWindowSize(575, 1000);
        const burger = await browser.$(".Application-Toggler");
        await burger.waitForExist();
    });

    it('При выборе элемента из меню "гамбургера", меню должно закрываться"', async function ({browser}) {
        await browser.url("#");
        await browser.setWindowSize(575, 1000);
        const burger = await browser.$(".Application-Toggler");
        await burger.click();
        const item = await browser.$(".nav-link");
        await item.click();
        const burger_close = await browser.$(".collapse");
        await burger_close.waitForExist();
    });
});
