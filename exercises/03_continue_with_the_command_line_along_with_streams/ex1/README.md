<!-- TERMINAL -->
> cp mainFile.js secondaryFile.js


`cp mainFile.js secondaryFile.js`
  - This would copy all the contents of 'mainFile.js' file into 'secondaryFile.js' file. The benifit of doing this is that it will keep the executable bit for us.

- This series of exercise would be a continuation of what we been doing in exercise '02_run_command-line_system-level_tasks'.

<!-- TERMINAL -->
> chmod u+x ex1.js

USING STREAMS

Let's think about what we are doing with our 'files' and our 'getStdin'.
  - We know that `getStdin` is a stream. But we have been pulling in files as a string and not as a stream. But what if we were to switch this to a streaming interface. Meaning we could get a stream for the 'stdin', we could get a stream from our 'file' and then we could do the processing chunk by chunk. That's gonna be a switch of our strategy with same output but with much more efficiency and much more the way we want to be doing things in the node.

- We are gonna get rid of our usage of `get-stdin`, because we are gonna actually just use the straight-up stdin stream. Go we are gonna take `getStdin().then(processFile).catch(error);` out and just use `processFile(process.stdin)`, because we are gonna make processFile actually able to handle a stream.

- But how are we gonna do it with the file system. Well we have a method on the `fs` module that can give us a readable stream that's connected to a file.

<!--
  let stream = fs.createReadStream(filePath)
  processFile(stream)
-->

And now rather than getting all the contents of the file, we have a readable stream that's hooked up to that file and we can read from it.  

So we changed our 'processFile' to take a readable stream as its input.
<!--
  function processFile(incomingStream) {
    let outStream = incomingStream;
    const targetStream = process.stdout;
    outStream.pipe(targetStream);
  }

  OR

  function processFile(incomingStream) {
    let outStream;
    incomingStream.pipr(outStream);
    const targetStream = process.stdout;
    outStream.pipe(targetStream);
  }
-->

Our input stream is coming in and we could just literally dump it (`const outStream = incomingStream`).

`process.stdout;` is the output stream that we want to send out and we are gonna store it in a variable named `targetStream`(`const targetStream = process.stdout;`). And what we are gonna do is have an `outputStream` that we pipe to our `targetStream`.
(`process.stdout` is a writable stream.)

This will allow us to dump the contents to the `stdout` from our file or from our `stdin` without any processing happening whatsoever.

Now if we're really getting into the nitty-gritty, we could debug the memory process and see that this was different than what we did before when we have this one big megabyte of content, we never had the whole megabyte in memory. Effectively we only had about 65000 bytes in memory at anytime because it would read a chunk and then write it out to the stdout and read another chunk and write it out to the stdout and so on.
