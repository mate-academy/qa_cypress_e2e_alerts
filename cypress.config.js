const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1000,
    viewportWidth: 1400,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
