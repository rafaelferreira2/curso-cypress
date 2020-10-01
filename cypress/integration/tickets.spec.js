describe("Tickets", () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));
    
    it("preenche campos do tipo texto", () => {
        const firstName = "Rafael";
        const lastName = "Ferreira";

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("sf.rafael20@gmail.com");
        cy.get("#requests").type("breve descrição");
        cy.get("#signature").type(`${firstName} ${lastName}`);
    });

    it("seleciona 2 tickets", () => {
        cy.get("#ticket-quantity").select("2");
    });

    it("Seleciona VIP ticket type", () => {
        cy.get("#vip").check();
    });

    it("Seleciona 'friend' e 'Social Media' ", () => {
        cy.get("#friend").check();
        cy.get("#social-media").check();
    });

    it("Seleciona 'friend' e 'publication' e desmarca 'friend'", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();
    });

    it("has 'TICKETBOX' header", () => {
        cy.get("header h1").should("contain", "TICKETBOX");
    });

    it("Alerta para email inválido", () => {
        cy.get("#email")
          .as("email")
          .type("sf.rafael20--gmail.com");

        cy.get("#email.invalid").should("exist");

        cy.get("@email")
          .clear()
          .type("sf.rafael20@gmail.com");

        cy.get("#email.invalid").should("not.exist");
    });

    it("preenchendo tudo e resetando", () => {
        const firstName = "Rafael";
        const lastName = "Ferreira";
        const fullName = `${firstName} ${lastName}`

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("sf.rafael20@gmail.com");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#social-media").check();
        cy.get("#requests").type("breve descrição");

        cy.get(".agreement p").should(
            "contain",
            `I, ${fullName}, wish to buy 2 VIP tickets.`
        );

        cy.get("#agree").click();
        cy.get("#signature").type(fullName);

        cy.get("button[type=submit]")
          .as("submitButton")
          .should("not.be.disabled");

        cy.get("button[type=reset]").click();

        cy.get("@submitButton").should("be.disabled");
    });

    it("Preenchendo campos obrigatórios usando comandos personalizados", () => {
        const customer = {
            firstName: "Rafael",
            lastName: "Ferreira",
            email: "rafael@mail.com"
        };

        cy.camposObrigatorios(customer);

        cy.get("button[type=submit]")
          .as("submitButton")
          .should("not.be.disabled");

        cy.get("#agree").uncheck();

        cy.get("@submitButton").should("be.disabled");
    });
});