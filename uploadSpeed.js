const https = require('https');
const fs = require('fs');

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
          const endTime = new Date().getTime();
          const duration = (endTime - startTime) / 1000;
          const bitsLoaded = fileSize * 8;
          const bps = (bitsLoaded / duration).toFixed(2);
          const kbps = (bps / 1024).toFixed(2);
          const mbps = (kbps / 1024).toFixed(2);
          resolve(mbps);
        });
      });

      post_req.on('error', err => {
        reject('The speed test has failed: ', err);
      });

      fs.readFile('./documents/landscape.jpg', (err, data) => {
        if (err) throw err;
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

module.exports = checkUploadSpeed;
