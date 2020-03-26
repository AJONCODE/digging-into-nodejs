So uppercasing file is not that useful. What are the kind of processing on these files that we might do that would be more useful or interesting.

One of the common sorts of transformation that we may see or encodings that we may run across on files is that they have been gzip compressed. We may wanna gunzip them, process them and then re-gzip them. This happens a lot when we are downloading a big file from an FTP site, processing it, adding some stuff to it and then regziping it and uploading it to some other http server.

So lets pull in some gziping and gunziping. And luckily this is again built-in for us in node. They have a streaming implementation of the gzip algorithm buit-in to node and it's called `zlib`.
<!--
  const zlib = require('zlib');
-->

Let's first talk about compressing our output, then we'll talk about decompressing input.
Let's say that we want to allow an option for compressing the ouput.

<!--
  const args = require('minimist')(process.argv.slice(2), {
      boolean: ['help', 'in', 'out', 'compress'],
      string: ['file'],
  });
-->

Let's also update out `printHelp`

<!--
  function printHelp() {
      console.log('ex4 usage:');
      console.log(' ex4.js --file={FILENAME}');
      console.log('');
      console.log('--help                 print this help');
      console.log('--file={FILENAME}      process the file');
      console.log('--in, -                process stdin');
      console.log('--out, -               print to stdout');
      console.log('--compress, -          gzip the output');
      console.log('');
  }
-->

Now we need to setup a streaming gzip transform stream. So we wanna make our capitalization of stuff and then we wanna do our gzip thing.

<!--
  function processFile(incomingStream) {
      let outStream = incomingStream;

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
          OUTFILE = `${OUTFILE}.gz`;
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

`let gzipStream = zlib.createGzip();`
  this makes us a transform stream that already understands the streaming gzip protocol

<!--
  NOTE: The compression protocol was literally designed for steaming.
-->
<!--
  OUTFILE = `${OUTFILE}.gz`
    Since wanna gzip an output file, then we might want to change the file extention from saying 'out.txt' to having like the 'out.gz'.    
-->

<!-- TERMINAL -->
> chmod u+x ex4.js

<!-- TERMINAL -->
> ./ex4.js --file=hello.txt --out --compress
<!--
  OUTPUT
  args:  { _: [],
    help: false,
    in: false,
    out: true,
    compress: true,
    file: 'hello.txt' }
  I��C�>$+��/6������������/Y�Պ�����0"&е�=򦮡9�}���#��>���`A�4BȘf���'DK��	{V3����v7� �����
-->

<!-- TERMINAL -->
> ./ex4.js --file=hello.txt --compress

<!-- In this case an output file `out.txt.gz` will also be generated -->
<!--
  OUTPUT
  args:  { _: [],
    help: false,
    in: false,
    out: false,
    compress: true,
    file: 'hello.txt' }
-->

<!-- TERMINAL -->
> vi out.txt.gz

<!--
  OUTPUT
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

<!--
  Using vim how can we see the contents of `out.txt.gz` file directly via `vi out.txt.gz`
    It turns out we can see the contents of the file. If we have a file extention that says '.txt.gz', it (vim) automatically gunzips it for us when we open it.
-->

<!-- TERMINAL -->
> cat out.txt.gz

<!--
  OUTPUT
  at out.txt.gz
  I��C�>$+��/6������������/Y�Պ�����0"&е�=򦮡9�}���#��>���`A�4BȘf���'DK��	{V3����v7� �����
-->
