const https = require('https');
const http = require('http');

const { timeout } = require('./helpers');

const thresholds = [20, 20, 20];
const NUMBER_OF_REQUESTS = 1;
const TEST_MAX_DURATION = 30_000;

// Returns an average speed (if all goes well!)
function checkDownloadSpeed(urls) {
  const timer = timeout(TEST_MAX_DURATION);

  let promiseArr = [];

  promiseArr = urls.slice(0, NUMBER_OF_REQUESTS).map((url, i) => {
    return makeRequest(url, i, timer);
  });

  return Promise.all(promiseArr)
    .then(arr => {
      const average =
        arr.reduce((acc, curr) => {
          return acc + curr;
        }) / arr.length;
      return average.toFixed();
    })
    .catch(e => {
      throw new Error('checkDownloadSpeed: ', e);
    });
}

function makeRequest(url, counter, timer) {
  let startTime;
  return new Promise((resolve, reject) => {
    (url.includes('https') ? https : http).get(url, response => {
      timer
        .then(() => {
          response.destroy();
        })
        .catch(() => response.destroy());
      if (response.statusCode !== 200) {
        const error = new Error(
          'The speed test has failed',
          response.statusCode,
        );
        reject(error);
      }

      const arr = [];

      response.once('data', () => {
        startTime = new Date().getTime();
      });

      // Not all servers (due to availability) have files of the same sizes, hence the need to standarize
      response.on('data', chunk => {
        switch (counter) {
          case 0:
            if (Buffer.concat(arr).length <= thresholds[0] * 1_000_000) {
              // Times 1 million to get the number of bytes in millions
              arr.push(chunk);
              return;
            }
            break;
          case 1:
            if (Buffer.concat(arr).length <= thresholds[1] * 1_000_000) {
              arr.push(chunk);
              return;
            }
            break;
          case 2: {
            if (Buffer.concat(arr).length <= thresholds[2] * 1_000_000) {
              // 3 000 000
              arr.push(chunk);
              return;
            }
            break;
          }

          default:
            break;
        }
        response.destroy();
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
