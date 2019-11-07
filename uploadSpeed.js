const request = require('request');
const fs = require('fs');

function checkUploadSpeed(url, file, timeout) {
    let startTime;
    const readStream = fs.createReadStream(file);
    let fileSize = fs.statSync(file)['size']; // In bytes

    let counter = 0;

    const post_options = {
        url,
        method: 'POST',
        headers: {
            'Content-Length': fileSize,
            'Content-Type': 'application/octet-stream',
        },
    };

    return new Promise((resolve, reject) => {
        const post_req = request.post(post_options, function(err, response) {
            if (err) {
                reject(`An error occured while uploading data1: ${err}`);
            }
            if (response?.statusCode === 200) {
                const endTime = new Date().getTime();
                const duration = (endTime - startTime) / 1000;
                const bitsUploaded = fileSize * 8;
                const bps = (bitsUploaded / duration).toFixed(2);
                const kbps = (bps / 1024).toFixed(2);
                const mbps = (kbps / 1024).toFixed(2);
                resolve(mbps);
            } else {
                reject(
                    `An error occured while uploading data: ${response?.statusCode}`,
                );
            }

            response?.on('error', e =>
                reject(`An error occured while uploading data2: ${e}`),
            );
        });

        post_req.on('end', () => console.log('post_req ended'));

        post_req.on('error', e =>
            reject(`An error occured while uploading data3: ${e}`),
        );

        readStream.on('error', e => console.log('readStream err: ', e));

        readStream.on('end', () => console.log('readStream ended'));

        readStream.on('data', () => {
            if (counter++ === 0) startTime = new Date().getTime();
        });

        readStream.pipe(post_req);

        timeout
            .then(() => {
                post_req.end();
            })
            .catch(e => console.log('Timeout err: ', e));
    });
}

module.exports = checkUploadSpeed;
