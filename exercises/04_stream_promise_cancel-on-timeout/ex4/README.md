So we'll now notice that, it did fire the message `Took too long!`, but it didn't stop the stream processing from doing its work. It did allow us to tell `processFile` function not to wait any longer, but it didn't actually stop the asynchronous work (which is what we want).  

So to do that we are gonna need to take the cancelation token (which we are providing to `processFile` as `signal`) and do something with it. We need the signal tell us that we need to stop the stream processing.


`signal.pr.catch(function f() {...});`
  - signal (i.e., cancelation token that we created using `let tooLong = CAF.timeout(3, 'Took too long!');`) comes in with the promise on it that is going to be rejected whenever the timeout has fired. So `signal.pr.catch(function f() {...});` is how we gonna know that the timeout has occured. And here's what we want to do something to tell the streams to stop doing what you are doing.


So there are 2 steps that we wanna do to tell the streams to stop:
1. We wanna undo the last piping that occured using `unpipe`.
  `outStream.unpipe(targetStream);`

2. And then for good measure (because the stream upto this point might have a big long line of things that are in line for processing), we wanna go ahead and tell the rest of the streams you don't need to do any other work using `destroy`.
`outStream.destroy();`

That will have the effect of basically killing that stream processing whereever it's at.

<!--
  function* processFile(signal, incomingStream) {
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

      signal.pr.catch(function f() {
          outStream.unpipe(targetStream);
          outStream.destroy();
      });

      yield streamComplete(outStream);
  }
-->

<!-- TERMINAL -->
> chmod u+x ex4.js

<!-- TERMINAL -->
> ./ex4.js --file=hello.txt --out

<!--
  OUTPUT
    args:  { _: [],
      help: false,
      in: false,
      out: true,
      compress: false,
      uncompress: false,
      file: 'hello.txt' }
    Took too long!
-->

If we want to print the contents of 'hello.txt' file, we just need to increase the timeout in cancelation token.

The point of this exercise is that we are now able to stop an asynchronous operation like streaming operation right in the middle of the operation instead of continuing to consume system resources unnecessary. 
