const path = require("path");
const {
  access,
  readdir,
  readFile,
  writeFile,
  mkdir,
  lstat,
  rmdir,
  stat,
  unlink
} = require("./onPromises");

class Copier {
  constructor({ arrayToCopy }) {
    this.arrayToCopy = arrayToCopy;
  }

  init() {
    const arrayOfPromises = this.arrayToCopy.map(pathsPair =>
      this.copyMethod(pathsPair)
    );

    Promise.all(arrayOfPromises).then(() => console.log("copied"));
  }

  copyMethod({ from, to }) {
    return access(from)
      .then(() =>
        mkdir(to)
          .then(() => this.copyPaste(from, to))
          .catch(error => console.log("error", error))
      )
      .catch(error => console.log("get error in to path, made new one", error));
  }

  copyPaste(from, to) {
    readdir(from).then(files => {
      files.forEach(file => {
        const pathToCopyFile = path.join(from, file);
        const pathToPasteFile = path.join(to, file);

        stat(pathToCopyFile).then(fileStat => {
          if (fileStat.isDirectory()) {
            const pathToDir = path.join(to, file);
            return access(pathToDir)
              .then(() => this.copyPaste(pathToCopyFile, pathToDir))
              .catch(() => mkdir(pathToDir))
              .then(() => this.copyPaste(pathToCopyFile, pathToDir));
          } else {
            return readFile(pathToCopyFile).then(content =>
              writeFile(pathToPasteFile, content)
            );
          }
        });
      });
    });
  }
}

module.exports = Copier;
