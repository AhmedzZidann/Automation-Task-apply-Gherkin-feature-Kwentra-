const { defineConfig } = require('cypress'); 
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://testingtasks.kwentra.com',
    specPattern: 'cypress/e2e/features/**/*.feature', 
    "browser": {
        "fs": false,
        "os": false,
        "path": false
    },
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber());
    },
  },
});
