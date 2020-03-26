So now that we know, we have a path to something and if as long as we give it a file we are gonna be able to do something with it. Let's make our command line script that we're building access that file and just print the contents on the screen.

To access the file system we're gonna need another built-in module from node called `fs`.

So we are gonna tell that I'm gonna wait around while you go and get this file.

<!-- TERMINAL -->
<!-- When we run this(by giving it a file that actually exists), we'll see some a little bit of quirk about how buffers work -->
> chmod u+x ex5.js
> ./ex5.js --file=hello.txt

<!--
  OUTPUT
  args:  { _: [], help: false, file: 'hello.txt' }
  <Buffer 4d 61 72 69 6f 20 49 63 61 72 64 69 0a 47 65 72 61 74 68 20 42 61 6c 65 0a 52 61 64 67 61 20 4e 61 69 6e 67 67 6f 6c 61 6e 0a 50 61 75 6c 20 50 6f 67 ... 28 more bytes>
  filePath :  /home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/ex5/hello.txt
  __dirname :  /home/ajoncode/digging-into-node/exercises/02_run_command-line_system-level_tasks/ex5
-->

`console.log(contents);`
We don't see the contents of the file, we actually see stringification of binary buffer. That's because by default the  `readFileSync` (infact most IO commands), they are assuming these low level binary buffers, they are not assuming that we wanna represent things as strings.

`process.stdout.write(contents);`
Now we are passing not a string but a buffer directly to the 'process.stdout.write'. Now we'll see that we pass the binary buffer directly to the shell, the shell knew what to do with those bytes and it translate them into characters.

So reason the `console.log(contents);` wasn't being translated is because by the time it got to the shell, 'console.log' had already stringify it into those characters that we saw. It wasn't passing along the buffer, it was passing along the strings of characters that said `<Buffer 4d 61 72 69 6f 20 49 63 61 72 64 69 0a 47 65 72 61 74 68 20 42 61 6c 65 0a 52 61 64 67 61 20 4e 61 69 6e 67 67 6f 6c 61 6e 0a 50 61 75 6c 20 50 6f 67 ... 28 more bytes>`.

So when we want to pass along a buffer, we gonna make sure we actually dealing with a buffer and not something that's gonna convert it into a string first. And that's why it was said earlier that 'console.log' does more than just put a new line at the end. It acutally tries to do some processing on the values. That's why when we do 'console.log("42")' or 'console.log(42)', it does different colored output in our shell. It's because 'console.log' is doing a bunch of extra value processing, and when we don't want the value processing what we really wanna do is just 'process.stdout.write'.

Now one other thing that we could have done if we really need string and not buffer, we could have told the 'readFileSync' to use particulat encoding `utf8`. If we pass an encoding to one of the file system commands like 'readFileSync' command and we give it an encoding, then it will say oh! ok I know you not wanting the buffer, you are actually wanting a real string.

But there's a slight performance difference, because now we handed from our node program to the shell environment is a pre-processed string which is slightly less efficient (by like microseconds) than handing it a stream of binary data. We must keep this in mind when dealing with input and output of data.  

<!-- Why use sync method ? -->
Now we are using a synchronous form of this read file because it's really easy to use synchronous commands, but know that one of the things that node was designed to be is asynchronous everywhere (atleast as much as possible). That's not entirely true because from the very beginning node had a synchronous `require`. So the truth is actually that node said everything that's not part of the start-up should be asynchronous. Well in a command line script everything is a part of the start-up basically. So technically it doesn't matter if we stay synchronous because chances of us running thousands of instances of our command line script all at the same time, all against the same part of the file system and blocking each other or whatever. The chances of that are really low. So it would be okay for us if we are just doing some quick and dirty scripting to use the synchronous forms. But since we'll be doing a lots of other things throughout the rest of the exercises, we really wanna get experienced with practicing asynchronous stuff.
