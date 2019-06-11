const fs = require("fs");
const path = require("path");

const initProjectPath = path.normalize(`${__dirname}/..`);
const pathToFolder = process.argv[2];
const pathToNewFolder = process.argv[3];

const normalizedPathToFolder = path.join(initProjectPath, "/", pathToFolder);
const folderPath = path.join(initProjectPath, "/", pathToNewFolder);

const writeFile = (filePath, content) => {
	return fs.writeFileSync(filePath, content);
};

const readFile = filePath => {
	return fs.readFileSync(filePath);
};

const walk = (dir, callbackOnFile, done) => {
	fs.readdir(dir, (err, list) => {
		if (err) return done(err);
		let i = 0;

		const next = function(err) {
			if (err) return done(err);

			let filePath = list[i++];

			if (!filePath) return done(null);

			filePath = path.join(dir, filePath);

			fs.stat(filePath, (_, stat) => {
				if (stat && stat.isDirectory()) {
					walk(filePath, callbackOnFile, next);
				} else {
					callbackOnFile(filePath, next);
				}
			});
		};

		next();
	});
};

const makeDir = (pathDir, callback) => {
	fs.mkdir(pathDir, { recursive: true }, err => {
		if (err) {
			if (err.code === "EEXIST") {
				if (callback) {
					callback();
				}

				return console.log("folder exists");
			}

			return console.log("get an error", err);
		}

		if (callback) {
			callback();
		}
	});
};

const deleteDir = dirName => {
	fs.remove(dirName, err => {
		console.error(err);
	});
	console.log("remove done");
};

const createFolderAndSaveFile = (filePath, done) => {
	const itemFullName = path.basename(filePath);
	const firstItemUpperCaseLetter = itemFullName[0].toUpperCase();
	const itemContent = readFile(filePath);
	const dirPathForItem = path.join(folderPath, "/", firstItemUpperCaseLetter);

	if (filePath) {
		makeDir(dirPathForItem, () => {
			writeFile(path.join(dirPathForItem, "/", itemFullName), itemContent);
		});
		done();
	}
};

makeDir(folderPath);

walk(normalizedPathToFolder, createFolderAndSaveFile, err => {
	if (err) {
		console.log("err", err);
		return process.exit(1);
	}
	console.log("Done!");
	deleteDir(folderPath);
});
