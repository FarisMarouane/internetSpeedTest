import { promisify } from 'util';
const getIP = promisify(
    require('external-ip')({
        timeout: 8000,
        getIP: 'parallel',
        verbose: false,
    }),
);
import haversine from 'haversine';

export function getExternalIpAddress() {
    return getIP(); //Ip v4;
}

export function getServerUrl(servers, latitude, longitude, continent) {
    const continentServers = servers[continent.toLowerCase()];

    let distance = haversine({ latitude, longitude }, continentServers[0].geoLocalisation);
    let url;

    continentServers.forEach(server => {
        const calculatedDistance = haversine({ latitude, longitude }, server.geoLocalisation);
        if (calculatedDistance <= distance) {
            distance = calculatedDistance;
            url = server.url;
        }
    });

    return url;
}

export function timeout(ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms);
    });
}
