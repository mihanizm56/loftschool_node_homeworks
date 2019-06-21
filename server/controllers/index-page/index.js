const indexGetController = (req, res) => {
  console.log("index get");
  res.render('index', { title: 'Express' });
  
  // res.status(200).json({ message: "done" });
};

const indexPostController = (req, res) => {
  // res.render('index', { title: 'Express' });
  console.log("index post", req.body);
  res.status(200).json({ message: "done" });
};

module.exports.indexPostController = indexPostController;
module.exports.indexGetController = indexGetController;
