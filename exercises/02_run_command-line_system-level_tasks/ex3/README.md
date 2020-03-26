Now there are bunch of different conventions for how command line arguments gets specified on the command line: there's --longParameterName, there's -shortParameterName, there's -parameterNameWithSpaceInBetween and many more. What we notice that none of that parcing is happening for us by node. So we could do our own regular expression parsing and come up with the parcing rules of all of those various different conventions, but that's a bunch of work that we shouldn't do ourselves. So we are gonna go back and use a package called `minimist`;

<!-- minimist package have a function where we need to pass the array to be parsed. -->
`const args = require('minimist')(process.argv.slice(2));`


<!-- TERMINAL -->
> chmod u+x ex3.js
> ./ex3.js --hello=world -c9

<!--
  OUTPUT
  args:  { _: [], hello: 'world', c: 9 }
  [
    '/home/ajoncode/.nvm/versions/node/v13.8.0/bin/node',
    '/home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/ex3/ex3.js',
    '--hello=world',
    '-c9'
  ]
  [ '--hello=world', '-c9' ]
-->

`args:  { _: [], hello: 'world', c: 9 }`
- the underscore (`_`) in `args:  { _: [], hello: 'world', c: 9 }` is the overflow if there's anything else on the line that minimist couldn't figure out what to do with.

<!-- TERMINAL -->
> ./ex3.js --hello=world -c9 - foobar

<!--
  OUTPUT
  args:  { _: [ '-', 'foobar' ], hello: 'world', c: 9 }
  [
    '/home/ajoncode/.nvm/versions/node/v13.8.0/bin/node',
    '/home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/ex3/ex3.js',
    '--hello=world',
    '-c9',
    '-',
    'foobar'
  ]
  [ '--hello=world', '-c9', '-', 'foobar' ]
-->

`_: [ '-', 'foobar' ]` is the overflow in the above output that hasn't been able to parsed according to its conventions.


<!-- we can also pass configuration to minimist -->
- This configuration among other things is gonna allow us to control some of the guesses that 'minimist' makes.
`const argsConfigured = require('minimist')(process.argv.slice(2), {
  boolean: ['help'],
  string: ['file']
});`
- Here we are saying that we expect help argument to be of type boolean and file argument to be of type string.

<!-- TERMINAL -->
> ./ex3.js --help=world --file=9

<!--
  OUTPUT
  args:  { _: [ '-', 'foobar' ], hello: 'world', c: 9 }
  args:  { _: [], help: 'world', file: 9 }
  argsConfigured:  { _: [], help: true, file: '9' }
  [
    '/home/ajoncode/.nvm/versions/node/v13.8.0/bin/node',
    '/home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/ex3/ex3.js',
    '--help=world',
    '--file=9'
  ]
  [ '--help=world', '--file=9' ]
-->
We can notice that it is treating 'help' argument as a boolean and 'file' argument as a string. Because we have overwritten the default guessing to tell it no matter how it's specified, we always want 'help' to be of type boolean and 'file' to be of type string. In case of boolean if argument value is present, then it is treated as true else false.
