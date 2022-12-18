describe("queue page correct", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/queue");
  });

  it("Submit button disabled when input is empty", () => {
    cy.get("form").within(() => {
      cy.get("input").should("have.value", "");
      cy.get('button[type="submit"]').should("be.disabled");
    });
  });

  it("adding elements to queue correct", () => {
    cy.clock();
    cy.get("form").within(() => {
      cy.get("input").type("1");
      cy.get('button[type="submit"]').click();
    });

    cy.tick(1000);

    cy.get('div[class*="circle_content"]').then((items) => {
      cy.get(items[0])
        .contains("head")
        .should("have.text", "head");
      cy.get(items[0])
        .contains("tail")
        .should("have.text", "tail");
      cy.get(items[0])
        .contains("1")
        .should("have.text", "1");
    });

    cy.get("form").within(() => {
      cy.get("input").type("2");
      cy.get('button[type="submit"]').click();
      cy.tick(1000);
      cy.get("input").type("3");
      cy.get('button[type="submit"]').click();
    });

    cy.tick(1000);

    cy.get('div[class*="circle_content"]').then((items) => {
      cy.get(items[0])
        .contains("head")
        .should("have.text", "head");
      cy.get(items[0])
        .contains("1")
        .should("have.text", "1");
      cy.get(items[1])
        .contains("2")
        .should("have.text", "2");
      cy.get(items[2])
        .contains("tail")
        .should("have.text", "tail");
      cy.get(items[2])
        .contains("3")
        .should("have.text", "3");
    });
  });

  it("deleting elements from queue correct", () => {
    cy.clock();
    cy.get("form").within(() => {
      cy.get("input").type("1");
      cy.get('button[type="submit"]').click();
      cy.tick(1000);
      cy.get("input").type("2");
      cy.get('button[type="submit"]').click();
      cy.tick(1000);
      cy.get("input").type("3");
      cy.get('button[type="submit"]').click();
    });

    cy.tick(1000);

    cy.get("form").within(() => {
      cy.get("button")
        .contains("Удалить")
        .click();
    });

    cy.get('div[class*="circle_content"]').then((items) => {
      cy.get(items[0]).within(() => {
        cy.get('div[class*="circle_circle"]')
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_changing"));
      });
    });

    cy.tick(1000);

    cy.get('div[class*="circle_content"]').then((items) => {
      cy.get(items[0]).within(() => {
        cy.get('div[class*="circle_circle"]').should("have.text", "");
      });

      cy.get(items[1])
        .contains("head")
        .should("have.text", "head");
      cy.get(items[2])
        .contains("tail")
        .should("have.text", "tail");
    });

    it("clear queue", () => {
      cy.clock();
      cy.get("form").within(() => {
        cy.get("input").type("1");
        cy.get('button[type="submit"]').click();
        cy.tick(1000);
        cy.get("input").type("2");
        cy.get('button[type="submit"]').click();
        cy.tick(1000);
        cy.get("input").type("3");
        cy.get('button[type="submit"]').click();
      });

      cy.tick(1000);

      cy.get("form").within(() => {
        cy.get("button")
          .contains("Очистить")
          .click();
      });

      cy.get('div[class*="circle_circle"]').then((items) => {
        for (let i = 0; i < items.length; i++) {
          cy.get(items[i]).should("have.text", "");
        }
      });
    });
  });
});
