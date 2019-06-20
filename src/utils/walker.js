const fs = require("fs");
const path = require("path");

const walker = (dir, callbackOnFile, callBackOnFolder) => {
  return new Promise((res, rej) => {
    fs.readdir(dir, (err, list) => {
      if (err) return rej(err);
      let i = 0;

      const next = () => {
        let filePath = list[i++];

        if (!filePath) {
          console.log("////////////////", dir, callBackOnFolder);
          // return callBackOnFolder
          //   ? callBackOnFolder(dir)
          //       .then(() => res(null))
          //       .catch(rej)
          return res(null);
        }

        filePath = path.join(dir, filePath);

        fs.stat(filePath, (err, stat) => {
          if (err) return rej(err);

          if (stat && stat.isDirectory()) {
            walker(filePath, callbackOnFile)
              .then(() => next())
              .catch(rej);
          } else {
            callbackOnFile(filePath)
              .then(() => next())
              .catch(rej);
          }
        });
      };

      next();
    });
  });
};

module.exports.walker = walker;
