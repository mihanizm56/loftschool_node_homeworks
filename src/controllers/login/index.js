const get = (req, res) => {
  res.status(200).render("login");
};

const post = (req, res) => {
  res.status(200).render("login");
};

module.exports = {
  get,
  post
};
