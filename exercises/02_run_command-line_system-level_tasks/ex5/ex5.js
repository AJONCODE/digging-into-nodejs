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

    processFileEncode(filePath);

    console.log('filePath : ', filePath);
    console.log('__dirname : ', __dirname);
} else {
    error('Incorrect usage.', true);
}

function printHelp() {
    console.log('ex5 usage:');
    console.log(' ex5.js --file={FILENAME}');
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
    const contents = fs.readFileSync(filePath);
    console.log(contents);
    process.stdout.write(contents);
}

// NOTE: this is slightly less efficient

function processFileEncode(filePath) {
    const contents = fs.readFileSync(filePath, "utf8");
    console.log(contents);
    process.stdout.write(contents);
}

// OUTPUT : > ./ex5.js --file=hello.txt
// args:  { _: [], help: false, file: 'hello.txt' }
// <Buffer 4d 61 72 69 6f 20 49 63 61 72 64 69 0a 47 65 72 61 74 68 20 42 61 6c 65 0a 52 61 64 67 61 20 4e 61 69 6e 67 67 6f 6c 61 6e 0a 50 61 75 6c 20 50 6f 67 ... 28 more bytes>
// Mario Icardi
// Gerath Bale
// Radga Nainggolan
// Paul Pogba
// Thiago Alca
// David De'Gea
// Mario Icardi
// Gerath Bale
// Radga Nainggolan
// Paul Pogba
// Thiago Alca
// David De'Gea
//
// Mario Icardi
// Gerath Bale
// Radga Nainggolan
// Paul Pogba
// Thiago Alca
// David De'Gea
// filePath :  /home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/ex5/hello.txt
// __dirname :  /home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/ex5
