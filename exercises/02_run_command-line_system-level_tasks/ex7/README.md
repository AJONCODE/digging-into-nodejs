Now dumping the contents of a file is not particularly intresting. We wanna do some more stuff with it. So let's consider just the very simple thing that we can do which is that whatever the contents are of the file, we are gonna uppercase all of those string characters.
Now contents here is a buffer, and we can't really uppercase a binary buffer. We are gonna have to turn it into a string, so that we can do that uppercasing on it.


<!-- TERMINAL -->
> chmod u+x ex7.js
> ./ex7.js --file=hello.txt


<!--
  OUTPUT
  args:  { _: [], help: false, file: 'hello.txt' }
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
