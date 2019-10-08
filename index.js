#!/usr/bin/env node

const chalk = require('chalk');

const checkUploadSpeed = require('./uploadSpeed');
const checkDownloadSpeed = require('./downloadSpeed');
const printHelp = require('./printHelp');

const {
	REMOTE_SERVER,
	UPLOAD_FILE_SIZE,
	DOWNLOAD_IMAGE_SIZE,
	DOWNLOAD_IMAGE_URL,
} = require('./constants');

const argument = process.argv[2];

switch (argument) {
	case '--upload':
	case '-u':
		checkUploadSpeed(REMOTE_SERVER, UPLOAD_FILE_SIZE)
			.then(speed => {
				console.log(
					chalk.green.inverse(`Your internet upload speed is ${speed} mbps`),
				);
			})
			.catch(error => {
				console.log(chalk.red.inverse(error));
				process.exit(1);
			});
		break;
	case '--download':
	case '-d':
		checkDownloadSpeed(DOWNLOAD_IMAGE_URL, DOWNLOAD_IMAGE_SIZE)
			.then(speed => {
				console.log(
					chalk.green.inverse(`Your internet download speed is ${speed} mbps`),
				);
			})
			.catch(error => {
				console.log(chalk.red.inverse(error));
				process.exit(1);
			});
		break;
	case '--help':
	case '-h':
		printHelp();
		break;
	default:
		console.log(
			chalk.red(`You need to need to provide a valid argument to the command.
	Run speedTest -h for help`),
		);
		process.exit(1);
		break;
}
