const fs = require('fs-extra');
const path = require('path');
const { walker } = require('./walker');

class HomeWorker {
  constructor (pathToRead, pathToCreate, initProjectPath) {
    this.pathToRead = pathToRead;
    this.pathToCreate = pathToCreate;
    this.initProjectPath = initProjectPath;
    this.normalizedPathToFolder = path.join(initProjectPath, '/', pathToRead);
    this.folderPath = path.join(initProjectPath, '/', pathToCreate);
  }

  init () {
    this.deleteDir(this.folderPath);
    this.makeDir(this.folderPath);

    walker(
      this.normalizedPathToFolder,
      this.createFolderAndSaveFile.bind(this),
      err => {
        if (err) {
          console.log('err', err);
          return process.exit(1);
        }

        this.deleteDir(this.normalizedPathToFolder);
      }
    );
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
          if (callback) {
            callback();
          }

          return console.log('folder exists');
        }

        return console.log('get an error', err);
      }

      if (callback) {
        callback();
      }
    });
  }

  deleteDir (dirName) {
    fs.removeSync(dirName);
    console.log('remove done');
  }

  createFolderAndSaveFile (filePath, done) {
    const itemFullName = path.basename(filePath);
    const firstItemUpperCaseLetter = itemFullName[0].toUpperCase();
    const itemContent = this.readFile(filePath);
    const dirPathForItem = path.join(
      this.folderPath,
      '/',
      firstItemUpperCaseLetter
    );

    if (filePath) {
      this.makeDir(dirPathForItem, () => {
        this.writeFile(
          path.join(dirPathForItem, '/', itemFullName),
          itemContent
        );
      });
      done();
    }
  }
}

module.exports.HomeWorker = HomeWorker;
