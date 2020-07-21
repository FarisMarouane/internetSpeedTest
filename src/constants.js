export const DOWNLOAD_SERVERS = {
    europe: [
        {
            urls: ['http://ping.online.net/500Mo.dat'], // FR
            geoLocalisation: {
                latitude: 48.8648,
                longitude: 2.3335,
            },
        },
        {
            urls: ['https://speedtest.serverius.net/files/1000mb.bin'], // NL
            geoLocalisation: {
                latitude: 52.3991,
                longitude: 4.9358,
            },
        },
        {
            urls: ['http://ipv4.download.thinkbroadband.com/1GB.zip'], // UK
            geoLocalisation: {
                latitude: 52.3333,
                longitude: -2.0167,
            },
        },
        {
            urls: ['https://speed.hetzner.de/1GB.bin'], // GERM
            geoLocalisation: {
                latitude: 49.4478,
                longitude: 11.0683,
            },
        },
    ],
    asia: [
        {
            urls: ['http://82.200.209.194/test/1G'], // Kazakhstan
            geoLocalisation: {
                latitude: 43.2567,
                longitude: 76.9286,
            },
        },
    ],

    america: [
        {
            urls: ['http://mirror.sfo12.us.leaseweb.net/speedtest/1000mb.bin'], // US WEST
            geoLocalisation: {
                latitude: 37.3882,
                longitude: -121.889,
            },
        },
        {
            urls: ['http://mirror.wdc1.us.leaseweb.net/speedtest/1000mb.bin'], // US EST
            geoLocalisation: {
                latitude: 38.9208,
                longitude: -77.036,
            },
        },
    ],
};

export const UPLOAD_SERVERS = {
    europe: [
        {
            urls: ['http://speedtest-gra.as16276.ovh:8080/speedtest/upload.php'], //FR
            geoLocalisation: { latitude: 50.9871, longitude: 2.1255 },
        },
        {
            urls: ['http://speedtest.norcom.ru:8080/speedtest/upload.php'], // RUS
            geoLocalisation: { latitude: 69.3558, longitude: 88.1893 },
        },
        {
            urls: ['http://speedtest.neti.gsm.pl:8080/speedtest/upload.php'], //POL
            geoLocalisation: { latitude: 50.85, longitude: 16.4833 },
        },
        {
            urls: ['http://speedtest1.dacor.de:8080/speedtest/upload.php'], //GER
            geoLocalisation: { latitude: 50.2667, longitude: 10.9667 },
        },
        {
            urls: ['http://nuevotest.telecable.es:8080/speedtest/upload.php'], //SPAIN
            geoLocalisation: { latitude: 43.5333, longitude: 5.7 },
        },
    ],
    asia: [
        {
            urls: ['http://www2.unicomtest.com:8080/speedtest/upload.php'], //PRC
            geoLocalisation: { latitude: 39.9139, longitude: 116.3917 },
        },
        {
            urls: ['http://spdel.pcpli.net:8080/speedtest/upload.php'], //INDE
            geoLocalisation: { latitude: 28.67, longitude: 77.42 },
        },
        {
            urls: ['http://sp.zi-tel.com/speedtest/upload.php'], //IRAN
            geoLocalisation: { latitude: 35.7248, longitude: 51.3817 },
        },
        {
            urls: ['http://speed.open.ad.jp:8080/speedtest/upload.php'], //JPN
            geoLocalisation: { latitude: 35.6833, longitude: 139.6833 },
        },
    ],
    america: [
        {
            urls: ['http://vancouver2.speedtest.telus.com:8080/speedtest/upload.php'], //CAN
            geoLocalisation: { latitude: 49.2505, longitude: -123.1119 },
        },
        {
            urls: ['http://speedtest.ok.shawcable.net:8080/speedtest/upload.php'], //CAN
            geoLocalisation: { latitude: 49.8988, longitude: -119.4097 },
        },
        {
            urls: ['http://ookla1.austtx.sprintadp.net:8080/speedtest/upload.php'], //USA
            geoLocalisation: { latitude: 30.25, longitude: -97.75 },
        },
    ],
    africa: [
        {
            urls: ['http://speedtest.iam.ma/speedtest/upload.php'], //MORO
            geoLocalisation: { latitude: 34.0333, longitude: -6.8333 },
        },
        {
            urls: ['http://speedtest.psi.vodacombusiness.co.za:8080/speedtest/upload.php'], //S.A.
            geoLocalisation: { latitude: -25.7256, longitude: 28.2439 },
        },
        {
            urls: ['http://testedevelocidade.vivo.com.br:8080/speedtest/upload.php'], //BRA
            geoLocalisation: { latitude: -23.5, longitude: -46.6167 },
        },
        {
            urls: ['http://speedtest.telered.com.ar:8080/speedtest/upload.php'], //ARG
            geoLocalisation: { latitude: -34.6036, longitude: 58.3817 },
        },
    ],
    australia: [
        {
            urls: ['http://syd1.speedtest.telstra.net:8080/speedtest/upload.php'], //AU
            geoLocalisation: { latitude: -33.86, longitude: 151.2111 },
        },
    ],
};
