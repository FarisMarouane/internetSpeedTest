const REMOTE_SERVER_UPLOAD = 'postman-echo.com';
const UPLOAD_FILE_SIZE = 140889; // In bytes
const DOWNLOAD_IMAGE_URL =
  'https://cdn.pixabay.com/photo/2019/10/01/13/06/landscape-4518196_960_720.jpg';

const DOWNLOAD_SERVERS = {
  europe: {
    fr: 'http://ping.online.net/5Mo.dat',
    nl: 'https://speedtest.serverius.net/files/10mb.bin',
  },
  asia: {
    kz: 'http://82.200.209.194/test/1G', // Kazakhstan
  },
  america: {},
};

module.exports = {
  REMOTE_SERVER_UPLOAD,
  UPLOAD_FILE_SIZE,
  DOWNLOAD_IMAGE_URL,
  DOWNLOAD_SERVERS,
};
