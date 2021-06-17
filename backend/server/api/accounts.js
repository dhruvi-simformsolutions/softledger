const db = require('./db');

const all = async (req, res) => {
  try {
    const [count, data] = await Promise.all([
      db.queryOne(`SELECT COUNT(*) from "Accounts"`),
      db.queryRows(`SELECT * from "Accounts"`),
    ])

    res.send({
      data: data || [],
      totalItems: count.count
    })

  } catch(err) {
    res.send(String(err), 500);
  }
}

const create = async (req, res) => {
  try {
    const acc = await db.queryOne(`
      INSERT INTO "Accounts" ("name", "number", "type")
      VALUES ($1, $2, $3)
      RETURNING *
    `, [
      req.body.name,
      req.body.number,
      req.body.type,
    ]);

    res.send(acc, 201)

  } catch(err) {
    res.send(String(err), 500);
  }
}

module.exports = {
  all,
  create
}