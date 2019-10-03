#!/usr/bin/env node

const https = require('https');
const chalk = require('chalk');

function checkDownloadSpeed(baseUrl, fileSize) {
  let startTime;
  return new Promise((resolve, reject) => {
    try {
      return https.get(baseUrl, response => {
        if (response.statusCode !== 200) {
          const error = new Error('The speed test has failed');
          throw error;
        }
        response.once('data', () => {
          startTime = new Date().getTime();
        });

        response.once('end', () => {
          const endTime = new Date().getTime();
          const duration = (endTime - startTime) / 1000;
          const bitsLoaded = fileSize * 8;
          const bps = (bitsLoaded / duration).toFixed(2);
          const kbps = (bps / 1024).toFixed(2);
          const mbps = (kbps / 1024).toFixed(2);
          resolve(mbps);
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}

checkDownloadSpeed(
  'https://pixabay.com/photos/landscape-ice-aurora-borealis-cold-4508444/',
  140889,
)
  .then(speed => {
    console.log(chalk.green.inverse(`Your internet speed is ${speed} mbps`));
  })
  .catch(error => {
    console.log(chalk.red.inverse(error));
  });
