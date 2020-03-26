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
    console.log('ex6 usage:');
    console.log(' ex6.js --file={FILENAME}');
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
            process.stdout.write(contents);
        }
    });
}

// OUTPUT : > ./ex6.js --file=hello.txt
// args:  { _: [], help: false, file: 'hello.txt' }
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

// OUTPUT : > ./ex6.js --file=nofile.txt
// args:  { _: [], help: false, file: 'nofile.txt' }
// Error: ENOENT: no such file or directory, open '/home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/ex6/nofile.txt'
