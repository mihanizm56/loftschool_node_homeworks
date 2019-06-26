const multer = require("multer");
const path = require("path");
const PATH_TO_FOLDER_PHOTO = "public/assets/img/products";
let fileName;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH_TO_FOLDER_PHOTO);
  },
  filename: (req, file, cb) => {
    fileName = file.fieldname + "-" + Date.now() + ".jpg";
    cb(null, fileName);
  }
});

const uploadFile = multer({ storage }).single("photo");

module.exports = (req, res) => {
  return new Promise((resolve, reject) => {
    uploadFile(req, res, error => {
      const { file, body } = req;
      const fullPathToPhoto = path.join(PATH_TO_FOLDER_PHOTO, fileName);
      const relPathToPhoto = fullPathToPhoto.substr(
        fullPathToPhoto.indexOf("\\")
      );

      error && reject(error);

      if (file && body) {
        resolve({ path: relPathToPhoto, body });
      }

      reject({ message: "no data" });
    });
  });
};
