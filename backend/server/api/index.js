const accounts = require("./accounts");
const journals = require("./journals");

const routes = (router, prefix) => {
  router.get(prefix + "accounts", accounts.all);

  router.post(prefix + "accounts", accounts.create);

  router.get(prefix + "journals", journals.all);

  router.post(prefix + "journals", journals.create);

  router.post(prefix + "approve", journals.approve);

  router.post(prefix + "delete-journal", journals.deleteJournal);
};

module.exports = routes;
