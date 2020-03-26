#!/usr/bin/env node

'use strict';

const path = require('path');

const args = require('minimist')(process.argv.slice(2), {
    boolean: ['help'],
    string: ['file'],
});

console.log('args: ', args);

if (args.help) {
    printHelp();
} else if (args.file) {
    let filePath = path.resolve(args.file);
    console.log('filePath : ', filePath);
    console.log('__dirname : ', __dirname);
} else {
    error('Incorrect usage.', true);
}

function printHelp() {
    console.log('ex4 usage:');
    console.log(' ex4.js --file={FILENAME}');
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

// OUTPUT : > ./ex4.js
// args:  { _: [], help: false }
// Incorrect usage.
//
// ex4 usage:
//  ex4.js --file={FILENAME}
//
// --help                 print this help
// --file={FILENAME}      process the file
//

// OUTPUT : > ./ex4.js --help
// args:  { _: [], help: true }
// ex4 usage:
//  ex4.js --file={FILENAME}
//
// --help                 print this help
// --file={FILENAME}      process the file
//

// OUTPUT : > ./ex4.js --file
// args:  { _: [], help: false, file: '' }
// Incorrect usage.
//
// ex4 usage:
//  ex4.js --file={FILENAME}
//
// --help                 print this help
// --file={FILENAME}      process the file
//

// OUTPUT : > ./ex4.js --file="hello"
// args:  { _: [], help: false, file: 'hello' }
// filePath : /home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/ex4/hello
// __dirname :  /home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/ex4

// OUTPUT : > ./ex4.js --file=../hello OR ./ex4.js --file="../hello"
// args:  { _: [], help: false, file: '../hello' }
// filePath : /home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/hello
// __dirname :  /home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/ex4

// OUTPUT : > ./ex4.js --file=/temp/dirname OR ./ex4.js --file="/temp/dirname"
// args:  { _: [], help: false, file: 'hello' }
// filePath : /temp/dirname
// __dirname :  /home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/ex4
