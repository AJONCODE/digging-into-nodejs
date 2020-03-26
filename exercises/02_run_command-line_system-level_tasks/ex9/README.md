Pulling in inputs from 'stdin' or 'command line parameters' that's pretty good, but we can also get inputs into our program in one other way which is through the use of environment variables.

If we want to set an environment variable it's kind of like setting a global variable (it's a variable that would be automatically available to a program).

But we wanna do on a per command basis, we basically just prefix something :
<!-- TERMINAL -->
<!--
  `HELLO=WORLD ./ex9.js`
    - This would set an environment variable from our shell environment called 'HELLO' with the value 'WORLD' (but only for this command and then it goes away).
  `process.env.HELLO`
    - To access the envrionment variable 'HELLO', we use 'process.env.HELLO'
-->
> chmod u+x ./ex9.js


So in this particular case, we are gonna use environment variable for 'configuring a base file path'
<!--
  const BASE_PATH = path.resolve(
    process.env.BASE_PATH || __dirname
  );
-->

`path.join()`
  - `path.join()` will take any number of inputs and use the appropriate directory separator for our platform.

<!-- TERMINAL -->
> BASE_PATH=files/ ./ex9.js --file=hello.txt

<!--
  OUTPUT
  args:  { _: [], help: false, in: false, file: 'hello.txt' }
  13 - JAN OBLAK
  24 - TIMOTHY FOSU-MENSAH
  4 - SERGIO RAMOS
  17 - JÉRÔME BOATENG
  27 - DAVID ALABA
  6 - PAUL POGBA
  10 - THIAGO ALCÂNTARA
  14 - RADJA NAINGGOLAN
  11 - GARETH BALE
  9 - MAURO ICARDI
  7 - SON HEUNG-MIN
-->
