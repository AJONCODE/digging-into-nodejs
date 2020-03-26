#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');

const args = require('minimist')(process.argv.slice(2), {
    boolean: ['help'],
    string: ['file'],
});

console.log('args: ', args);

if (args.help) {
    printHelp();
} else if (args.file) {
    let filePath = path.resolve(args.file);
    processFile(filePath);
} else {
    error('Incorrect usage.', true);
}

function printHelp() {
    console.log('ex7 usage:');
    console.log(' ex7.js --file={FILENAME}');
    console.log('');
    console.log('--help                 print this help');
    console.log('--file={FILENAME}      process the file');
    console.log('');
}

function error(msg, includeHelp = false) {
    console.error(msg);
    if (includeHelp) {
        console.log('');
        printHelp();
    }
}

function processFile(filePath) {
    const contents = fs.readFile(filePath, function(err, contents) {
        if (err) {
            error(err.toString());
        } else {
            contents = contents.toString().toUpperCase();
            process.stdout.write(contents);
        }
    });
}

// OUTPUT : > ./ex6.js --file=hello.txt
// args:  { _: [], help: false, file: 'hello.txt' }
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
