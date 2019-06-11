const fs = require('fs-extra');
const path = require('path');

const walker = (dir, callbackOnFile, done) => {
  console.log('dir', dir);
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    let i = 0;

    const next = function (err) {
      if (err) return done(err);

      let filePath = list[i++];

      if (!filePath) return done(null);

      filePath = path.join(dir, filePath);

      fs.stat(filePath, (_, stat) => {
        if (stat && stat.isDirectory()) {
          walker(filePath, callbackOnFile, next);
        } else {
          callbackOnFile(filePath, next);
        }
      });
    };

    next();
  });
};

module.exports.walker = walker;
