const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1920,
    viewportWidth: 1080,
    baseUrl: 'https://demoqa.com',
    setupNodeEvents(on, config) {
    }
  }
});
