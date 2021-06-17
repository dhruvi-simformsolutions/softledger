const db = require('../db');
const accounts = require('../accounts');
const sinon = require('sinon');

describe('accounts tests', () => {
  before(async () => {
    await db.query('DELETE FROM "Accounts"')
  })

  it('should create an account', async () => {
    let spy = sinon.spy();
    await accounts.create({
      body: {
        name: 'one',
        number: '1',
        type: 'big type'
      }
    }, {
      send: spy
    })
    spy.should.have.been.calledOnce;


    let acc = await db.queryOne(`SELECT * FROM "Accounts"`);
    acc.name.should.eq('one');
    acc.number.should.eq('1');
    acc.type.should.eq('big type');
  });


})