#!/usr/bin/env node

const chalk = require('chalk');

const checkUploadSpeed = require('./uploadSpeed');
const checkDownloadSpeed = require('./downloadSpeed');
const printHelp = require('./printHelp');
const { DOWNLOAD_SERVERS } = require('./constants');
const { getUrls } = require('./helpers');
const { getServeInfo } = require('./selectServer');

const { REMOTE_SERVER_UPLOAD, UPLOAD_FILE_SIZE } = require('./constants');

const argument = process.argv[2];

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
    testDownloadSpeed()
      .then(speed => {
        console.log(
          chalk.green.inverse(`Your internet download speed is ${speed} mbps`),
        );
        process.exit(0);
      })
      .catch(e => {
        console.log(chalk.red('Download speed test failed: ', e));
        process.exit(1);
      });
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

async function testDownloadSpeed() {
  const { continent, latitude, longitude } = await getServeInfo();
  const urls = getUrls(DOWNLOAD_SERVERS, latitude, longitude, continent);

  const speed = await checkDownloadSpeed(urls);
  return speed;
}
