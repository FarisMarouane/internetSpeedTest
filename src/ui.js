import React, { useState, useEffect } from 'react';
import { mergeMap } from 'rxjs';
import { Box, Text, Newline, useApp } from 'ink';
import Spinner from 'ink-spinner';

import testUploadSpeed from './uploadSpeed.js';
import testDownloadSpeed from './downloadSpeed.js';
import printHelp from './printHelp.js';

const FixedSpacer = ({ size }) => <>{' '.repeat(size)}</>;

const ErrorMessage = ({ text }) => (
    <Box>
        <Text bold color="red">
            ›
            <FixedSpacer size={1} />
        </Text>
        <Text dimColor>{text}</Text>
        <Newline count={2} />
    </Box>
);

const DownloadSpeed = ({ isDone, downloadSpeed, downloadUnit }) => {
    // const color = isDone || uploadSpeed ? 'green' : 'cyan';
    const color = isDone ? 'green' : 'cyan';

    return (
        <Text color={color}>
            {downloadSpeed}
            <FixedSpacer size={1} />
            <Text dimColor>{downloadUnit}</Text>
            <FixedSpacer size={1} />↓
        </Text>
    );
};

const UploadSpeed = ({ isDone, uploadSpeed, uploadUnit }) => {
    const color = isDone ? 'green' : 'cyan';

    if (uploadSpeed) {
        return (
            <Text color={color}>
                {uploadSpeed}
                <Text dimColor>{` ${uploadUnit} ↑`}</Text>
            </Text>
        );
    }

    return (
        <Text dimColor color={color}>
            {' - Mbps ↑'}
        </Text>
    );
};

const Speed = ({ upload, ...data }) =>
    upload ? (
        <>
            <DownloadSpeed {...data} />
            <Text dimColor>{' / '}</Text>
            <UploadSpeed {...data} />
        </>
    ) : (
        <DownloadSpeed {...data} />
    );

const Fast = ({ argument, testTimeout }) => {
    const [error, setError] = useState('');
    const [speed, setSpeed] = useState(undefined);
    const [isDone, setIsDone] = useState(false);
    const { exit } = useApp();

    const upload = argument === '--upload' || argument === '-u';

    useEffect(() => {
        switch (argument) {
            case '--upload':
            case '-u':
                testUploadSpeed(testTimeout)
                    .then(speed => {
                        setSpeed(speed);
                        setIsDone(true);
                        // process.exit(0);
                    })
                    .catch(error => {
                        setError(error.message);
                        exit();
                    });
                break;
            case '--download':
            case '-d':
                testDownloadSpeed(testTimeout)
                    .pipe(mergeMap(v => v))
                    .subscribe({
                        next: speed => {
                            setSpeed(speed);
                        },
                        error: error => {
                            setError(error.message);
                            exit();
                        },
                        complete: () => {
                            setIsDone(true);
                        },
                    });
                break;
            case '--help':
            case '-h':
                printHelp();
                exit();
                break;
            default:
                exit(
                    Error(
                        'You need to need to provide a valid argument to the command. Run internetSpeed -h for help',
                    ),
                );
                break;
        }
    }, [argument, exit, testTimeout]);

    useEffect(() => {
        if (isDone) {
            exit();
        }
    }, [exit, isDone]);

    if (error) {
        return <ErrorMessage text={error} />;
    }

    return (
        <>
            <Box>
                {!isDone && (
                    <>
                        <Text color="cyan">
                            <Spinner />
                        </Text>
                        <Text>
                            <FixedSpacer size={1} />
                        </Text>
                    </>
                )}
                {isDone && (
                    <Text>
                        <FixedSpacer size={4} />
                    </Text>
                )}
                <Speed upload={upload} isDone={isDone} downloadUnit="Mbps" downloadSpeed={speed} />
            </Box>
        </>
    );
};

export default Fast;
