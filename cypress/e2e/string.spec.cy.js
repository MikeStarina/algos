

describe('string page logic correct', () => {


    beforeEach(() => {
        cy.visit('http://localhost:3000/recursion')
    })

    it('Submit button disabled when input is empty', () => {
      
        cy.get('form')
                .within(() => {
                    cy.get('input').should('have.value', '')
                    cy.get('button[type="submit"]').should('be.disabled')
                })
    })

    it('String reverse correct', async () => {
        cy.clock()
        cy.get('form').within(() => {
            cy.get('input').type('012')
            cy.get('button[type="submit"]').click()
        })

        
        cy.get('div[class*="circle_circle"]').then((items) => {

            
            for ( let i = 0; i < items.length; i++) {
                cy.get(items[i]).children().should('have.text', i)
                cy.get(items[i])
                .invoke('attr', 'class')
				.then(classList => expect(classList).contains('circle_default'))
            }
            
           

        })

        
        cy.tick(1000)

        cy.get('div[class*="circle_circle"]').then((items) => {


            cy.get(items[0]).children().should('have.text', '0')
            cy.get(items[0])
                .invoke('attr', 'class')
				.then(classList => expect(classList).contains('circle_changing'))
           

        })

        cy.tick(1000)

        cy.get('div[class*="circle_circle"]').then((items) => {


            cy.get(items[0]).children().should('have.text', '2')
            cy.get(items[0])
                .invoke('attr', 'class')
				.then(classList => expect(classList).contains('circle_modified'))
           

        })

      

      
        cy.tick(1000)

        cy.get('div[class*="circle_circle"]').then((items) => {


            cy.get(items[1]).children().should('have.text', '1')
            cy.get(items[1])
                .invoke('attr', 'class')
				.then(classList => expect(classList).contains('circle_changing'))
           

        })
      
        cy.tick(1000)

        cy.get('div[class*="circle_circle"]').then((items) => {


            cy.get(items[1]).children().should('have.text', '1')
            cy.get(items[1])
                .invoke('attr', 'class')
				.then(classList => expect(classList).contains('circle_modified'))
           

        })

       
        cy.get('div[class*="circle_circle"]').then((items) => {

            const result = ['2', '1', '0']

            for ( let i = 0; i < items.length; i++) {
                cy.get(items[i]).children().should('have.text', result[i])
                cy.get(items[i])
                .invoke('attr', 'class')
				.then(classList => expect(classList).contains('circle_modified'))
            }
            

        })

        cy.get('form')
        .within(() => {
            cy.get('input').should('have.value', '')
            cy.get('button[type="submit"]').should('be.disabled')
        })


    })





})