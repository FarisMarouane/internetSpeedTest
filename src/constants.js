export const DOWNLOAD_SERVERS = {
    europe: [
        {
            url: 'http://ping.online.net/500Mo.dat', // FR
            geoLocalisation: {
                latitude: 48.8648,
                longitude: 2.3335,
            },
        },
        {
            url: 'https://speedtest.serverius.net/files/1000mb.bin', // NL
            geoLocalisation: {
                latitude: 52.3991,
                longitude: 4.9358,
            },
        },
        {
            url: 'https://speed.hetzner.de/1GB.bin', // GERM
            geoLocalisation: {
                latitude: 49.4478,
                longitude: 11.0683,
            },
        },
    ],
    asia: [
        {
            url: 'http://82.200.209.194/test/1G', // Kazakhstan
            geoLocalisation: {
                latitude: 43.2567,
                longitude: 76.9286,
            },
        },
    ],

    america: [
        {
            url: 'http://mirror.sfo12.us.leaseweb.net/speedtest/1000mb.bin', // US WEST
            geoLocalisation: {
                latitude: 37.3882,
                longitude: -121.889,
            },
        },
        {
            url: 'http://mirror.wdc1.us.leaseweb.net/speedtest/1000mb.bin', // US EST
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
            url: 'https://testmy.net/city/dublin_l',
            geoLocalisation: { latitude: 53.349805, longitude: -6.26031 },
        },
    ],
    asia: [
        {
            url: 'http://sp.zi-tel.com/speedtest/upload.php', //IRAN
            geoLocalisation: { latitude: 35.7248, longitude: 51.3817 },
        },
    ],
    america: [
        {
            url: 'http://ookla1.austtx.sprintadp.net:8080/speedtest/upload.php', //USA
            geoLocalisation: { latitude: 30.25, longitude: -97.75 },
        },
    ],
    africa: [
        {
            url: 'http://speedtest.iam.ma/speedtest/upload.php', //MORO
            geoLocalisation: { latitude: 34.0333, longitude: -6.8333 },
        },
        {
            url: 'http://testedevelocidade.vivo.com.br:8080/speedtest/upload.php', //BRA
            geoLocalisation: { latitude: -23.5, longitude: -46.6167 },
        },
    ],
    australia: [],
};
