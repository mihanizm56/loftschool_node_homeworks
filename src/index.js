const path = require('path');
const yargs = require('yargs');
const { HomeWorker } = require('./utils/HomeWorker');

const argv = yargs
  .usage('Usage: $0 [options]')
  .help('help')
  .alias('help', 'h')
  .version('0.0.1')
  .alias('version', 'v')
  .example(
    '$0 `--entry ./exampleDir --output output`',
    '--> parse files and write info to output.json'
  )
  .example(
    '$0 --entry ./exampleDir',
    '--> parse files and display info in console'
  )
  .option('entry', {
    alias: 'e',
    describe: 'The path of the source folder',
    demandOption: true
  })
  .option('output', {
    alias: 'o',
    describe: 'The filename of the output file',
    demandOption: true
  })
  .option('delete-source-folder', {
    alias: 'del',
    describe: 'Need to delete the resource folder'
  })
  .argv;

// console.log('argv', argv);

const initProjectPath = path.normalize(`${__dirname}/..`);
const pathToFolder = argv.entry;
const pathToNewFolder = argv.output;

const homeWork = new HomeWorker(pathToFolder, pathToNewFolder, initProjectPath);

homeWork.init();
