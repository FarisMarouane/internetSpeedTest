import request from 'request';
import fs from 'fs';
import path from 'path';

function checkUploadSpeed(url, file) {
    let startTime;
    const filePath = path.join(__dirname, `/${file}`);
    const readStream = fs.createReadStream(filePath);
    let fileSize = fs.statSync(filePath)['size']; // In bytes

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
                reject(`An error occured while uploading data: ${err}`);
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
                reject(`An error occured while uploading data:: ${response?.statusCode}`);
            }
        });

        post_req.on('error', e => reject(`An error occured while uploading data: ${e}`));

        readStream.on('error', e => reject(`An error occured while uploading data: ${e}`));

        readStream.on('data', () => {
            if (counter++ === 0) startTime = new Date().getTime();
        });

        readStream.pipe(post_req);
    });
}

export default checkUploadSpeed;
