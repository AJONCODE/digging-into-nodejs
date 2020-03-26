Reading a file asynchronous way

`readFileSync`
- this allows us to read a file the asynchronous way. And asynchronous form of readFile expects a callback. And there is one other little nuance which is that node for the most part uses a standard for its callback signatures, that the first parameter is always the 'error' parameter. But error here is gonna be an object, so we are gonna go with `err.toString()`

<!--
  fs.readFile(filePath, function onContents(err, contents) {})
-->


<!-- TERMINAL -->
> chmod u+x ex6.js
> ./ex6.js --file=hello.txt

<!--
  OUTPUT
  args:  { _: [], help: false, file: 'hello.txt' }
  13 - Jan Oblak
  24 - Timothy Fosu-Mensah
  4 - Sergio Ramos
  17 - Jérôme Boateng
  27 - David Alaba
  6 - Paul Pogba
  10 - Thiago Alcântara
  14 - Radja Nainggolan
  11 - Gareth Bale
  9 - Mauro Icardi
  7 - Son Heung-min
-->


But what will happen if we'll give it a file name that doesn't exists?
  - We'll get an error message.

<!-- TERMINAL -->
> ./ex6.js --file=nofile.txt

<!--
  OUTPUT
  args:  { _: [], help: false, file: 'nofile.txt' }
  Error: ENOENT: no such file or directory, open '/home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/ex6/nofile.txt'
-->
