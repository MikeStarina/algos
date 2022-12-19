



describe('stack page logic correct', () => {

    beforeEach(() => {cy.visit('http://localhost:3000/stack')})


    it('Submit button disabled when input is empty', () => {
      
        cy.get('form')
                .within(() => {
                    cy.get('input').should('have.value', '')
                    cy.get('button[type="submit"]').should('be.disabled')
                })
    })

    it('adding element to stack correct', async () => {
        cy.clock()

        cy.get('form').within(() => {
            cy.get('input').type('1')
            cy.get('button[type="submit"]').click()
        })


        cy.get('div[class*="circle_circle"]').then((items) => {

            
            cy.get(items[0]).children().should('have.text', '1');
            cy.get(items[0]).invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
            
           

        })

        cy.tick(1000)

        cy.get('div[class*="circle_circle"]').then((items) => {

            
            
            cy.get(items[0]).invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
            
           

        })

    })


    it('deleting element from stack correct', async () => {
        cy.clock()

        cy.get('form').within(() => {
            cy.get('input').type('1')
            cy.get('button[type="submit"]').click()
            cy.tick(1000)
            cy.get('input').type('2')
            cy.get('button[type="submit"]').click()
            cy.tick(1000)
            cy.get('input').type('3')
            cy.get('button[type="submit"]').click()
        })

        cy.tick(1000);

        cy.get('div[class*="circle_circle"]').then((items) => {

            const result = ['1','2','3'];
            
            for ( let i = 0; i < items.length; i++) {
                cy.get(items[i]).children().should('have.text', result[i])
            }
            
           

        })

        cy.get('form').within(() => {
            cy.get('button').contains('Удалить').click()
        })

        cy.get('div[class*="circle_circle"]').then((items) => {

            cy.get(items[2]).invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
            
           

        })

        cy.tick(1000);

        cy.get('div[class*="circle_circle"]').then((items) => {

            const result = ['1','2'];
            
            for ( let i = 0; i < items.length; i++) {
                cy.get(items[i]).children().should('have.text', result[i])
            }
            
           

        })

    })


    it('clear stack correct', async () => {
        cy.clock()

        cy.get('form').within(() => {
            cy.get('input').type('1')
            cy.get('button[type="submit"]').click()
            cy.tick(1000)
            cy.get('input').type('2')
            cy.get('button[type="submit"]').click()
            cy.tick(1000)
            cy.get('input').type('3')
            cy.get('button[type="submit"]').click()
        })

        cy.tick(1000);

        cy.get('form').within(() => {
            cy.get('button').contains('Удалить').click()
        })

        cy.contains('div[class*="circle_circle"]').should('not.exist')


    })
})