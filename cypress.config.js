const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/alerts',
    viewportHeight: 1200,
    viewportWidth: 1600,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
