import http from 'http';
import https from 'https';
import { Observable, from } from 'rxjs';

import { getServerUrl } from './helpers';
import getClientInfo from './getClientInfo';
import { DOWNLOAD_SERVERS } from './constants';

async function checkDownloadSpeed(testTimeout) {
    const { continent, latitude, longitude } = await getClientInfo();
    const url = getServerUrl(DOWNLOAD_SERVERS, latitude, longitude, continent);

    return makeRequest(url, testTimeout);
}

function makeRequest(url, testTimeout) {
    let startTime;
    return new Observable(subscriber => {
        (url.includes('https') ? https : http).get(url, response => {
            const arr = [];

            testTimeout.then(() => {
                response.destroy();
                const buffer = Buffer.concat(arr);
                const endTime = new Date().getTime();
                const duration = (endTime - startTime) / 1000;
                const bits = (buffer.length * 8).toFixed(2);
                const kbits = (bits / 1024).toFixed(2);
                const mbps = +(kbits / 1024 / duration).toFixed(2);

                subscriber.next(mbps);
                subscriber.complete();
            });

            if (response.statusCode !== 200) {
                const error = new Error(`Response error with status code: ${response.statusCode}`);

                subscriber.error(error);
            }

            response.once('data', () => {
                startTime = new Date().getTime();
            });

            response.on('data', chunk => {
                arr.push(chunk);
                const buffer = Buffer.concat(arr);
                const endTime = new Date().getTime();
                const duration = (endTime - startTime) / 1000;
                const bits = (buffer.length * 8).toFixed(2);
                const kbits = (bits / 1024).toFixed(2);
                const mbps = +(kbits / 1024 / duration).toFixed(2);

                subscriber.next(mbps);
            });

            response.once('end', () => {
                const buffer = Buffer.concat(arr);
                const endTime = new Date().getTime();
                const duration = (endTime - startTime) / 1000;
                const bits = (buffer.length * 8).toFixed(2);
                const kbits = (bits / 1024).toFixed(2);
                const mbps = +(kbits / 1024 / duration).toFixed(2);

                subscriber.next(mbps);
                subscriber.complete();
            });
        });
    });
}

function testDownloadSpeed(testTimeout) {
    return from(checkDownloadSpeed(testTimeout));
}

export default testDownloadSpeed;
