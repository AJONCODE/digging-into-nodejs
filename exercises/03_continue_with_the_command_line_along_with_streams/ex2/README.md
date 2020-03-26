So we do want to actually do some processing on our streams as they go by. And the way we are gonna do that is we gonna setup a transform stream via `require('stream').Transform`. And the reason we are making a transform stream is so that we can step in the middle of a stream pipe and item by item we can process what's going through it.

<!--
  const Transform = require('stream').Transform;
  ...

  function processFile(incomingStream) {
    let outStream = incomingStream;

    const upperStream = new Transform({
      transform(chunk, encoding, cb) {
        this.push(chunk.toString().toUpperCase());
        cb();
      }
    });
    ...
  }
-->

<!--
  `transform(chunk, encoding, cb) {}`
    - chunk ofcourse is the buffer
    - encoding is optional (like utf)
    - cb here is a method to let us know that it's finished.
    - The way that this transform stream works is basically kind of like an array. So if we wanna put something into our stream from that chunk we literally just say `this.push(giveSomething)`. Then we do need to execute the `cb();`, so that the stream knows this chunk has been processed and it can move on. And that allows us to do asynchronous processing if we need to. Here we literally just wanna take the chunk, turn it into a string and uppercase it.
-->

<!--
  Now we need to get 'incomingStream' into 'upperStream'. How could we do that?
  Think about the shapes of the streams that we are dealing with.
    - 'upperStream' is going to be a writable stream

    `outStream = outStream.pipe(upperStream);`
-->

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

    const targetStream = process.stdout;

    outStream.pipe(targetStream);
  }
-->

<!-- TERMINAL -->
> chmod u+x ex2.js
> ./ex2.js --file=hello.txt

<!--
  OUTPUT
  args:  { _: [], help: false, in: false, file: 'hello.txt' }
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

- But to prove to us that it's happening one chunk at a time, now that we have a transform stream what we can actually do is insert a delay into each step of the transformation.

<!--
  function processFile(incomingStream) {
    let outStream = incomingStream;

    const upperStream = new Transform({
      transform(chunk, encoding, cb) {
        this.push(chunk.toString().toUpperCase());
        setTimeout(cb, 500)
      }
    });

    outStream = outStream.pipe(upperStream);

    const targetStream = process.stdout;

    outStream.pipe(targetStream);
  }
-->

<!-- TERMINAL -->
> ./ex2.js --file=lorem.txt

<!-- After running `./ex2.js --file=lorem.txt` we'll see that we are processing data chunk by chunk. -->

That proves to us that it's not doing everything all at once. It's doing it efficiently, it's using these internal buffer sizes and processing the data chunk by chunk.  
