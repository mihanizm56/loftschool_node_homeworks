const fs = require('fs-extra');
const path = require('path');
const { walker } = require('./walker');
const { removeFolder } = require('./files-remover');

class HomeWorker {
  constructor (pathToRead, pathToCreate, initProjectPath) {
    this.pathToRead = pathToRead;
    this.pathToCreate = pathToCreate;
    this.initProjectPath = initProjectPath;
    this.normalizedPathToFolder = path.join(initProjectPath, '/', pathToRead);
    this.folderPath = path.join(initProjectPath, '/', pathToCreate);
  }

  init (deleteEntryFolder) {
    try {
      const isOutputFolderEmpty = this.checkIfDirIsEmpty(this.folderPath);

      if (!isOutputFolderEmpty) {
        removeFolder(this.folderPath);
        this.makeDir(this.folderPath);
      }
    } catch (error) {
      this.makeDir(this.folderPath);
    }

    walker(this.normalizedPathToFolder, this.saveFile.bind(this), err => {
      if (err) {
        console.log('err', err);
        return process.exit(1);
      }

      deleteEntryFolder && this.deleteDir(this.normalizedPathToFolder);
    });
  }

  checkIfDirIsEmpty (dirPath) {
    return !fs.readdirSync(dirPath).length;
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

  deleteDir (dirName) {
    fs.removeSync(dirName);
    console.log('remove done');
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

    fs.readdir(dirPathForItem, (error, items) => {
      if (error) {
        this.makeDir(dirPathForItem, () => {
          this.writeFile(
            path.join(dirPathForItem, '/', itemFullName),
            itemContent
          );
        });
      } else {
        this.writeFile(
          path.join(dirPathForItem, '/', itemFullName),
          itemContent
        );
      }

      done();
    });
  }
}

module.exports.HomeWorker = HomeWorker;
