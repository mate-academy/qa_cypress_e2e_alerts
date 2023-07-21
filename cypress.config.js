const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/alerts',
    viewportHeight: 1800,
    viewportWidth: 1300,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
