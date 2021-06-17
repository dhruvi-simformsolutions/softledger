const db = require("./db");

const all = async (req, res) => {
  try {
    const [count, data] = await Promise.all([
      db.queryOne(`SELECT COUNT(*) from "Journals"`),
      db.queryRows(`SELECT * from "Journals"`),
    ]);

    res.send({
      data: data || [],
      totalItems: count.count,
    });
  } catch (err) {
    res.send(String(err), 500);
  }
};

const create = async (req, res) => {
  try {
    const journal = await db.queryOne(
      `
      INSERT INTO "Journals" ("reference", "currency", "amount", "AccountId", "date","status")
      VALUES ($1, $2, $3, $4, $5,$6)
      RETURNING *
    `,
      [
        req.body.reference,
        req.body.currency,
        req.body.amount,
        req.body.AccountId,
        req.body.date,
        "draft",
      ]
    );

    res.send(journal, 201);
  } catch (err) {
    res.send(String(err), 500);
  }
};

/** Update the status to approve */

const approve = async (req, res) => {
  try {
    const journal = await db.queryRows(
      `SELECT * from "Journals" WHERE id = $1`,
      [req.body.id]
    ); // fetch Journal from id
    if (journal.length) {
      // if journal is found
      const checkIfexists = await db.queryRows(
        `SELECT * from "Journals" WHERE id = $1 AND status = $2`,
        [req.body.id, "approved"]
      ); // check if journal is already approved
      if (checkIfexists.length) {
        // journal is already approved
        res.send(String("Journal is already approved!"), 500);
      } else {
        // journal is not approved
        const updateJournal = await db.queryOne(
          `UPDATE "Journals" SET status = $1 WHERE id = $2`,
          [req.body.status, req.body.id]
        );

        res.send(updateJournal, 201); // successfully executed
      }
    } else {
      // if journal is not found
      res.send(String("No Journal Found!"), 500);
    }
  } catch (err) {
    res.send(String(err), 500);
  }
};

/** Delete draft status journals */

const deleteJournal = async (req, res) => {
  try {
    const journal = await db.queryRows(
      `SELECT * from "Journals" WHERE id = $1`,
      [req.body.id]
    ); // fetch Journal from id
    if (journal.length) {
      // if journal is found
      const checkIfexists = await db.queryRows(
        `SELECT * from "Journals" WHERE id = $1 AND status = $2`,
        [req.body.id, "approved"]
      ); // check if journal is already approved
      if (checkIfexists.length) {
        // journal is already approved
        res.send(String("Approved journal can't be deleted!"), 500);
      } else {
        // journal is not approved and can be deleted
        const deleteJournal = await db.queryOne(
          `DELETE FROM "Journals" WHERE id = $1`,
          [req.body.id]
        );

        res.send(deleteJournal, 201); // successfully executed
      }
    } else {
      // if journal is not found
      res.send(String("No Journal Found!"), 500);
    }
  } catch (err) {
    res.send(String(err), 500);
  }
};
module.exports = {
  all,
  create,
  approve,
  deleteJournal,
};
