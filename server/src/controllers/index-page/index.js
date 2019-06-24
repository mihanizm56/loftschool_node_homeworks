const db = require("../../models/db/db")();

const get = (req, res) => {
  Promise.resolve(db.get("user"))
    .then(({ skills, products }) => {
      console.log("products", products);
      res.status(200).render("index", { skills, products });
    })
    .catch(error => res.status(500).send());
};

module.exports = {
  get
};
