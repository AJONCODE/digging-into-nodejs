#!/usr/bin/env node

'use strict';

const args = require('minimist')(process.argv.slice(2));

console.log('args: ', args);


const argsConfigured = require('minimist')(process.argv.slice(2), {
    boolean: ['help'],
    string: ['file'],
});

console.log('argsConfigured: ', argsConfigured);

console.log(process.argv);

console.log(process.argv.slice(2));

// OUTPUT : > ./ex3.js --hello=world -c9
// args:  { _: [], hello: 'world', c: 9 }
// [
//   '/home/ajoncode/.nvm/versions/node/v13.8.0/bin/node',
//   '/home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/ex3/ex3.js',
//   '--hello=world',
//   '-c9'
// ]
// [ '--hello=world', '-c9' ]
