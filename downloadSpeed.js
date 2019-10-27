const https = require('https');
const http = require('http');

// Returns an average speed (if all goes well!)
function checkDownloadSpeed(urls) {
  let promiseArr = [];

  promiseArr = urls.map(url => {
    return new Promise((resolve, reject) => {
      let startTime;

      if (!url.includes('https')) {
        http.get(url, response => {
          if (response.statusCode !== 200) {
            const error = new Error(
              'The speed test has failed',
              response.statusCode,
            );
            reject(error);
          }

          response.once('data', () => {
            startTime = new Date().getTime();
          });

          const size = response.headers['content-length'];

          response.once('end', () => {
            const endTime = new Date().getTime();
            const duration = (endTime - startTime) / 1000;
            const bitsLoaded = size * 8;
            const bps = (bitsLoaded / duration).toFixed(2);
            const kbps = (bps / 1024).toFixed(2);
            const mbps = +(kbps / 1024).toFixed(2);

            resolve(mbps);
          });
        });
      } else {
        https.get(url, response => {
          if (response.statusCode !== 200) {
            const error = new Error(
              'The speed test has failed',
              response.statusCode,
            );
            reject(error);
          }

          response.once('data', () => {
            startTime = new Date().getTime();
          });

          const size = response.headers['content-length'];

          response.once('end', () => {
            const endTime = new Date().getTime();
            const duration = (endTime - startTime) / 1000;
            const bitsLoaded = size * 8;
            const bps = (bitsLoaded / duration).toFixed(2);
            const kbps = (bps / 1024).toFixed(2);
            const mbps = +(kbps / 1024).toFixed(2);

            resolve(mbps);
          });
        });
      }
    });
  });

  return Promise.all(promiseArr)
    .then(arr => {
      const average = (arr[0] + arr[1]) / 2;
      return average.toFixed();
    })
    .catch(e => {
      throw new Error('checkDownloadSpeed: ', e);
    });
}

module.exports = checkDownloadSpeed;
