describe("list page correct", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
  });

  it("Submit button disabled when input is empty", () => {
    cy.get("form").within(() => {
      cy.get("fieldset").should("have.value", "");
      cy.get("button")
        .contains("Добавить в head")
        .parent()
        .should("be.disabled");
      cy.get("button")
        .contains("Добавить в tail")
        .parent()
        .should("be.disabled");
      cy.get("button")
        .contains("Удалить по индексу")
        .parent()
        .should("be.disabled");
      cy.get("button")
        .contains("Добавить по индексу")
        .parent()
        .should("be.disabled");
    });
  });

  it("initial list correct", () => {
    cy.get('div[class*="circle_circle"]').then((items) => {
      const initialList = ["0", "34", "8", "1"];

      for (let i = 0; i < items.length; i++) {
        cy.get(items[i]).should("have.text", initialList[i]);
      }
    });
  });

  it("adding to head", () => {
    cy.clock();
    cy.get("form").within(() => {
      cy.get("input").then((items) => {
        cy.get(items[0]).type("1");
      });
      cy.get("button")
        .contains("Добавить в head")
        .parent()
        .click();
    });

    cy.tick(1000);

    cy.get('div[class*="circle_circle"]').then((items) => {
      const result = ["1", "0", "34", "8", "1"];

      for (let i = 0; i < items.length; i++) {
        cy.get(items[i]).should("have.text", result[i]);
      }
    });
  });

  it("adding to tail", () => {
    cy.clock();
    cy.get("form").within(() => {
      cy.get("input").then((items) => {
        cy.get(items[0]).type("1");
      });
      cy.get("button")
        .contains("Добавить в tail")
        .parent()
        .click();
    });

    cy.tick(1000);

    cy.get('div[class*="circle_circle"]').then((items) => {
      const result = ["0", "34", "8", "1", "1"];

      for (let i = 0; i < items.length; i++) {
        cy.get(items[i]).should("have.text", result[i]);
      }
    });
  });

  it("adding by index", () => {
    cy.clock();
    cy.get("form").within(() => {
      cy.get("input").then((items) => {
        cy.get(items[0]).type("15");
        cy.get(items[1]).type("3");
      });
      cy.get("button")
        .contains("Добавить по индексу")
        .parent()
        .click();
    });

    cy.tick(1000);

    cy.get('div[class*="circle_circle"]').then((items) => {
      const result = ["0", "34", "8", "15", "1"];

      for (let i = 0; i < items.length; i++) {
        cy.get(items[i]).should("have.text", result[i]);
      }
    });
  });

  it("delete from head", () => {
    cy.clock();
    cy.get("form").within(() => {
      cy.get("button")
        .contains("Удалить из head")
        .parent()
        .click();
    });

    cy.tick(1000);

    cy.get('div[class*="circle_circle"]').then((items) => {
      const result = ["34", "8", "1"];

      for (let i = 0; i < items.length; i++) {
        cy.get(items[i]).should("have.text", result[i]);
      }
    });
  });

  it("delete from tail", () => {
    cy.clock();
    cy.get("form").within(() => {
      cy.get("button")
        .contains("Удалить из tail")
        .parent()
        .click();
    });

    cy.tick(1000);

    cy.get('div[class*="circle_circle"]').then((items) => {
      const result = ["0", "34", "8"];

      for (let i = 0; i < items.length; i++) {
        cy.get(items[i]).should("have.text", result[i]);
      }
    });
  });

  it("deleting by index", () => {
    cy.clock();
    cy.get("form").within(() => {
      cy.get("input").then((items) => {
        cy.get(items[1]).type("2");
      });
      cy.get("button")
        .contains("Удалить по индексу")
        .parent()
        .click();
    });

    cy.tick(1000);

    cy.get('div[class*="circle_circle"]').then((items) => {
      const result = ["0", "34", "1"];

      for (let i = 0; i < items.length; i++) {
        cy.get(items[i]).should("have.text", result[i]);
      }
    });
  });
});
