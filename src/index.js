import React from 'react';
import { render } from 'ink';

import { timeout } from './helpers';
import Ui from './ui';

const argument = process.argv[2];
const TEST_MAX_DURATION = 30_000;
const testTimeout = timeout(TEST_MAX_DURATION);

const main = async () => {
    const app = render(<Ui argument={argument} testTimeout={testTimeout} />);

    await app.waitUntilExit();
    process.exit(0);
};

main();
