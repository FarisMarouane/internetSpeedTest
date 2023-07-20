import request from 'request';
import fs from 'fs';
import path from 'path';
import { Observable, from } from 'rxjs';

import { UPLOAD_SERVERS } from './constants';
import { getServerUrl } from './helpers';
import getClientInfo from './getClientInfo';

import bigFile from '../bigFile.random';

function makeRequest(url, file, testTimeout) {
    let startTime;
    const filePath = path.join(__dirname, `/${file}`);
    const readStream = fs.createReadStream(filePath);
    let fileSize = fs.statSync(filePath)['size']; // In bytes

    const post_options = {
        url,
        method: 'POST',
        headers: {
            'Content-Length': fileSize,
            'Content-Type': 'application/octet-stream',
        },
    };

    return new Observable(subscriber => {
        const arr = [];

        const post_req = request.post(post_options, function(err, response) {
            if (err) {
                subscriber.error(new Error(`An error occured while uploading data: ${err}`));
            }
            if (response?.statusCode === 200) {
                const endTime = new Date().getTime();
                const duration = (endTime - startTime) / 1000;
                const bitsUploaded = fileSize * 8;
                const bps = (bitsUploaded / duration).toFixed(2);
                const kbps = (bps / 1024).toFixed(2);
                const mbps = (kbps / 1024).toFixed(2);
                subscriber.next(mbps);
                subscriber.complete();
            } else {
                subscriber.error(
                    new Error(`An error occured while uploading data: ${response?.statusCode}`),
                );
            }
        });

        testTimeout.then(() => {
            readStream.destroy('timeout reached');
        });

        post_req.on('error', e => subscriber.error(`An error occured while uploading data: ${e}`));

        readStream.on('error', e => {
            if (e === 'timeout reached') {
                post_req.abort();
                const endTime = new Date().getTime();
                const duration = (endTime - startTime) / 1000;
                const bits = (readStream.bytesRead * 8).toFixed(2);
                const kbits = (bits / 1024).toFixed(2);
                const mbps = +(kbits / 1024 / duration).toFixed(2);
                subscriber.next(mbps);
                subscriber.complete();
            } else {
                subscriber.error(new Error(`An error occured while uploading data: ${e}`));
            }
        });

        readStream.on('data', chunk => {
            arr.push(chunk);
            const buffer = Buffer.concat(arr);
            const endTime = new Date().getTime();
            const duration = (endTime - startTime) / 1000;
            const bitsUploaded = buffer.length * 8;
            const bps = (bitsUploaded / duration).toFixed(2);
            const kbps = (bps / 1024).toFixed(2);
            const mbps = (kbps / 1024).toFixed(2);
            subscriber.next(mbps);
        });

        readStream.once('data', () => {
            startTime = new Date().getTime();
        });

        readStream.pipe(post_req);
    });
}

async function checkUploadSpeed(testTimeout) {
    const { continent, latitude, longitude } = await getClientInfo();
    const url = getServerUrl(UPLOAD_SERVERS, latitude, longitude, continent);

    const speed = makeRequest(url, bigFile, testTimeout);
    return speed;
}

function testUploadSpeed(testTimeout) {
    return from(checkUploadSpeed(testTimeout));
}

export default testUploadSpeed;
