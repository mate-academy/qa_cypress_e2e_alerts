const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/alerts',
    viewportHeight: 1440,
    viewportWidth: 1920,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
