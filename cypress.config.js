const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/alerts',

    setupNodeEvents(on, config) {
      on("task", {
        generateUser() {
          return {
            typicatText: faker.lorem.text()
          };
        },
      });
    },
  },
});
