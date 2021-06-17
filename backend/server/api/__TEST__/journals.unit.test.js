const db = require("../db");
const journals = require("../journals");
const sinon = require("sinon");

describe("journal tests", () => {
  let journal_data_1, journal_data_2;
  before(async () => {
    journal_data_1 = await db.queryOne(
      `
            INSERT INTO "Journals" ("reference", "currency", "amount", "AccountId", "date","status")
            VALUES ($1, $2, $3, $4, $5,$6)
            RETURNING *
          `,
      ["test", "USD", "300", 5, "2020-06-17", "draft"]
    );

    journal_data_2 = await db.queryOne(
      `
              INSERT INTO "Journals" ("reference", "currency", "amount", "AccountId", "date","status")
              VALUES ($1, $2, $3, $4, $5,$6)
              RETURNING *
            `,
      ["test1", "USD", "400", 5, "2020-06-17", "draft"]
    );
  });

  it("should approve a journal", async () => {
    let spy = sinon.spy();
    await journals.approve(
      {
        body: {
          id: journal_data_1.id,
          status: "approved",
        },
      },
      {
        send: spy,
      }
    );
    spy.should.have.been.calledOnce;
  });

  it("should not delete an approved journal", async () => {
    let spy = sinon.spy();
    await journals.deleteJournal(
      {
        body: {
          id: journal_data_1.id,
        },
      },
      {
        send: spy,
      }
    );
    spy.should.have.been.calledOnce;
  });

  it("should delete a draft journal", async () => {
    let spy = sinon.spy();
    await journals.deleteJournal(
      {
        body: {
          id: journal_data_2.id,
        },
      },
      {
        send: spy,
      }
    );
    spy.should.have.been.calledOnce;
  });
});
