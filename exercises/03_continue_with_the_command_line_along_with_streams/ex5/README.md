So we are able to compress. The next logical step would be to uncompress our input stream.

<!--
  const args = require('minimist')(process.argv.slice(2), {
      boolean: ['help', 'in', 'out', 'compress', 'uncompress'],
      string: ['file'],
  });
-->

<!--
  function printHelp() {
      console.log('ex5 usage:');
      console.log(' ex5.js --file={FILENAME}');
      console.log('');
      console.log('--help                 print this help');
      console.log('--file={FILENAME}      process the file');
      console.log('--in, -                process stdin');
      console.log('--out, -               print to stdout');
      console.log('--compress, -          gzip the output');
      console.log('--uncompress, -        un-gzip the output');
      console.log('');
  }
-->

We know that in our `processFile` we'll be handed an input strem, which may have been gziped. So before our transformation stream, we need to insert a step that does the g-unziping.

<!--
  function processFile(incomingStream) {
      let outStream = incomingStream;

      if (args.uncompress) {
          let gUnzipStream = zlib.createGunzip();
          outStream = outStream.pipe(gUnzipStream);
      }

      const upperStream = new Transform({
          transform(chunk, encoding, cb) {
              this.push(chunk.toString().toUpperCase());
              cb();
          }
      });

      outStream = outStream.pipe(upperStream);

      if (args.compress) {
          let gzipStream = zlib.createGzip();
          outStream = outStream.pipe(gzipStream);
          OUTFILE = `${OUTFILE}.gz`
      }

      let targetStream;

      if (args.out) {
          targetStream = process.stdout;
      } else {
          // make a file system stream to dump the contents from the stream into another file
          targetStream = fs.createWriteStream(OUTFILE);
      }

      outStream.pipe(targetStream);
  }
-->

`let gUnzipStream = zlib.createGunzip();`
  this makes us a transform stream that already understands the streaming g-unzip protocol

<!-- TERMINAL -->
> chmod u+x ex5.js

<!-- TERMINAL -->
> ./ex5.js --file=out.txt.gz --uncompress --out

<!--
  OUTPUT
    args:  { _: [],
      help: false,
      in: false,
      out: true,
      compress: false,
      uncompress: true,
      file: 'out.txt.gz' }
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

<!-- TERMINAL -->
> cat out.txt.gz | ./ex5.js --uncompress --in --out

<!--
  OUTPUT
    args:  { _: [],
    help: false,
    in: true,
    out: true,
    compress: false,
    uncompress: true }
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

`cat out.txt.gz | ./ex5.js --uncompress --in --out`
  - pulling from the file `cat out.txt.gz`
  - piping (`|`) it
  - uncompressing
  - writing back into the file


So,
- We are able to g-unzip in the inbound.
- We are able to g-zip on the outbound.
- We can mix and match those as well.
- The inputs can either be from a file system or from stdin.
