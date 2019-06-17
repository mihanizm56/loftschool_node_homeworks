const fs = require('fs');
const path = require('path');
const { walker } = require('./walker');

class HomeWorker {
  constructor (pathToRead, pathToCreate, initProjectPath, deleteEntryFolder) {
    this.pathToRead = pathToRead;
    this.pathToCreate = pathToCreate;
    this.initProjectPath = initProjectPath;
    this.deleteEntryFolder = deleteEntryFolder;
    this.normalizedPathToFolder = path.join(initProjectPath, '/', pathToRead);
    this.folderPath = path.join(initProjectPath, '/', pathToCreate);
  }

  init () {
    const isDirExists = this.checkIfDirExists(this.folderPath)

    if(isDirExists){
      const isOutputFolderEmpty = this.checkIfDirIsEmpty(this.folderPath);

      if (!isOutputFolderEmpty) {
        this.removeDir(this.folderPath);
        this.makeDir(this.folderPath);
      }
    } else {
      this.makeDir(this.folderPath);
    }

    walker(this.normalizedPathToFolder, this.saveFile.bind(this), err => {
      if (err) {
        console.log('catch an error!');
        return process.exit(1);
      }

      this.deleteEntryFolder && this.removeDir(this.normalizedPathToFolder);
    });
  }

  checkIfDirExists(dirPath){
    return fs.existsSync(dirPath)
  }

  checkIfDirIsEmpty (dirPath) {
    return !Boolean(fs.readdirSync(dirPath).length)
  }

  readFile (filePath) {
    return fs.readFileSync(filePath);
  }

  writeFile (filePath, content) {
    return fs.writeFileSync(filePath, content);
  }

  makeDir (pathDir, callback) {
    fs.mkdir(pathDir, { recursive: true }, err => {
      if (err) {
        if (err.code === 'EEXIST') {
          return callback && callback();
        }

        return;
      }

      callback && callback();
    });
  }

  removeDir (dirPath) {
    const isDirExists = this.checkIfDirExists(this.folderPath)

    if (isDirExists) {
      fs.readdirSync(dirPath).forEach(item => {
        const filePath = path.join(dirPath, item);
        if (fs.lstatSync(filePath).isDirectory()) {
          this.removeDir(filePath);
        } else {
          fs.unlinkSync(filePath);
        }
      });
      fs.rmdirSync(dirPath);
    }
  }

  saveFile (filePath, done) {
    const itemFullName = path.basename(filePath);
    const firstItemUpperCaseLetter = itemFullName[0].toUpperCase();
    const itemContent = this.readFile(filePath);
    const dirPathForItem = path.join(
      this.folderPath,
      '/',
      firstItemUpperCaseLetter
    );
    const isDirExists = this.checkIfDirExists(dirPathForItem)

    if (isDirExists) {
      this.writeFile(
        path.join(dirPathForItem, '/', itemFullName),
        itemContent
      );
    } else {
      this.makeDir(dirPathForItem, () => {
        this.writeFile(
          path.join(dirPathForItem, '/', itemFullName),
          itemContent
        );
      });
    }

    if(this.deleteEntryFolder){
      fs.unlinkSync(filePath);
    }

    done();
  }
}

module.exports.HomeWorker = HomeWorker;
