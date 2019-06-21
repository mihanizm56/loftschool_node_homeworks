const path = require("path");
const { walker } = require("./walker");
const {
  access,
  readdir,
  readFile,
  writeFile,
  mkdir,
  rmdir,
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
    access(this.pathToRead)
      .then(() => {
        return access(this.folderPath)
          .then(() => {
            console.log("dir exists");
            this.checkIfDirIsEmpty(this.folderPath).then(isEmpty => {
              console.log("isEmpty", isEmpty);
              if (!isEmpty) {
                this.removeDirRecursive(this.folderPath)
                  .then(() => mkdir(this.folderPath))
                  .then(() => {
                    console.log("start walker if not isEmpty");
                    this.walkToSaveFiles();
                  });
              } else {
                console.log("start walker if isEmpty");
                this.walkToSaveFiles();
              }
            });
          })
          .catch(() => {
            console.log("dir does not exist");
            mkdir(this.folderPath).then(() => {
              console.log("start walker if not exists");
              this.walkToSaveFiles();
            });
          });
      })
      .catch(error => console.log("input folder doesnt exists"));
  }

  walkToSaveFiles() {
    return walker(
      this.normalizedPathToFolder,
      this.saveFile.bind(this),
      this.deleteEntryFolder && this.removeDirRecursive.bind(this)
    ).then(() => {
      console.log("finish work");
    });
  }

  checkIfDirIsEmpty(dirPath) {
    return readdir(dirPath).then(arrayOfFiles => !Boolean(arrayOfFiles.length));
  }

  removeDirRecursive(dirPath) {
    return walker(dirPath, unlink, rmdir)
      .then(filePath => console.log("delete done"))
      .catch(error => console.log("error in walker", error));
  }

  saveFile(filePath) {
    const itemFullName = path.basename(filePath);
    const firstItemUpperCaseLetter = itemFullName[0].toUpperCase();
    const dirPathForItem = path.join(
      this.folderPath,
      "/",
      firstItemUpperCaseLetter
    );

    return access(dirPathForItem)
      .then(isDirExists => {
        readFile(filePath).then(itemContent => {
          writeFile(path.join(dirPathForItem, "/", itemFullName), itemContent);
        });
      })
      .catch(() => {
        mkdir(dirPathForItem)
          .then(() => readFile(filePath))
          .then(itemContent => {
            writeFile(
              path.join(dirPathForItem, "/", itemFullName),
              itemContent
            );
          })
          .catch(error => console.log("ERR", error));
      });
  }
}

module.exports.HomeWorker = HomeWorker;
