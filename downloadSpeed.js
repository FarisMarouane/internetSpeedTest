const https = require('https');
const http = require('http');
const fs = require('fs');

function checkDownloadSpeed(url) {
  let startTime;

  if (url.includes('https')) {
    return new Promise((resolve, reject) => {
      try {
        return https.get(url, response => {
          const file = fs.createWriteStream('./documents/file');

          if (response.statusCode !== 200) {
            const error = new Error(
              'The speed test has failed',
              response.statusCode,
            );
            throw error;
          }

          response.once('data', () => {
            console.log('Once data');
            startTime = new Date().getTime();
          });

          response.on('data', data => {
            file.write(data);
          });

          const size = response.headers['content-length'];

          response.once('end', () => {
            const endTime = new Date().getTime();
            const duration = (endTime - startTime) / 1000;
            const bitsLoaded = size * 8;
            const bps = (bitsLoaded / duration).toFixed(2);
            const kbps = (bps / 1024).toFixed(2);
            const mbps = (kbps / 1024).toFixed(2);

            file.end();

            resolve(mbps);
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  } else {
    // http protocol
    return new Promise((resolve, reject) => {
      try {
        return http.get(url, response => {
          const file = fs.createWriteStream('./documents/file');

          if (response.statusCode !== 200) {
            const error = new Error(
              'The speed test has failed',
              response.statusCode,
            );
            throw error;
          }

          startTime = new Date().getTime();

          response.on('data', data => {
            file.write(data);
          });

          const size = response.headers['content-length'];

          response.once('end', () => {
            const endTime = new Date().getTime();
            const duration = (endTime - startTime) / 1000;
            const bitsLoaded = size * 8;
            const bps = (bitsLoaded / duration).toFixed(2);
            const kbps = (bps / 1024).toFixed(2);
            const mbps = (kbps / 1024).toFixed(2);

            file.end();

            resolve(mbps);
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = checkDownloadSpeed;
