const fs = require("fs");
const path = require("path");
const { walker } = require("./walker");
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

class HomeWorker {
  constructor(pathToRead, pathToCreate, initProjectPath, deleteEntryFolder) {
    this.pathToRead = pathToRead;
    this.pathToCreate = pathToCreate;
    this.initProjectPath = initProjectPath;
    this.deleteEntryFolder = deleteEntryFolder;
    this.normalizedPathToFolder = path.join(initProjectPath, "/", pathToRead);
    this.folderPath = path.join(initProjectPath, "/", pathToCreate);
  }

  init() {
    this.checkIfDirExists(this.folderPath)
      .then(() => {
        console.log("dir exists");
        this.checkIfDirIsEmpty(this.folderPath).then(isEmpty => {
          console.log("isEmpty", isEmpty);
          if (!isEmpty) {
            this.removeDir(this.folderPath)
              .then(() => {
                this.makeDir(this.folderPath);
              })
              .then(
                () =>
                  console.log("start walker if not isEmpty") ||
                  walker(
                    this.normalizedPathToFolder,
                    this.saveFile.bind(this),
                    this.deleteEntryFolder && this.removeDir.bind(this)
                  ).then(() => {
                    console.log("finish work");
                  })
              );
          } else {
            console.log("start walker if isEmpty");
            walker(
              this.normalizedPathToFolder,
              this.saveFile.bind(this),
              this.deleteEntryFolder && this.removeDir.bind(this)
            ).then(() => {
              console.log("finish work");
            });
          }
        });
      })
      .catch(() => {
        console.log("dir does not exist");
        this.makeDir(this.folderPath).then(
          () =>
            console.log("start walker if not exists") ||
            walker(
              this.normalizedPathToFolder,
              this.saveFile.bind(this),
              this.deleteEntryFolder && this.removeDir.bind(this)
            ).then(() => {
              console.log("finish work");
            })
        );
      });
  }

  checkIfDirExists(dirPath) {
    return access(dirPath);
  }

  checkIfDirIsEmpty(dirPath) {
    return readdir(dirPath).then(arrayOfFiles => {
      const isDirEmpty = !Boolean(arrayOfFiles.length);
      return isDirEmpty;
    });
  }

  readFile(filePath) {
    return readFile(filePath);
  }

  writeFile(filePath, content) {
    return writeFile(filePath, content);
  }

  makeDir(pathDir) {
    return mkdir(pathDir);
  }

  removeDir(dirPath) {
    return walker(
      dirPath,
      this.removeFile.bind(this),
      this.removeFolder.bind(this)
    )
      .then(filePath => console.log("delete done"))
      .catch(error => console.log("error in walker", error));
  }

  removeFile(pathToFile) {
    console.log("check removeFile", path.basename(pathToFile));
    return unlink(pathToFile);
  }

  removeFolder(pathToFolder) {
    console.log("check removeFolder", path.basename(pathToFolder));
    return rmdir(pathToFolder);
  }

  saveFile(filePath) {
    const itemFullName = path.basename(filePath);
    const firstItemUpperCaseLetter = itemFullName[0].toUpperCase();
    const dirPathForItem = path.join(
      this.folderPath,
      "/",
      firstItemUpperCaseLetter
    );
    return this.readFile(filePath)
      .then(dirPathForItem => {
        return this.checkIfDirExists(dirPathForItem);
      })
      .then(
        isDirExists => {
          this.readFile(filePath)
            .then(() => {
              return this.readFile(filePath);
            })
            .then(itemContent => {
              this.writeFile(
                path.join(dirPathForItem, "/", itemFullName),
                itemContent
              );
            });
        },
        () => {
          this.makeDir(dirPathForItem)
            .catch(error => error)
            .then(() => {
              return this.readFile(filePath);
            })
            .then(itemContent => {
              this.writeFile(
                path.join(dirPathForItem, "/", itemFullName),
                itemContent
              );
            })
            .catch(error => console.log("ERR", error));
        }
      );
  }
}

module.exports.HomeWorker = HomeWorker;
