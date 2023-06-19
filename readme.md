# Cypress: Alerts

## Workflow

1. Fork the repo.
1. Clone **your** forked repository.
1. Run the command `npm i`.
1. Create a new branch `git checkout -b testing`.
1. Resolve tasks in the `cypress`/`e2e`/`alerts.cy.js`.
1. Check yourself before submitting the task with a [Cypress checklist](https://mate-academy.github.io/qa-program/checklists/cypress.html).
1. Create a pull request.
1. Do not forget to click on `Re-request review` if you submit the homework after previous review.

## Task

### Basic level

Read the documentation about the [Catalog of Events](https://docs.cypress.io/api/cypress-api/catalog-of-events).
https://demoqa.com/alerts
App for testing: [DemoQA](https://demoqa.com/alerts)

**Your task** is to automate the next flow:

1. Click on the first button:
   - assert the text inside the alert.
1. Click on the second button:
   - assert the text inside the alert is shown in 5 secons.
1. Click on the third button:
   - assert the text inside the allert;
   - assert `You selected Ok` is shown.
1. Click on the third button and click on `Cancel` (read about the `window:confirm` event in the documentation):
   - assert the text inside the allert;
   - assert `You selected Cancel` is shown.

### Advanced level

Read the documentation:

- [stub](https://docs.cypress.io/api/commands/stub);
- [window](https://docs.cypress.io/api/commands/window).

1. Click on the fourth button and enter your name:
   - assert your name is shown on the page.
