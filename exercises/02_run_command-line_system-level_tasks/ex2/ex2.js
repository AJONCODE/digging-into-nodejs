#!/usr/bin/env node

'use strict';

console.log(process.argv);

console.log(process.argv.slice(2));

// OUTPUT : > ./ex2.js --hello=world
// [
//   '/home/ajoncode/.nvm/versions/node/v13.8.0/bin/node',
//   '/home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/ex2/ex2.js',
//   '--hello=world'
// ]
// [ '--hello=world' ]
