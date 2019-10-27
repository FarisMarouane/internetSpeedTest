const iplocation = require('iplocation').default;
const chalk = require('chalk');

const { getExternalIpAddress } = require('./helpers');

async function getServeInfo() {
  const ip = await getExternalIpAddress().catch(e => {
    console.log(
      chalk.red('An error occured while trying to get your IP address: ', e),
    );
    process.exit(1);
  });
  const { timezone, latitude, longitude } = await iplocation(ip);

  const continent = timezone.split('/')[0];

  return {
    continent,
    latitude,
    longitude,
  };
}

module.exports = { getServeInfo };
