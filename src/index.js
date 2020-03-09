import chalk from 'chalk';
import printHelp from './printHelp';

import { DOWNLOAD_SERVERS, UPLOAD_SERVERS } from './constants';
import { getUrl, timeout } from './helpers';
import getServeInfo from './selectServer.js';

const argument = process.argv[2];
const TEST_MAX_DURATION = 30_000;
const testTimeout = timeout(TEST_MAX_DURATION);

switch (argument) {
    case '--upload':
    case '-u':
        testUploadSpeed(testTimeout)
            .then(speed => {
                console.log(chalk.green.inverse(`Your internet upload speed is ${speed} mbps`));
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

    return import('./downloadSpeed').then(async ({ default: checkDownloadSpeed }) => {
        const speed = await checkDownloadSpeed(url, testTimeout);
        return speed;
    });
}

async function testUploadSpeed(testTimeout) {
    const { continent, latitude, longitude } = await getServeInfo();
    const url = getUrl(UPLOAD_SERVERS, latitude, longitude, continent);

    return import('./uploadSpeed').then(async ({ default: checkUploadSpeed }) => {
        const speed = await checkUploadSpeed(url, '../bigFile', testTimeout);
        return speed;
    });
}
