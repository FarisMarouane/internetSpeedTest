const https = require('https');
const http = require('http');

const thresholds = [20, 20, 20];
const NUMBER_OF_REQUESTS = 1;

// Returns an average speed (if all goes well!)
function checkDownloadSpeed(urls) {
  let promiseArr = [];
  let counter = 0;

  promiseArr = urls.slice(0, NUMBER_OF_REQUESTS).map(url => {
    return makeRequest(url, counter++);
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

function makeRequest(url, counter) {
  let startTime;
  return new Promise((resolve, reject) => {
    (url.includes('https') ? https : http).get(url, response => {
      if (response.statusCode !== 200) {
        const error = new Error(
          'The speed test has failed',
          response.statusCode,
        );
        reject(error);
      }

      const arr = [];

      response.once('data', () => {
        console.log(`Url ${url} started receiving data`);
        startTime = new Date().getTime();
      });

      // Not all servers (due to availability) have files of the same sizes, hence the need to standarize
      response.on('data', chunk => {
        if (url === 'http://ping.online.net/500Mo.dat') {
          // console.log('500 MB url is receiving data');
        }
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
              // console.log('500 MB threshold not passed');
              arr.push(chunk);
              return;
            }
            console.log('100 MB threshold PASSED!');
            const thresholdIntervalId = setInterval(() => {
              return console.log('100 MB threshold PASSED!');
            }, 1500);

            setTimeout(() => clearInterval(thresholdIntervalId), 15_000);
            break;
          }

          default:
            break;
        }
        response.destroy();
      });

      response.once('end', () => {
        console.log(`Url ${url} stopped receiving data`);
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
