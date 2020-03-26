#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const util = require('util');

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
    console.log('ex1 usage:');
    console.log(' ex1.js --file={FILENAME}');
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
    const targetStream = process.stdout;
    outStream.pipe(targetStream);
}

// OUTPUT > ./ex1.js --file=hello.txt
// args:  { _: [], help: false, in: false, file: 'hello.txt' }
// 13 - Jan Oblak
// 24 - Timothy Fosu-Mensah
// 4 - Sergio Ramos
// 17 - Jérôme Boateng
// 27 - David Alaba
// 6 - Paul Pogba
// 10 - Thiago Alcântara
// 14 - Radja Nainggolan
// 11 - Gareth Bale
// 9 - Mauro Icardi
// 7 - Son Heung-min
