const https = require('https');
const http = require('http');

function checkDownloadSpeed(url) {
  let startTime;

  if (url.includes('https')) {
    return new Promise(resolve => {
      return https.get(url, response => {
        if (response.statusCode !== 200) {
          const error = new Error(
            'The speed test has failed',
            response.statusCode,
          );
          throw error;
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
          const mbps = (kbps / 1024).toFixed(2);

          resolve(mbps);
        });
      });
    });
  } else {
    // http protocol
    return new Promise(resolve => {
      return http.get(url, response => {
        if (response.statusCode !== 200) {
          throw new Error('The speed test has failed', response.statusCode);
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
          const mbps = (kbps / 1024).toFixed(2);

          resolve(mbps);
        });
      });
    });
  }
}

module.exports = checkDownloadSpeed;
