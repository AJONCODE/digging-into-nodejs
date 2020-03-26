<!-- TERMINAL -->
> chmod u+x ex4.js


> ./ex4.js
<!--
  OUTPUT
  args:  { _: [], help: false }
  Incorrect usage.

  ex4 usage:
   ex4.js --file={FILENAME}

  --help                 print this help
  --file={FILENAME}      process the file

-->

> ./ex4.js --help
<!--
  OUTPUT
  args:  { _: [], help: true }
  ex4 usage:
   ex4.js --file={FILENAME}

  --help                 print this help
  --file={FILENAME}      process the file

-->

> ./ex4.js --file
<!--
  OUTPUT
  args:  { _: [], help: false, file: '' }
  Incorrect usage.

  ex4 usage:
   ex4.js --file={FILENAME}

  --help                 print this help
  --file={FILENAME}      process the file

-->

> ./ex4.js --file="hello" OR ./ex4.js --file=hello
<!--
  OUTPUT
  args:  { _: [], help: false, file: 'hello' }
  filePath : /home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/ex4/hello
  __dirname :  /home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/ex4
-->

> ./ex4.js --file=../hello OR ./ex4.js --file="../hello"
<!--
  OUTPUT
  args:  { _: [], help: false, file: '../hello' }
  filePath : /home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/hello
  __dirname :  /home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/ex4
-->

> ./ex4.js --file=/temp/dirname OR ./ex4.js --file="/temp/dirname"
<!--
  OUTPUT
  args:  { _: [], help: false, file: '/temp/hello' }
  filePath : /temp/hello
  __dirname :  /home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/ex4
-->

So now we are successfully receiving inputs to our node program and using them to make decisions.

<!--
  NOTE:
    If we're to look at minimist in C, we would find that literally tens and thousands of other packages in existence rely upon minimist. It has no dependencies itself and it is depended upon by almost every other major package out there.

    Other packages like minimist:
      1. yargs
        - it uses minimist and on top of minimist it uses this special syntax where we define what our options are, what their types are. And one of the benifits of yargs is that it will automatically generate our help output from our yargs configuration.
-->

`path.resolve` by default say, if you don't give me something that's like absolute, then I am gonna go ahead and make it relative to the current `__dirname`.
`__dirname` is a magic variable that's available in all of our node programs and it tells us the current directory of the current file we are accessing.
