/// <reference types='cypress' />

describe('Book Store app', () => {

  const user = {
    username: 'Charlec',
    password: 'Password123!'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these days'
  };

  const alertMessage = {
    added: 'Book added to your collection.',
    deleted: 'Book deleted.'
  };

  beforeEach(() => {
    cy.visit('/login');
  });

  it('should allow to add a book to user\'s collection', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile');

    cy.contains('#item-2', 'Book Store').click();
    cy.findByPlaceholder('Type to search').type(book.title);
    cy.contains('a', book.title).click();

    cy.get('#title-wrapper').should('contain', book.title);
    cy.get('#author-wrapper').should('contain', book.author);
    cy.get('#publisher-wrapper').should('contain', book.publisher);
    cy.get('#description-wrapper').should('contain', book.description);

    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.added);
    });

    cy.contains('#item-3', 'Profile').click();

    cy.get('.mr-2').should('contain', book.title);
  });

  it('should allow to delete a book from user\'s collection', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile');

    cy.get('#delete-record-undefined').click();
    cy.contains('button', 'OK').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.deleted);
    });
});
});