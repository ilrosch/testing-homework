module.exports = {
    baseUrl: "http://localhost:3000/hw/store/",
    sets: {
        "adaptive": {
            files: 'test/hermione/adaptive.hermione.js'
        }
    },
    browsers: {
        chrome: {
            automationProtocol: 'devtools',
            desiredCapabilities: {
                browserName: "chrome",
            },
        }
    },
}