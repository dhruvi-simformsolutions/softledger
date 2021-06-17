const config = require('../config');
const { Pool } = require('pg');

const DEBUG = false;

const pool = new Pool({
  connectionString: config.CONN_STRING,
})

module.exports = {
  async queryOne(text, params) {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    if(DEBUG) console.log('executed query', { text, duration, rows: res.rowCount })
    return res?.rows?.[0]
  },
  async queryRows(text, params) {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    if(DEBUG) console.log('executed query', { text, duration, rows: res.rowCount })
    return res?.rows
  },
  async query(text, params) {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    if(DEBUG) console.log('executed query', { text, duration, rows: res.rowCount })
    return res
  },
  async getClient() {
    const client = await pool.connect()
    const query = client.query
    const release = client.release
    // set a timeout of 5 seconds, after which we will log this client's last query
    const timeout = setTimeout(() => {
      console.error('A client has been checked out for more than 5 seconds!')
      console.error(`The last executed query on this client was: ${client.lastQuery}`)
    }, 5000)
    // monkey patch the query method to keep track of the last query executed
    client.query = (...args) => {
      client.lastQuery = args
      return query.apply(client, args)
    }
    client.release = () => {
      // clear our timeout
      clearTimeout(timeout)
      // set the methods back to their old un-monkey-patched version
      client.query = query
      client.release = release
      return release.apply(client)
    }

    client.queryOne = async (text, params) =>{
      const start = Date.now()
      const res = await client.query(text, params)
      const duration = Date.now() - start
      if(DEBUG) console.log('executed query', { text, duration, rows: res.rowCount })
      return res?.rows?.[0]
    }

    client.queryRows = async (text, params) => {
      const start = Date.now()
      const res = await client.query(text, params)
      const duration = Date.now() - start
      if(DEBUG) console.log('executed query', { text, duration, rows: res.rowCount })
      return res?.rows
    }

    return client
  },
  //give access to raw pool client
  pool,
}