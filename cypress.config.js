const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/alerts',
    viewportHeight: 1000,
    viewportWidth: 1500,
    setupNodeEvents(on, config) {

    }
  }
});
