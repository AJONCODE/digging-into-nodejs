#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const util = require('util');

const getStdin = require('get-stdin');

const args = require('minimist')(process.argv.slice(2), {
    boolean: ['help', 'in'],
    string: ['file'],
});

console.log('args: ', args);

if (args.help) {
    printHelp();
} else if (
    args.in ||
    args._.includes('-')
) {
    getStdin().then(processFile).catch(error);
} else if (args.file) {
    let filePath = path.resolve(args.file);
    fs.readFile(filePath, function(err, contents) {
        if (err) {
            error(err.toString());
        } else {
            processFile(contents);
        }
    });
} else {
    error('Incorrect usage.', true);
}

function printHelp() {
    console.log('ex8 usage:');
    console.log(' ex8.js --file={FILENAME}');
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

function processFile(contents) {
    contents = contents.toString().toUpperCase();
    process.stdout.write(contents);
}

// OUTPUT > ./ex8.js --file=hello.txt
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

// OUTPUT > cat ./hello.txt | ./ex8.js --in
// args:  { _: [], help: false, in: true }
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
