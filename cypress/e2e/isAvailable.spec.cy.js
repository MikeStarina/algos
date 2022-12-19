it('app available @ localhost:3000', () => {
	cy.visit('http://localhost:3000');
	cy.get('title').contains('МБОУ АЛГОСОШ')
});