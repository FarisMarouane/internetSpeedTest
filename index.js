#!/usr/bin/env node

const chalk = require('chalk');

const checkUploadSpeed = require('./uploadSpeed');
const checkDownloadSpeed = require('./downloadSpeed');
const printHelp = require('./printHelp');
const { DOWNLOAD_SERVERS, UPLOAD_SERVERS } = require('./constants');
const { getUrl } = require('./helpers');
const { getServeInfo } = require('./selectServer');

const { timeout } = require('./helpers');

const argument = process.argv[2];
const TEST_MAX_DURATION = 30_000;
const testTimeout = timeout(TEST_MAX_DURATION);

switch (argument) {
    case '--upload':
    case '-u':
        testUploadSpeed(testTimeout)
            .then(speed => {
                console.log(
                    chalk.green.inverse(
                        `Your internet upload speed is ${speed} mbps`,
                    ),
                );
                process.exit(0);
            })
            .catch(error => {
                console.log(chalk.red.inverse(error));
                process.exit(1);
            });
        break;
    case '--download':
    case '-d':
        testDownloadSpeed(testTimeout)
            .then(speed => {
                console.log(chalk.green.inverse(`Your internet download speed is ${speed} mbps`));
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
        process.exit(0);
        break;
}

async function testDownloadSpeed(testTimeout) {
    const { continent, latitude, longitude } = await getServeInfo();
    const url = getUrl(DOWNLOAD_SERVERS, latitude, longitude, continent);

    const speed = await checkDownloadSpeed(url, testTimeout);
    return speed;
}

async function testUploadSpeed(testTimeout) {
    const { continent, latitude, longitude } = await getServeInfo();
    const url = getUrl(UPLOAD_SERVERS, latitude, longitude, continent);

    const speed = await checkUploadSpeed(url, './bigFile', testTimeout);
    return speed;
}
