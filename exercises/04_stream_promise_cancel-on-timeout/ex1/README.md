We are talk about issues related to the streaming. One nice thing about working with stream is that we are basically saying listen do whatever you need to do, take however you need to take, just do all those chunks. We sortof fire those and then we are finished. So for example if we're to insert a `console.log("Complete!");` while checking for `file` 'args' type.

<!--
  if (args.help) {
      printHelp();
  } else if (
      args.in ||
      args._.includes('-')
  ) {
      processFile(process.stdin);
  } else if (args.file) {
      let filePath = path.resolve(BASE_PATH, args.file);
      let stream = fs.createReadStream(filePath);
      processFile(stream);
      console.log("Complete!");
  } else {
      error('Incorrect usage.', true);
  }
-->


<!-- TERMINAL -->
> chmod u+x ex1.js

<!-- TERMINAL -->
> ./ex1.js --file=hello.txt --out

<!--
  OUTPUT
    args:  { _: [],
    help: false,
    in: false,
    out: true,
    compress: false,
    uncompress: false,
    file: 'hello.txt' }
  Complete!
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

We noticed that the 'Complete!' message is printed before we've done our stream processing. Even though the console message came after the process file. It's because apparently all of the stream operations are asynchronous. 
