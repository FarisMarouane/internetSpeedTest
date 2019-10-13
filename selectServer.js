const iplocation = require('iplocation').default;

const { getExternalIpAddress } = require('./helpers');

async function getServeInfo() {
  console.log('getServeInfo called');
  const ip = await getExternalIpAddress();
  console.log('serverInfo ip: ', ip);
  const { timezone, countryCode } = await iplocation(ip);

  const continent = timezone.split('/')[0];

  console.log('continent: ', continent);
  console.log('countryCode: ', countryCode);

  return {
    continent,
    countryCode,
  };
}

module.exports = { getServeInfo };
