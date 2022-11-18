const { assert } = require('chai');

describe('Тест корзины:', function () {
    it("Содержимое корзины должно сохраняться между перезагрузками страницы:", async function ({browser})  {
        await browser.setWindowSize(1440, 1000);
        await browser.url("http://localhost:3000/hw/store/catalog/0");
        await browser.setTimeout({
            'pageLoad': 40000,
            'script': 60000
        });
        await browser.$('.ProductDetails-AddToCart').click();
        await browser.url('http://localhost:3000/hw/store/cart')
        const product_before = await browser.$(".Cart-Name");
        const product_after = await browser.$(".Cart-Name");

        assert.equal(
            await product_before.getText(),
            await product_after.getText(),
            "Содержимое корзины не сохранилось"
        );
    });

});