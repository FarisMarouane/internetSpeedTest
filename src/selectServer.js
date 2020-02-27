const iplocation = require('iplocation').default;
const chalk = require('chalk');

const { getExternalIpAddress } = require('./helpers.js');

async function getServeInfo() {
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

module.exports = { getServeInfo };
