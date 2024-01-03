const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/alerts',
    viewportWidth: 1320,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
