var fs = require("fs");
const path = require("path");

if (process.argv.length <= 2) {
	console.log("Usage: " + __filename + " path/to/directory");
	process.exit(-1);
}

const repoPath = path.normalize(`${__dirname}/..`);
const pathToFolder = process.argv[2];
const pathToNewFolder = process.argv[3];

const normalizedPath = path.join(repoPath, "/", pathToFolder);
const folderPath = path.join(repoPath, "/", pathToNewFolder);

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

const writeFile = (filePath, content) => {
	fs.writeFile(filePath, content, err => {
		if (err) {
			console.error(err);
			return;
		}

		console.log("file created");
	});
};

const readFile = filePath => {
	fs.readFile(filePath, (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		console.log(data.toString());
	});
};

const readFiles = pathToFile => {
	if (pathToFile) {
		fs.readdir(pathToFile, function(err, items) {
			items.forEach(item => {
				const pathToItem = path.normalize(`${pathToFile}/${item}`);

				fs.stat(pathToItem, (err, stats) => {
					if (stats.isFile()) {
						const itemFullName = path.basename(pathToItem);
						const firstItemUpperCaseLetter = itemFullName[0].toUpperCase();
						const itemContent = readFile(pathToItem);
						const directoryPathForItem = path.join(
							folderPath,
							"/",
							firstItemUpperCaseLetter
						);

						makeDir(directoryPathForItem, () => {
							console.log("///", itemFullName);
							writeFile(
								path.join(directoryPathForItem, "/", itemFullName),
								itemContent
							);
						});
					} else if (stats.isDirectory()) {
						readFiles(pathToItem);
						// console.log("get folder");
					}
				});
			});
		});
	}
};

makeDir(folderPath);

readFiles(normalizedPath);
