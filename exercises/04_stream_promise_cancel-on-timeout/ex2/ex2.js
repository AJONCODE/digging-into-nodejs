#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const util = require('util');
const Transform = require('stream').Transform;
const zlib = require('zlib');

// const getStdin = require('get-stdin');

const args = require('minimist')(process.argv.slice(2), {
    boolean: ['help', 'in', 'out', 'compress', 'uncompress'],
    string: ['file'],
});

function streamComplete(stream) {
    return new Promise(function c(res) {
        stream.on('end', res);
    });
}

console.log('args: ', args);

const BASE_PATH = path.resolve(
    process.env.BASE_PATH || __dirname
);

let OUTFILE = path.join(BASE_PATH, 'out.txt');

if (process.env.HELLO) {
    console.log(`Value of environment variable HELLO = ${process.env.HELLO}`);
}

if (args.help) {
    printHelp();
} else if (
    args.in ||
    args._.includes('-')
) {
    processFile(process.stdin)
        .catch(error);;
} else if (args.file) {
    let filePath = path.resolve(BASE_PATH, args.file);
    let stream = fs.createReadStream(filePath);
    processFile(stream)
        .then(function() {
            console.log("Complete!");
        })
        .catch(error);
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
    console.log('--out, -               print to stdout');
    console.log('--compress, -          gzip the output');
    console.log('--uncompress, -        un-gzip the output');
    console.log('');
}

function error(msg, includeHelp = false) {
    console.error(msg);
    if (includeHelp) {
        console.log('');
        printHelp();
    }
}

async function processFile(incomingStream) {
    let outStream = incomingStream;

    if (args.uncompress) {
        let gUnzipStream = zlib.createGunzip();
        outStream = outStream.pipe(gUnzipStream);
    }

    const upperStream = new Transform({
        transform(chunk, encoding, cb) {
            this.push(chunk.toString().toUpperCase());
            cb();
        }
    });

    outStream = outStream.pipe(upperStream);

    if (args.compress) {
        let gzipStream = zlib.createGzip();
        outStream = outStream.pipe(gzipStream);
        OUTFILE = `${OUTFILE}.gz`
    }

    let targetStream;

    if (args.out) {
        targetStream = process.stdout;
    } else {
        // make a file system stream to dump the contents from the stream into another file
        targetStream = fs.createWriteStream(OUTFILE);
    }

    outStream.pipe(targetStream);

    await streamComplete(outStream);
}

// OUTPUT > ./ex2.js --file=hello.txt --out
// args:  { _: [],
//   help: false,
//   in: false,
//   out: true,
//   compress: false,
//   uncompress: false,
//   file: 'hello.txt' }
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
// Complete!
