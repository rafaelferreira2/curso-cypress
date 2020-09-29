describe("Tickets", () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));

    it.only("preenche campos do tipo texto", () => {
        const firstName = "Rafael";
        const lastName = "Ferreira";

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("sf.rafael20@gmail.com");
        cy.get("#requests").type("Come muito");
        cy.get("#signature").type(`${firstName} ${lastName}`);
    });

    //it("has 'TICKETBOX' header", () => {});
});