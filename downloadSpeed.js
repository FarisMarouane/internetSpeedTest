const https = require('https');
const http = require('http');

// Returns an average speed (if all goes well!)
function checkDownloadSpeed(url, testTimeout) {
    return makeRequest(url, testTimeout).catch(e => {
        throw new Error('checkDownloadSpeed: ', e);
    });
}

function makeRequest(url, testTimeout) {
    let startTime;
    return new Promise((resolve, reject) => {
        (url.includes('https') ? https : http).get(url, response => {
            testTimeout
                .then(() => {
                    response.destroy();
                })
                .catch(() => response.destroy());
            if (response.statusCode !== 200) {
                const error = new Error('The speed test has failed', response.statusCode);
                reject(error);
            }

            const arr = [];

            response.once('data', () => {
                startTime = new Date().getTime();
            });

            response.on('data', chunk => {
                arr.push(chunk);
            });

            response.once('end', () => {
                const buffer = Buffer.concat(arr);
                const endTime = new Date().getTime();
                const duration = (endTime - startTime) / 1000;
                const bitsLoaded = buffer.length * 8;
                const bps = (bitsLoaded / duration).toFixed(2);
                const kbps = (bps / 1024).toFixed(2);
                const mbps = +(kbps / 1024).toFixed(2);
                resolve(mbps);
            });
        });
    });
}

module.exports = checkDownloadSpeed;
