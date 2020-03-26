So how could we wait until all the stream operations we're complete before doing something like printing a 'Complete!' message.

So what we gonna need to do is to treat `processFile` as a function that can signal to us when it has completed its work.
1. One way of thinking about doint that is making it to be an `async` function. So now it's gonna give us a promise back. And we can listen for that promise and then print the promise 'Complete!' message when the promise finishes via '.then'. And also provide a '.catch', so that we can see any error that we make in our coding.

<!--
  if (args.help) {
      printHelp();
  } else if (
      args.in ||
      args._.includes('-')
  ) {
      processFile(process.stdin)
        .catch(error);;
  } else if (args.file) {
      let filePath = path.resolve(BASE_PATH, args.file);
      let stream = fs.createReadStream(filePath);
      processFile(stream)
        .then(function() {
            console.log("Complete!");
        })
        .catch(error);
  } else {
      error('Incorrect usage.', true);
  }

  async function processFile(incomingStream) {
      ...
  }
-->

So how do we make `processFile` wait for the completion of all of this streaming stuff. (We don't need to hook into all, but we need to hook into the very final stream and we need to know when that stream finishes or closes.)

So what we gonna do is make ourself a little-bit of a helper function called `streamComplete`. It's gonna take a 'stream' and we wanna listen for some stuff on the strem to let us know when the stream is finished. And we are gonna return back a promise. The reason we did make `streamComplete` an 'async' function is because we need an actual control over when the promise is gonna get result.

Now how we are gonna detect when the stream that we are monitoring has finished. Well they are going to emit certain differnt kinds of events. So under the covers the `.pipe` utility is automatically listening for these various events like the 'data event' and so-forth. But there's an 'end event' that is fired whenever a stream finishes. So if we're to listen for that event, then we would know that it had been finished and that would allow us to know that we're done with the `processFile`.   

<!--
  function streamComplete(stream) {
      return new Promise(function c(res) {
          stream.on('end', function() {
              res();
          });
      });
  }
-->

<!-- call to 'res' to signal that the stream have reached its end event. -->

But since we are not doing anything inside the function, we can just pass 'res' as a second argument.

<!--
  function streamComplete(stream) {
      return new Promise(function c(res) {
          stream.on('end', res);
      });
  }
-->

So how are we gonna use that ?

<!--
  async function processFile(incomingStream) {
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

      await
  }
-->

<!-- TERMINAL -->
> chmod u+x ex2.js

<!-- TERMINAL -->
> ./ex2.js --file=hello.txt --out

<!--
  OUTPUT
    args:  { _: [],
    help: false,
    in: false,
    out: true,
    compress: false,
    uncompress: false,
    file: 'hello.txt' }
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
    Complete!
-->
