const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1320,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
