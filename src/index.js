import React from 'react';
import { render } from 'ink';

import { timeout } from './helpers';
import ui from './ui';

const argument = process.argv[2];
const TEST_MAX_DURATION = 30_000;
const testTimeout = timeout(TEST_MAX_DURATION);

const main = async () => {
    const app = render(
        React.createElement(ui, {
            argument,
            testTimeout,
        }),
    );

    await app.waitUntilExit();
};

main();
