const mongoose = require("mongoose");
const { News } = require("./model");
const {
  makeHashedPassword,
  compareHashedPasswords
} = require("../../services/passwords");

const NewsModel = mongoose.model("News");

const addNew = ({ theme, date, text, userId, id }) =>
  (newUser = new NewsModel({
    theme,
    date,
    text,
    userId,
    id
  }));

const getAllNews = () => NewsModel.find();

const getNew = ({ theme, date, text, userId }) =>
  NewsModel.findOne({ theme, date, text, userId });

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
