const REMOTE_SERVER_UPLOAD = 'postman-echo.com';
const UPLOAD_FILE_SIZE = 140889; // In bytes
const DOWNLOAD_IMAGE_URL =
  'https://cdn.pixabay.com/photo/2019/10/01/13/06/landscape-4518196_960_720.jpg';

const DOWNLOAD_SERVERS = {
  europe: [
    {
      urls: [
        'http://ping.online.net/10Mo.dat',
        'http://ping.online.net/50Mo.dat',
        'http://ping.online.net/200Mo.dat',
      ], // FR
      geoLocalisation: { latitude: 48.8648, longitude: 2.3335 },
    },
    {
      urls: [
        'https://speedtest.serverius.net/files/10mb.bin',
        'https://speedtest.serverius.net/files/100mb.bin',
      ], // NL
      geoLocalisation: { latitude: 52.3991, longitude: 4.9358 },
    },
  ],
  asia: [
    {
      urls: ['http://82.200.209.194/test/1G'], // Kazakhstan
      geoLocalisation: { latitude: 43.2567, longitude: 76.9286 },
    },
  ],
  america: [],
};

module.exports = {
  REMOTE_SERVER_UPLOAD,
  UPLOAD_FILE_SIZE,
  DOWNLOAD_IMAGE_URL,
  DOWNLOAD_SERVERS,
};
