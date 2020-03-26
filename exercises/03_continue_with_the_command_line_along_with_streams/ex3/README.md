By default we are printing to the `stdout`. But let's just for our purposes have a default of writing to a file and then we'll have a configuration where we can dump to the `stdout` if we would want. But for default we'll assume that we want to write to another file.

So I am gonna create a variable called `OUTFILE` and we want the 'OUTFILE' to be the 'path.join' with the 'BASE_PATH' and concatinate it with the file name of 'out.txt'.

<!--
  const OUTFILE = path.join(BASE_PATH, 'out.txt');
-->

<!--
  So we are basically just saying whatever it found the file, whatever kinda processing it did, it's gonna write it back out to the another file.
-->

Now if we setup a boolean flag for out, this is gonna allow us to tell it `no don't write it to that file just jump into the 'stdout'`. We'll be gonna able to control the target stream that we wanna go out.
<!--
const args = require('minimist')(process.argv.slice(2), {
    boolean: ['help', 'in', 'out'],
    string: ['file'],
});
-->

So in `processFile` we need to do some changes :

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

<!-- TERMINAL -->
> chmod u+x ex3.js
> ./ex3.js --file=hello.txt

<!--
  OUTPUT
  args:  { _: [], help: false, in: false, file: 'hello.txt' }
-->

<!-- Apart from the output a file will also be generated named `out.txt` with all data from file `hello.txt` uppercased.  -->
