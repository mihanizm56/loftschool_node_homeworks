const get = (req, res) => {
  res.status(200).render("admin");
};

module.exports = {
  get
};
