const fs = require('fs');
const path = require('path');

function removeFolder (dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(item => {
      const filePath = path.join(dirPath, item);
      if (fs.lstatSync(filePath).isDirectory()) {
        removeFolder(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

module.exports.removeFolder = removeFolder;
