#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const util = require('util');
const Transform = require('stream').Transform;

// const getStdin = require('get-stdin');

const args = require('minimist')(process.argv.slice(2), {
    boolean: ['help', 'in'],
    string: ['file'],
});

console.log('args: ', args);

const BASE_PATH = path.resolve(
    process.env.BASE_PATH || __dirname
);

if (process.env.HELLO) {
    console.log(`Value of environment variable HELLO = ${process.env.HELLO}`);
}

if (args.help) {
    printHelp();
} else if (
    args.in ||
    args._.includes('-')
) {
    processFile(process.stdin);
} else if (args.file) {
    let filePath = path.resolve(BASE_PATH, args.file);
    let stream = fs.createReadStream(filePath);
    processFile(stream);
} else {
    error('Incorrect usage.', true);
}

function printHelp() {
    console.log('ex2 usage:');
    console.log(' ex2.js --file={FILENAME}');
    console.log('');
    console.log('--help                 print this help');
    console.log('--file={FILENAME}      process the file');
    console.log('--in, -                process stdin');
    console.log('');
}

function error(msg, includeHelp = false) {
    console.error(msg);
    if (includeHelp) {
        console.log('');
        printHelp();
    }
}

function processFile(incomingStream) {
    let outStream = incomingStream;

    const upperStream = new Transform({
        transform(chunk, encoding, cb) {
            this.push(chunk.toString().toUpperCase());
            cb();
            // NOTE: below line can be used to check if we are processing data chunk by chunk (we just need to comment the above line and uncomment the below line for this to work )
            // setTimeout(cb, 500);
        }
    });

    outStream = outStream.pipe(upperStream);

    const targetStream = process.stdout;

    outStream.pipe(targetStream);
}

// OUTPUT > ./ex2.js --file=hello.txt
// args:  { _: [], help: false, in: false, file: 'hello.txt' }
// 13 - JAN OBLAK
// 24 - TIMOTHY FOSU-MENSAH
// 4 - SERGIO RAMOS
// 17 - JÉRÔME BOATENG
// 27 - DAVID ALABA
// 6 - PAUL POGBA
// 10 - THIAGO ALCÂNTARA
// 14 - RADJA NAINGGOLAN
// 11 - GARETH BALE
// 9 - MAURO ICARDI
// 7 - SON HEUNG-MIN
