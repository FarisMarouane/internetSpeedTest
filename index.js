#!/usr/bin/env node

const https = require('https');
const chalk = require('chalk');
const fs = require('fs');

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
  'https://cdn.pixabay.com/photo/2019/10/01/13/06/landscape-4518196_960_720.jpg',
  179773,
)
  .then(speed => {
    console.log(
      chalk.green.inverse(`Your internet download speed is ${speed} mbps`),
    );
  })
  .catch(error => {
    console.log(chalk.red.inverse(error));
  });

function checkUploadSpeed(baseUrl, fileSize) {
  let startTime;

  // An object of options to indicate where to post to
  var post_options = {
    host: baseUrl,
    port: '443',
    path: '/post',
    method: 'POST',
    headers: {
      'Content-Type': 'image/jpeg',
    },
  };
  return new Promise((resolve, reject) => {
    try {
      // Set up the request
      var post_req = https.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(body) {
          // console.log('Response: ' + body);
          const endTime = new Date().getTime();
          const duration = (endTime - startTime) / 1000;
          const bitsLoaded = fileSize * 8;
          console.log('bitsLoaded: ', bitsLoaded);
          const bps = (bitsLoaded / duration).toFixed(2);
          console.log('bps: ', bps);
          const kbps = (bps / 1024).toFixed(2);
          console.log('kbps: ', kbps);
          const mbps = (kbps / 1024).toFixed(2);
          resolve(mbps);
        });
      });

      post_req.on('error', err => {
        console.log(err);
        reject('The speed test has failed: ', err);
      });

      fs.readFile('./documents/landscape.jpg', (err, data) => {
        if (err) throw err;
        // console.log('READ DATA FROM FS: ', data);
        if (data) {
          post_req.write(data);
          startTime = new Date().getTime();
          post_req.end();
        } else {
          console.log('No data to post');
        }
      });
    } catch (error) {
      reject(' Catched error:', error);
    }
  });
}

checkUploadSpeed('postman-echo.com', 140889)
  .then(speed => {
    console.log(
      chalk.green.inverse(`Your internet upload speed is ${speed} mbps`),
    );
  })
  .catch(error => {
    console.log(chalk.red.inverse(error));
    process.exit(1);
  });
