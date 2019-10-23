const iplocation = require('iplocation').default;

const { getExternalIpAddress } = require('./helpers');

async function getServeInfo() {
  const ip = await getExternalIpAddress();
  const { timezone, latitude, longitude } = await iplocation(ip);

  const continent = timezone.split('/')[0];

  console.log('continent: ', continent);

  return {
    continent,
    latitude,
    longitude,
  };
}

module.exports = { getServeInfo };
