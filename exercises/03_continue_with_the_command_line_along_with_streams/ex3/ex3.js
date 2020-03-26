#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const util = require('util');
const Transform = require('stream').Transform;

// const getStdin = require('get-stdin');

const args = require('minimist')(process.argv.slice(2), {
    boolean: ['help', 'in', 'out'],
    string: ['file'],
});

console.log('args: ', args);

const BASE_PATH = path.resolve(
    process.env.BASE_PATH || __dirname
);

const OUTFILE = path.join(BASE_PATH, 'out.txt');

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
    console.log('ex3 usage:');
    console.log(' ex3.js --file={FILENAME}');
    console.log('');
    console.log('--help                 print this help');
    console.log('--file={FILENAME}      process the file');
    console.log('--in, -                process stdin');
    console.log('--out, -               print to stdout');
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
        }
    });

    outStream = outStream.pipe(upperStream);

    let targetStream;

    if (args.out) {
        targetStream = process.stdout;
    } else {
        // make a file system stream to dump the contents from the stream into another file
        targetStream = fs.createWriteStream(OUTFILE);
    }

    outStream.pipe(targetStream);
}

// OUTPUT > ./ex3.js --file=hello.txt
// args:  { _: [], help: false, in: false, file: 'hello.txt' }

/*
  Apart from the output a file will also be generated named `out.txt` with all data from file `hello.txt` uppercased.
*/
