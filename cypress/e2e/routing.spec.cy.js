describe('routing ok', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('/recursion ok', () => {
        
        cy.get('a[href*="/recursion"]').click()
        cy.contains('404').should('not.exist')
    })

    it('/fibonacci ok', () => {
        
        cy.get('a[href*="/fibonacci"]').click()
        cy.contains('404').should('not.exist')
    })

    it('/sorting ok', () => {
        
        cy.get('a[href*="/sorting"]').click()
        cy.contains('404').should('not.exist')
    })

    it('/stack ok', () => {
        
        cy.get('a[href*="/stack"]').click()
        cy.contains('404').should('not.exist')
    })

    it('/queue ok', () => {
        
        cy.get('a[href*="/queue"]').click()
        cy.contains('404').should('not.exist')
    })

    it('/list ok', () => {
        
        cy.get('a[href*="/list"]').click()
        cy.contains('404').should('not.exist')
    })

})