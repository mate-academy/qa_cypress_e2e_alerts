const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/alerts',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
