const db = require('./server/api/db');

//create default tenatn
before(async () => {
  await db.query(`DELETE FROM "Journals"`);
  await db.query(`DELETE FROM "Accounts"`)
})

after(async () => {
  await db.pool.end();
})