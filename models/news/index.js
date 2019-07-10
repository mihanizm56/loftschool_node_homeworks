const mongoose = require("mongoose");
const { News } = require("./model");
const {
  makeHashedPassword,
  compareHashedPasswords
} = require("../../services/passwords");

const NewsModel = mongoose.model("News");

const addNew = newNew => (newUser = new NewsModel(newNew));

const getAllNews = () => NewsModel.find();

const getNew = newData => NewsModel.findOne(newData);

const updateNew = ({
  prevTheme,
  prevDate,
  prevUserId,
  newTheme,
  newDate,
  newText,
  newUserId
}) =>
  NewsModel.findOneAndUpdate(
    { theme: prevTheme, date: prevDate, userId: prevUserId },
    { theme: newTheme, date: newDate, text: newText, userId: newUserI }
  );

const deleteNew = ({ id }) => NewsModel.deleteOne({ id });

module.exports = {
  addNew,
  getAllNews,
  getNew,
  updateNew,
  deleteNew
};
