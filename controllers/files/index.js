const { photoValidation } = require("../../services/validation/photo");
const { savePhotoToUser } = require("../../models/users");

const saveUserImage = async (req, res) => {
  const userId = req.params;
  const { originalname: photoName, size, buffer, filename } = req.file;
  const staticPath = path.join("upload", "photos");
  const staticPathToFile = path.join(staticPath, photoName);
  const uploadDir = path.join(process.cwd(), "/public", staticPath);

  try {
    await photoValidation(req.file);
    try {
      await access(uploadDir);
    } catch (error) {
      mkdir(uploadDir);
    }

    await rename(
      path.join(uploadDir, filename),
      path.join(uploadDir, photoName)
    );

    try {
      savePhotoToUser({ userId, src: staticPathToFile });
    } catch (error) {
      console.log("error in saving photo path", error);
      res.status(500).send("internal error");
    }
  } catch (error) {
    console.log("error in saveUserImage", error);
    res.status(500).send("not valid date");
  }
};

module.exports = { saveUserImage };
