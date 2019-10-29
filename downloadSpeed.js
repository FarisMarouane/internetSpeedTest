const https = require('https');
const http = require('http');

const thresholds = [10, 100, 500];

// Returns an average speed (if all goes well!)
function checkDownloadSpeed(urls) {
  let promiseArr = [];
  let counter = 0;

  promiseArr = urls.map(url => {
    return new Promise((resolve, reject) =>
      makeRequest(url, counter, resolve, reject),
    );
  });

  return Promise.all(promiseArr)
    .then(arr => {
      console.log('Arr all: ', arr);
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

module.exports = checkDownloadSpeed;

function makeRequest(url, counter, resolve, reject) {
  let startTime;
  (!url.includes('https') ? http : https).get(url, response => {
    if (response.statusCode !== 200) {
      const error = new Error('The speed test has failed', response.statusCode);
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
          if (arr.length <= thresholds[0] * 1000000) {
            // Times 1 million to get MB
            arr.push(chunk);
            return;
          }
          break;
        case 1:
          if (arr.length <= thresholds[1] * 1000000) {
            arr.push(chunk);
            return;
          }
          break;
        case 2:
          if (arr.length <= thresholds[2] * 1000000) {
            arr.push(chunk);
            return;
          }
          break;
        default:
          break;
      }
      response.destroy();
    });

    response.once('end', () => {
      const buffer = Buffer.concat(arr);
      const endTime = new Date().getTime();
      const duration = (endTime - startTime) / 1000;
      const bitsLoaded = buffer.length;
      const bps = (bitsLoaded / duration).toFixed(2);
      const kbps = (bps / 1024).toFixed(2);
      const mbps = +(kbps / 1024).toFixed(2);

      resolve(mbps);
    });
  });
  counter++;
}
