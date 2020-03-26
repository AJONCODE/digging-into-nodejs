Now it's true that we are able to listen for the completion of the stream operations. It's a little bit manual, but we are atleast able to hook into an event and notify that something has finished.

But there is a downside here, and it's a specially accused. If we think about building programs that might be doing really really large data-set processing. But what if this was running against a really large file that was on a network that has some sort of a weak connection and things were delayed. Then we might want to essentially say there's a certain maximum amount of time that we want to allow this to go before we give up.

One of the problems of using 'promises' to model asynchronity is that they are kind of black box from the outside. Once we have a promise we have no way of telling `processFile` (or even the streams per-say) to stop doing what you are doing, we've got a timeout. So for that reason ther's a tool (called `caf`) that allows us to do asynchronity, but with cancelation.

<!-- const CAF = require('caf'); -->

`Cancelable Async Flows (CAF)`
  - essentially it allows us to turn a generator into something that looks like an async function. But that generator uses 'cancelation token', so that we can cancel it if it's stuck or taking too long.

So we are gonna use `caf` with generator style instead of with async function style.

1. So we are gonna change `procesFile` into a generator. And `procesFile` is gonna receive as parameters:  `signal` (signal for cancelation) and `incomingStream`. (Don't forgot to switch `await` to `yield` inside generator i.e., `procesFile`)

<!--
  function *processFile(signal, incomingStream) {
      ...
      yield streamComplete(outStream);
  }
-->

2. We need to adapt `processFile` to use 'CAF'
<!-- processFile = CAF(processFile) -->

`processFile = CAF(processFile)`
  - that's the magic that turns it into a thing that looks like async function.

3. But now whenever we call that `processFile` function, we are now gonna be calling it with 2 inputs instead of 1. (Cancelation token as first argument and stream as second argument).

4. So let's make a cancelation token to use.

<!--
  if (args.help) {
      printHelp();
  } else if (
      args.in ||
      args._.includes('-')
  ) {
      let tooLong = CAF.timeout(3, 'Took too long!');
      processFile(tooLong, stream)
          .catch(error);
  } else if (args.file) {
      let filePath = path.resolve(BASE_PATH, args.file);
      let stream = fs.createReadStream(filePath);

      let tooLong = CAF.timeout(3, 'Took too long!');

      processFile(tooLong, stream)
          .then(function() {
              console.log("Complete!");
          })
          .catch(error);
  } else {
      error('Incorrect usage.', true);
  }
-->

`let tooLong = CAF.timeout(3, 'Took too long!');`
  - timeout after 3 milliseconds.So this is gonna be our cancelation token.

<!-- TERMINAL -->
> chmod u+x ex3.js

<!-- TERMINAL -->
> ./ex3.js --file=hello.txt --out

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

So we'll now notice that, it did fire the message `Took too long!`, but it didn't stop the stream processing from doing its work. It did allow us to tell `processFile` function not to wait any longer, but it didn't actually stop the asynchronous work (which is what we want).  
