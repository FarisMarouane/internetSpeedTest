const { promisify } = require('util');
const getIP = promisify(
  require('external-ip')({
    timeout: 8000,
    getIP: 'parallel',
    verbose: false,
  }),
);
const haversine = require('haversine');

async function getExternalIpAddress() {
  let ip = await getIP(); //Ip v4;

  return ip;
}

function getUrls(servers, latitude, longitude, continent) {
  const continentServers = servers[continent.toLowerCase()];

  let distance = haversine(
    { latitude, longitude },
    continentServers[0].geoLocalisation,
  );
  let urls = undefined;

  continentServers.forEach(server => {
    const calculatedDistance = haversine(
      { latitude, longitude },
      server.geoLocalisation,
    );
    if (calculatedDistance <= distance) {
      distance = calculatedDistance;
      urls = server.urls;
    }
  });

  return urls;
}

function timeout(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
}

module.exports = {
  getExternalIpAddress,
  getUrls,
  timeout,
};
