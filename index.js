#!/usr/bin/env node

const chalk = require('chalk');

const checkUploadSpeed = require('./uploadSpeed');
const checkDownloadSpeed = require('./downloadSpeed');
const printHelp = require('./printHelp');
const { DOWNLOAD_SERVERS } = require('./constants');
const { getUrl } = require('./helpers');
const { getServeInfo } = require('./selectServer');

const { REMOTE_SERVER_UPLOAD, UPLOAD_FILE_SIZE } = require('./constants');

const argument = process.argv[2];

try {
  switch (argument) {
    case '--upload':
    case '-u':
      checkUploadSpeed(REMOTE_SERVER_UPLOAD, UPLOAD_FILE_SIZE)
        .then(speed => {
          console.log(
            chalk.green.inverse(`Your internet upload speed is ${speed} mbps`),
          );
        })
        .catch(error => {
          console.log(chalk.red.inverse(error));
          process.exit(1);
        });
      break;
    case '--download':
    case '-d':
      testDownloadSpeed();
      break;
    case '--help':
    case '-h':
      printHelp();
      break;
    default:
      console.log(
        chalk.red(`You need to need to provide a valid argument to the command.
	Run speedTest -h for help`),
      );
      process.exit(1);
      break;
  }
} catch (error) {
  console.log('ShITTY ERROR: ', error);
}

async function testDownloadSpeed() {
  try {
    const { continent, countryCode } = await getServeInfo();
    const url = getUrl(DOWNLOAD_SERVERS, continent, countryCode);

    console.log('URL: ', url);

    const speed = await checkDownloadSpeed(url);
    console.log(
      chalk.green.inverse(`Your internet download speed is ${speed} mbps`),
    );
  } catch (error) {
    console.log(chalk.red.inverse(error));
    process.exit(1);
  }
}
