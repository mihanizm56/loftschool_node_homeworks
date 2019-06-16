const path = require('path');
const yargs = require('yargs');
const { HomeWorker } = require('./utils/HomeWorker');

const argv = yargs
  .usage('Usage: $0 [options]')
  .help('help')
  .alias('help', 'h')
  .example(
    '$0 `--entry ./entry-dir --output ./output-dir --delete-entry`',
    '--> parse files and write info to output.json with and delete the source folder'
  )
  .option('entry', {
    nargs: 1,
    alias: 'e',
    demand: 'Please specify entry file',
    describe: 'The path of the source folder'
  })
  .option('output', {
    nargs: 1,
    demand: 'Please specify output file',
    alias: 'o',
    describe: 'The filename of the output file'
  })
  .option('delete-entry', {
    alias: 'de',
    describe: 'Delete the entry folder',
    default: false,
    type: 'boolean'
  }).argv;

const initProjectPath = path.normalize(`${__dirname}/..`);
const pathToFolder = argv.entry;
const pathToNewFolder = argv.output;
const deleteEntryFolder = argv.deleteEntry;

const homeWork = new HomeWorker(pathToFolder, pathToNewFolder, initProjectPath, deleteEntryFolder);

homeWork.init();
