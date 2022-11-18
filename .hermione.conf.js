module.exports = {
    baseUrl: "http://localhost:3000/hw/store",

    sets: {
        "adaptive": {
            files: 'test/hermione/adaptive.hermione.js'
        },

        "static": {
            files: 'test/hermione/static.hermione.js'
        },

        "cart": {
            files: 'test/hermione/cart.hermione.js'
        },

    },
    browsers: {
        chrome: {
            automationProtocol: 'devtools',
            desiredCapabilities: {
                browserName: "chrome",
            },
        }
    },
    plugins: {
        "html-reporter/hermione": {
            path: "hermione-html-report",
        },
    },
}