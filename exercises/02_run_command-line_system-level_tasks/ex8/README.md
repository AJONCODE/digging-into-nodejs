If we want we can also dump huge file s(let's say of size 1mb).

But let's talk about that for a moment. Because we just pulled in an entire megabyte as a binary buffer, and then we turned that entire megabyte binary buffer data into a string (so we make a seperate string representation of it), and then we made a third representation of that megabyte by turning it into an uppercase form. That's not what we would consider generally speaking to be very efficient. So we need to be aware of because if we are dealing with processing some giant files we don't wanna pull the whole thing into memory at once. We would wanna be processing things a little bit at a time, and that's really where node starts to shine. We can do this via `stream` operation.    


<!-- get-stdin package -->

So we want to be able to support not only telling us file by name, but also we want our program to be able to receive the file inputs on the `stdin` stream. So we need some way of indicating that to our program on a command-line parameter, we need some flag to tell it. Hey get your stuff from 'stdin' instead of trying to look for it in the file (we'll be using "in" parameter for that).

<!--
  const args = require('minimist')(process.argv.slice(2), {
    boolean: ['help', 'in'],
    string: ['file'],
  });
-->


Now we'll notice that we are going to wanna call `processFile`, but we are gonna need to not pass it a string path anymore. We are gonna go ahead and pass it the contents of the file. Because we either might have got it from a 'file' or we might have got it from 'stdin'   

<!--
  get-stdin is a promise returning mechanism. So it's going to resolve a promise with all the contents that it got from 'stdin', and it will capture all of them and resolve.
-->
getStdin()

So we'll do some redesign of our code
<!--
  if (args.help) {
    printHelp();
  } else if (
    args.in ||
    args._.includes('-')
  ) {
    getStdin().then(processFile).catch(error);
  } else if (args.file) {
    let filePath = path.resolve(args.file);
    fs.readFile(filePath, function (err, contents) {
      if (err) {
        error(err.toString());
      } else {
        processFile(contents);
      }
    });
  } else {
    error('Incorrect usage.', true);
  }

  function processFile(contents) {
    contents = contents.toString().toUpperCase();
    process.stdout.write(contents);
  }

  function printHelp() {
    console.log('ex8 usage:');
    console.log(' ex8.js --file={FILENAME}');
    console.log('');
    console.log('--help                 print this help');
    console.log('--file={FILENAME}      process the file');
    console.log('--in, -                process stdin');
    console.log('');
  }
-->


One of the conventions that is somewhat common within the parameters is that if we have a `-` at the end of the line that's another way of saying : hey guess what 'stdin' is gonna provide all the rest of the inputs. So we wanna handle that (we know the 'minimist' doesn't know how to process the `-`).



`args._.includes('-')`
    - the underscore (`_`) in `args` is the array of overflow if there's anything else on the line that minimist couldn't figure out what to do with. We are gonna say if that array includes the '-', then that will tell us that we want to do `stdin` process.


<!-- TERMINAL -->
> chmod u+x ex8.js
> ./ex8.js --file=hello.txt


<!--
  OUTPUT
  ./ex8.js --file=hello.txt
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

<!--
  `cat ./hello.txt | ./ex8.js --in` or `cat ./hello.txt | ./ex8.js -`
    - we are using the built-in command called `cat`, we are gonna say './hello.txt' and we are going to pipe (`|`) the 'hello.txt' file data into our '.ex8.js', and we are just tell it (using `--in`) to expect to process from 'stdin'
-->
<!-- TERMINAL -->
> chmod u+x ex8.js
> cat ./hello.txt | ./ex8.js --in

<!--
  OUTPUT
  args:  { _: [], help: false, in: true }
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

`stdin` vs `stdout`
- So if `stdout` is our output stream where we are pushing from our program back out to the shell. Then `stdin` is the stream of any contents that are currently like in the buffer of our shell that are gonna go in our program. So when we do a pipe command (`|` in `cat ./hello.txt | ./ex8.js --in` or `cat ./hello.txt | ./ex8.js -`). What we are saying is anything that `cat ./hello.txt` created as a stdout output, it would normally just be dumped to the shell. But if we  pipe (`|`) it, that's saying turn the output into an input stream. And then we are basically saying take that input stream and pipe it directly into `./ex8.js` program.
