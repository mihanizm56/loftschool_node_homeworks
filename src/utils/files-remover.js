const fs = require("fs");
const path = require("path");

function removeFolder(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(item => {
      const file_path = path.join(dirPath, item);
      if (fs.lstatSync(file_path).isDirectory()) {
        removeFolder(file_path);
      } else {
        fs.unlinkSync(file_path);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

module.exports.removeFolder = removeFolder;
