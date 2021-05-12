import http from 'http';
import https from 'https';

// Returns an average speed (if all goes well!)
function checkDownloadSpeed(url, testTimeout) {
    return makeRequest(url, testTimeout).catch(e => {
        throw new Error(e);
    });
}

function makeRequest(url, testTimeout) {
    let startTime;
    return new Promise((resolve, reject) => {
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
                resolve(mbps);
            });

            if (response.statusCode !== 200) {
                const error = new Error(response.statusCode);
                reject(error);
            }

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
                const bits = (buffer.length * 8).toFixed(2);
                const kbits = (bits / 1024).toFixed(2);
                const mbps = +(kbits / 1024 / duration).toFixed(2);
                resolve(mbps);
            });
        });
    });
}

export default checkDownloadSpeed;
