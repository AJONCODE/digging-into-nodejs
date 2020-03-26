// My first Node.js program
process.stdout.write('Hello world\n');
console.log('Hello world');

process.stderr.write('Opps\n');
console.error('Oops');

// OUTPUT: node ex1.js
// Hello world
// Hello world
// Opps
// Oops

// OUTPUT: node ex1.js 1>dev>null
// Opps
// Oops

// OUTPUT: node ex1.js 2>dev>null
// Hello world
// Hello world

// OUTPUT: node ex1.js 2>dev>null 1>&2
//
