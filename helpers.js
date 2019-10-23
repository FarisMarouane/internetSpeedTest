const { promisify } = require('util');
const getIP = promisify(
  require('external-ip')({
    timeout: 8000,
    getIP: 'parallel',
    verbose: true,
  }),
);
const haversine = require('haversine');

async function getExternalIpAddress() {
  let ip;

  try {
    ip = await getIP(); //Ip v4
  } catch (error) {
    console.log('OAOA: ', error);
    process.exit(1);
  }

  return ip;
}

function getUrl(servers, latitude, longitude, continent) {
  const continentServers = servers[continent.toLowerCase()];
  console.log('continentServers: ', continentServers);

  let distance = haversine(
    { latitude, longitude },
    continentServers[0].geoLocalisation,
  );
  let url = undefined;

  continentServers.forEach(server => {
    const calculatedDistance = haversine(
      { latitude, longitude },
      server.geoLocalisation,
    );
    console.log('calculatedDistance: ', calculatedDistance);
    if (calculatedDistance <= distance) {
      distance = calculatedDistance;
      url = server.url;
    }
  });

  return url;
}

module.exports = {
  getExternalIpAddress,
  getUrl,
};
