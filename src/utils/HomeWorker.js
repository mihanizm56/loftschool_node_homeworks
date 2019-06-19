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
            // console.log("dir to remove", this.folderPath);
            this.removeDir(this.folderPath);
            // this.makeDir(this.folderPath);
          }
        });
      })
      .catch(() => {
        console.log("dir does not exist");
        this.makeDir(this.folderPath);
      });

    // if (isDirExists) {
    //   const isOutputFolderEmpty = this.checkIfDirIsEmpty(this.folderPath);

    //   if (!isOutputFolderEmpty) {
    //     this.removeDir(this.folderPath);
    //     this.makeDir(this.folderPath);
    //   }
    // } else {
    //   this.makeDir(this.folderPath);
    // }

    // walker(this.normalizedPathToFolder, this.saveFile.bind(this)).then(() => {
    //   console.log("finish");
    // });
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
    return fs.readFileSync(filePath);
  }

  writeFile(filePath, content) {
    return writeFile(filePath, content);
  }

  makeDir(pathDir) {
    return mkdir(pathDir);
  }

  removeDir(dirPath) {
    walker(
      dirPath,
      this.removeFiles.bind(this),
      this.removeFolders.bind(this)
    ).then(filePath => console.log("delete done"));

    // if (isDirExists) {
    //   fs.readdirSync(dirPath).forEach(item => {
    //     const filePath = path.join(dirPath, item);

    //     if (fs.lstatSync(filePath).isDirectory()) {
    //       this.removeDir(filePath);
    //     } else {
    //       fs.unlinkSync(filePath);
    //     }
    //   });
    //   fs.rmdirSync(dirPath);
    // }
  }

  removeFiles(pathToFile) {
    console.log("check pathToFile", pathToFile);
    return unlink(pathToFile);

    // });
    // console.log("filePath", filePath);
    // return lstat(filePath).then(statFile => {
    //   console.log("isDirectory", statFile.isDirectory());
    //   statFile.isDirectory() ? rmdir(filePath) : unlink(filePath);
    // });

    // console.log("to delete", filePath);
    // return unlink(filePath).then();
    // });
  }

  removeFolders(pathToFolder) {
    console.log("check removeFolders", pathToFolder);
    return rmdir(pathToFolder);

    // readdir(pathToFolders).forEach(item => {
    //   const folderPath = path.join(dirPath, item);

    //   if (fs.lstatSync(folderPath).isDirectory()) {
    //     this.removeDir(folderPath);
    //   }
    // });
    // fs.rmdirSync(dirPath);
  }

  saveFile(filePath) {
    return new Promise(resolve => {
      const itemFullName = path.basename(filePath);
      const firstItemUpperCaseLetter = itemFullName[0].toUpperCase();
      const itemContent = this.readFile(filePath);
      const dirPathForItem = path.join(
        this.folderPath,
        "/",
        firstItemUpperCaseLetter
      );
      const isDirExists = this.checkIfDirExists(dirPathForItem);

      if (isDirExists) {
        this.writeFile(
          path.join(dirPathForItem, "/", itemFullName),
          itemContent
        );
      } else {
        this.makeDir(dirPathForItem, () => {
          this.writeFile(
            path.join(dirPathForItem, "/", itemFullName),
            itemContent
          );
        });
      }

      if (this.deleteEntryFolder) {
        fs.unlinkSync(filePath);
      }

      resolve();
    });
  }
}

module.exports.HomeWorker = HomeWorker;
