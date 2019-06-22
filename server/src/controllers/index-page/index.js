const db = require("../../models/db/db")();

const get = (req, res) => {
  Promise.resolve(db.get("user"))
    .then(({ skills }) => {
      res.status(200).render("index", { skills });
    })
    .catch(error => res.status(500).send());
};

module.exports = {
  get
};
