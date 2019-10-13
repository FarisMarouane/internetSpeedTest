const https = require('https');
const http = require('http');
const fs = require('fs');
const detectCharacterEncoding = require('detect-character-encoding');

function checkDownloadSpeed(url) {
  let startTime;

  if (url.startsWith('http')) {
    return new Promise((resolve, reject) => {
      try {
        return http.get(url, response => {
          // response.setEncoding('utf-32be');
          const file = fs.createWriteStream('./documents/file');

          if (response.statusCode !== 200) {
            const error = new Error(
              'The speed test has failed',
              response.statusCode,
            );
            throw error;
          }

          startTime = new Date().getTime();
          const arrBuff = Buffer.alloc(1000000);

          response.on('data', data => {
            file.write(data);
            // Buffer.concat([arrBuff, data]);
          });

          const size = response.headers['content-length'];

          response.once('end', () => {
            const endTime = new Date().getTime();
            const duration = (endTime - startTime) / 1000;
            const bitsLoaded = size * 8;
            // const bitsLoaded = size;
            const bps = (bitsLoaded / duration).toFixed(2);
            const kbps = (bps / 1024).toFixed(2);
            const mbps = (kbps / 1024).toFixed(2);

            const charsetMatch = detectCharacterEncoding(arrBuff);

            console.log('charsetMatch !!! ', charsetMatch);

            file.end();

            resolve(mbps);
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  if (url.startsWith('https')) {
    return new Promise((resolve, reject) => {
      try {
        return https.get(url, response => {
          // response.setEncoding('utf-32be');
          const file = fs.createWriteStream('./documents/file');

          if (response.statusCode !== 200) {
            const error = new Error(
              'The speed test has failed',
              response.statusCode,
            );
            throw error;
          }

          startTime = new Date().getTime();
          const arrBuff = Buffer.alloc(1000000);

          response.on('data', data => {
            file.write(data);
            // Buffer.concat([arrBuff, data]);
          });

          const size = response.headers['content-length'];

          response.once('end', () => {
            const endTime = new Date().getTime();
            const duration = (endTime - startTime) / 1000;
            const bitsLoaded = size * 8;
            // const bitsLoaded = size;
            const bps = (bitsLoaded / duration).toFixed(2);
            const kbps = (bps / 1024).toFixed(2);
            const mbps = (kbps / 1024).toFixed(2);

            const charsetMatch = detectCharacterEncoding(arrBuff);

            console.log('charsetMatch !!! ', charsetMatch);

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
