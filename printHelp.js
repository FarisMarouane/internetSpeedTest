const commandLineUsage = require('command-line-usage');

const sections = [
  {
    header: 'Speed Test (by Marouane)',
    content: "Measure your internet's speed from the command line",
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'download',
        description: "Get your internet's download speed",
        alias: 'd',
        type: Boolean,
      },
      {
        name: 'upload',
        description: "Get your internet's upload speed",
        alias: 'u',
        type: Boolean,
      },
      {
        name: 'help',
        description: 'Print this usage guide.',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
];

function printHelp() {
  const usage = commandLineUsage(sections);
  console.log(usage);
}

module.exports = printHelp;
