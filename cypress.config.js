const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/alerts',
    viewportHeight: 1920,
    viewportWidth: 1080,
    setupNodeEvents(on, config) {
    
    }
  }
});
