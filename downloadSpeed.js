const https = require('https');
const http = require('http');

// Returns an average speed (if all goes well!)
function checkDownloadSpeed(urls) {
  let promiseArr = [];

  promiseArr = urls.map(url => {
    return new Promise((resolve, reject) => makeRequest(url, resolve, reject));
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

function makeRequest(url, resolve, reject) {
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
      if (arr.length <= 500000000) {
        // 500 Mo
        arr.push(chunk);
        return;
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
}
