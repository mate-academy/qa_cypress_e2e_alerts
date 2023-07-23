const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return {
        baseUrl: 'https://demoqa.com/alerts'
      };
    }
  }
});
