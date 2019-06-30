const DATABASE = global.DATABASE;

const get = (req, res) => {
  DATABASE.emit("user/get", {})
    .then(({ skills, products }) => {
      res.status(200).render("index", { skills, products });
    })
    .catch(error => res.status(500).render("index"));
};

module.exports = {
  get
};
