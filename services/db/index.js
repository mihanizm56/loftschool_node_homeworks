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

DATABASE.on("index/get", response => {
  getUserData().then(data => {
    response.reply(data);
  });
});

DATABASE.on("login/post", response => {
  getUserData(0).then(({ credentials: { email, password } }) => {
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

// db.set("user", {
//           ...data,
//           skills: {
//             "Возраст начала занятий на скрипке": age,
//             "Концертов отыграл": concerts,
//             "Максимальное число городов в туре": cities,
//             "Лет на сцене в качестве скрипача": years
//           }
//         });
//         db.save();
