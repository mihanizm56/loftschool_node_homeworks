const {
  addNew,
  getAllNews,
  getNew,
  updateNew,
  deleteNew
} = require("../../models/news");
const pick = require("lodash/pick");
const { validateNews } = require("../../services/validation/news");
const { getUserFromDbById } = require("../../models/users");
const { createToken } = require("../../services/tokens");

const getNews = async (req, res) => {
  try {
    const news = await getAllNews();

    const result = news.map(async item => {
      const newsData = pick(item, ["userId", "theme", "date", "text"]);
      const userId = newsData.userId;
      const userData = pick(await getUserFromDbById(userId), [
        "username",
        "firstName",
        "surName",
        "middleName"
      ]);
      const access_token = createToken(userData._id);

      return {
        ...newsData,
        user: {
          access_token,
          username: userData.username,
          firstName: userData.firstName,
          surName: userData.surName,
          middleName: userData.middleName,
          id: userData._id,
          image: userData.image,
          permission: userData.permission
        }
      };
    });

    const newsResult = await Promise.all(result);

    res.status(200).send(newsResult);
  } catch (error) {
    console.log("error when getting news", error);
  }
};

const newNews = async (req, res) => {
  const newNew = JSON.parse(req.body);
  // const newNew = req.body;
  const { theme, date, text, userId } = newNew;
  console.log("check data of new", newNew);

  try {
    // await validateNews(newNew);
    const existsNew = await getNew(newNew);
    if (existsNew) {
      console.log("there is a new in db");
      res.status(400).send("new exists");
    } else {
      try {
        console.log("add the new in db");
        await addNew(newNew).save();

        const news = await getAllNews();
        res.status(200).send(news);
      } catch (error) {
        console.log("not valid data", error);
        res.status(400).send("not valid user data");
      }
    }
  } catch (error) {
    console.log("not valid data", error);
    res.status(400).send("not valid user data");
  }
};

const updateNews = async (req, res) => {
  // const newNew = JSON.parse(req.body);
  //   const updateNew = req.body;
  //   const { theme, text, userId, date } = updateNew;
  //   console.log("check data of updated new", updateNew);
  //   try {
  //     await validateNews(newNew);
  //     await updateNew({
  //       prevTheme,
  //       prevDate,
  //       prevText,
  //       prevUserId,
  //       newTheme,
  //       newDate,
  //       newText,
  //       newUserId
  //     });
  //     console.log("new user data is updated");
  //     res.status(200).send({
  //       username,
  //       ...rest
  //     });
  //   } catch (error) {
  //     console.log("new user data was not updated", error);
  //     res.status(400).send("not valid user data");
  //   }
};

const deleteNews = async (req, res) => {
  // const deleteNew = JSON.parse(req.body);
  const deleteNewData = req.params;
  console.log("check data of delete new", deleteNewData);

  try {
    await deleteNew(deleteNewData);
    const updatedNews = await getAllNews();

    res.status(200).send(updatedNews);
  } catch (error) {
    console.log("not valid data", error);

    res.status(400).send("delete error");
  }
};

module.exports = {
  getNews,
  newNews,
  updateNews,
  deleteNews
};
