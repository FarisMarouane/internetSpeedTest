import chalk from 'chalk';
import printHelp from './printHelp';

import { DOWNLOAD_SERVERS, UPLOAD_SERVERS } from './constants';
import { getServerUrl, timeout } from './helpers';
import getClientInfo from './getClientInfo';

import bigFile from '../bigFile.random';

const argument = process.argv[2];
const TEST_MAX_DURATION = 45_000;
const testTimeout = timeout(TEST_MAX_DURATION);

switch (argument) {
    case '--upload':
    case '-u':
        testUploadSpeed()
            .then(speed => {
                console.log(chalk.green.inverse(`Your internet upload speed is ${speed} mbps`));
                process.exit(0);
            })
            .catch(error => {
                console.log(chalk.red('Upload speed test failed: ', error));
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
	Run internetSpeed -h for help`),
        );
        process.exit(0);
        break;
}

export async function testDownloadSpeed(testTimeout) {
    const { continent, latitude, longitude } = await getClientInfo();
    const url = getServerUrl(DOWNLOAD_SERVERS, latitude, longitude, continent);

    return import('./downloadSpeed').then(async ({ default: checkDownloadSpeed }) => {
        const speed = await checkDownloadSpeed(url, testTimeout);
        return speed;
    });
}

export async function testUploadSpeed() {
    const { continent, latitude, longitude } = await getClientInfo();
    const url = getServerUrl(UPLOAD_SERVERS, latitude, longitude, continent);

    return import('./uploadSpeed').then(async ({ default: checkUploadSpeed }) => {
        const speed = await checkUploadSpeed(url, bigFile);
        return speed;
    });
}
