- First thing that we want to do is try to get some input into our program. But we won't be using `stdin` yet. So there are another ways of getting input from the outer system to our program, and one of the common of those is to use the command line parameters.

<!-- TERMINAL -->
<!-- command for command line parameter that is gonna come into our program  -->
> ls -la
> chmod u+x ex2.js
> ./ex2.js --hello=world

- Now we wanna be able to access that command line parameter. So how we gonna do it?
Well first of what we are gonna do is access the arguments that were passed in to our program by way of another of the exposures of the `POSIX` which is `process.argv`.

- `process.argv` will be an array of all the arguments that were passed in from the executing shell.

`argv` - is the traditional name from C programming for the list of arguments

<!--
  OUTPUT
  [
    '/home/ajoncode/.nvm/versions/node/v13.8.0/bin/node',
    '/home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/ex2/ex2.js',
    '--hello=world'
  ]
-->

- Now after running the `./ex2.js --hello=world` command in the terminal, we will notice that we have two arguments at the top which we probably don't really actually care that much about.

`/home/ajoncode/.nvm/versions/node/v13.8.0/bin/node` is the location where our node is installed.
`/home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/ex2/ex2.js` is the fully qualified path to our ex2.js.

- So what we are gonna do is slice off the first two using `console.log(process.argv.slice(2))`.
<!--
  `console.log(process.argv.slice(2))`
  [ '--hello=world' ]
-->
