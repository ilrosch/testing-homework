const { assert } = require('chai');

describe("Общие требования к адаптиву:", async function () {
    it("Вёрстка должна адаптироваться под ширину экрана: 1440px", async ({browser}) => {
        await browser.setWindowSize(1440, 1000);
        const page = await browser.$("Application");
        console.log(page);
    });
})