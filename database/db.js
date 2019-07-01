const db = require("./index")();

const DATABASE = global.DATABASE;

const getUserData = () => Promise.resolve(db.get("user"));

const setUserSkills = skills => {
  return getUserData().then(data => {
    db.set("user", {
      ...data,
      skills
    });
    db.save();
  });
};

const setUserProduct = (name, price, src) => {
  return getUserData().then(({ products }) => {
    products.push({ name, price, src });
    db.save();
  });
};

DATABASE.on("user/get", response => {
  getUserData().then(data => {
    response.reply(data);
  });
});

DATABASE.on("skills/post", response => {
  setUserSkills(response.data)
    .then(() => {
      response.reply();
    })
    .catch(error => response.replyErr(error));
});

DATABASE.on("upload/item", response => {
  const {
    data: { name, price, src }
  } = response;

  setUserProduct(name, price, src)
    .then(() => {
      response.reply();
    })
    .catch(error => response.replyErr(error));
});
