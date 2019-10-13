// const publicIp = require('public-ip');
const { promisify } = require('util'); //<-- Require promisify
const getIP = promisify(require('external-ip')());

async function getExternalIpAddress() {
  const ip = await getIP(); //Ip v4

  return ip;
}

function getUrl(servers, ...regions) {
  const keys = regions.map(k => k.toLowerCase());
  console.log('keys: ', keys);
  return servers[keys[0]][keys[1]];
}

module.exports = {
  getExternalIpAddress,
  getUrl,
};
