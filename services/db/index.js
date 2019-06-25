const db = require("../../models/db")();
const { userCredentialsValidation } = require("../validation");

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

DATABASE.on("index/get", response => {
  getUserData().then(data => {
    response.reply(data);
  });
});

DATABASE.on("login/post", response => {
  getUserData().then(({ credentials: { email, password } }) => {
    if (email === response.data.email && password === response.data.password) {
      response.reply();
    } else {
      response.replyErr();
    }
  });
});

DATABASE.on("skills/post", response => {
  console.log("get skills/post response", response.data);
  setUserSkills(response.data)
    .then(() => {
      response.reply();
    })
    .catch(error => response.replyErr(error));
});

DATABASE.on("upload/product", response => {
  const {
    data: { name, price, src }
  } = response;
  console.log("get skills/post");
  setUserProduct(name, price, src)
    .then(() => {
      response.reply();
    })
    .catch(error => response.replyErr(error));
});
