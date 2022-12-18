


describe('fibonacci page logic correct', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/fibonacci');
    })

    it('Submit button disabled when input is empty', () => {
      
        cy.get('form')
                .within(() => {
                    cy.get('input').should('have.value', '')
                    cy.get('button[type="submit"]').should('be.disabled')
                })
    })

    it('fibonacci number correct', async () => {
        cy.clock()
        cy.get('form').within(() => {
            cy.get('input').type('3')
            cy.get('button[type="submit"]').click()
        })

        cy.tick(1000)
        cy.get('div[class*="circle_circle"]').then((items) => {
           
          
                cy.get(items[0]).children().should('have.text', '1')
            
        })

        
        cy.tick(1000)

        cy.get('div[class*="circle_circle"]').then((items) => {
            
            
            
                cy.get(items[1]).children().should('have.text', '1')
            
        })

        cy.tick(1000)

        cy.get('div[class*="circle_circle"]').then((items) => {
            
            
            
                cy.get(items[2]).children().should('have.text', '2')
            
        }) 

        cy.tick(1000)

        cy.get('div[class*="circle_circle"]').then((items) => {
            
            
            
                cy.get(items[3]).children().should('have.text', '3')
            
        }) 
        cy.get('form')
                .within(() => {
                    cy.get('input').should('have.value', '')
                    cy.get('button[type="submit"]').should('be.disabled')
                })
    })
})