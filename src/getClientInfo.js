import { default as iplocation } from 'iplocation';
import chalk from 'chalk';

import { getExternalIpAddress } from './helpers.js';

async function getClientInfo() {
    let ip;
    try {
        ip = await getExternalIpAddress();
    } catch (error) {
        console.log(chalk.red('An error occured while trying to get your IP address: ', error));
        process.exit(1);
    }

    const { timezone, latitude, longitude } = await iplocation(ip);

    const continent = timezone.split('/')[0];

    return {
        continent,
        latitude,
        longitude,
    };
}

export default getClientInfo;

// Add caching mecanism
