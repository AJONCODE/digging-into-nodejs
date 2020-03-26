Before we can even write a node program, we have to ask ourselves the question:
How am I going to get information into my program in some way, but even more important than that how am I gonna get information out?
- Node is all about modelling IO in an efficient way. Which means we need to understand IO at a deeper level that we are perhaps used to.

How something with console gets printed onto the screen?
- `POSIX`. POSIX is essentially the way that C style programs integrate with Linux style OS. So when we talk about POSIX, one of the major things that are talking about is Standard IO subsystem. Standard IO is a set of 3 streams that model input and output to a program. So we have file descriptors that reference input, output and a second channel of output called error.

How would we access at a fundamental level those IO streams that are exposed to our node program?
- Because node made the choice to expose most of the system connections through a POSIX like interface. The main touch point that we are gonna access them on is called process (process is an object that is available in all of our node programs and they hang a bunch of stuff off of process that are the connections to our overall hosting system).

The reason we have node choosing to do it with POSIX, but we don't write something like process in the browser is because javascript does not have anything in the spec for IO. `console.log` is not in the javascript spec. Javascript is agnostic to IO. And that's one of the reasons why javascript has been so successfull. Its been so much easier for javascript to adapt to other environments like smart-watch, robot, tv, computer because the language doesn't make very many assumptions abut how communication gonna happen. It's upto the environment to decide that. Since node was originally designed and was likely gonna be run in those POSIX environments, it makes aweful lot of sense that they would choose to expose the IO to our programs through that POSIX interface.

In the browser, that's not a POSIX environment (we are not dealing with process and that kind of stuff). So when we do `console.log`, and it's running in the browser the browser chose to expose it in a different way (it's just a direct connection over to the developer tools).

streams
- streams are actual kind of data-structure in node.

1. `stdout` (output stream)
`process.stdout`
- to access the stream for stdout output
- no trailing new line

- We can think of `console.log` as a wrapper around `process.stdout.write` that throws on a trailing new line. But that's not accurate. `console.log` is doing many other things beside simply calling `process.stdout.write`. But in case of a very simple string, we can sort of think of it in that way, its kind of the equivalent to if we put a trailing new line in our output before sending it out.

`process.stdout.write("Hello world\n");`
`console.log("Hello world");`

The reason why we are making a point of about accessing these output streams in a very bare way, is because the whole point of node using this asynchronous IO model is so that IO can happen as efficient as possible. And the least possible efficient way for IO to happen is for you to print a character string directly to some stream. So `process.stdout.write("Hello world\n");` is the least efficient way for that to possibly happen. Because it has to go through layers of translation to end up at the host environment (that is our shell environment that we are running things in) and actually end up gettig printed. We don't see that detail, but there layers of abstraction where that stuff is being converted or whatever.

So if we were to for example have a stream that already had the binary bits of information for the "Hello world" string in it and we did `process.stdout.write` with binary stream (or the buffer), then it will go much more efficiently to directly through those sub-systems and still get printed out as characters in our shell.

2. `stderr` (output stream)
`process.stderr`

`process.stderr.write('Opps\n');`
`console.error('Oops');`

- `console.log` and `console.error` are gonna direct themselves to two different standard IO streams (stdout and stderr). When we look the two in shell environment, they kinda look same, thats because the shell environment that we are running in is gonna interpretate stdout and stderr outputs both the same and just prints them. But they are actually differnt and we can prove to ourselves that they are different by doing some file descriptor redirections (file output redirections).

<!-- TERMINAL -->
<!--
    `1` denotes a file descriptor which is stdout
    `2` denotes a file descriptor which is stdoerr

    `dev>null` is basically a bit trash can (anything that goes into that is just completely thrown away )
-->

> node ex1.js 1>dev>null

<!--
    After running the `node ex1.js 1>dev>null` command we will notice that stdout (`process.stdout.write` or `console.log`) stuff didn't print out anymore. Its because we redirected the stdout stream to dev>null (bit trash can).
-->

> node ex1.js 2>dev>null

<!--
    After running the `node ex1.js 2>dev>null` command we will notice that stderr (`process.stderr.write` or `console.error`) stuff didn't print out anymore. Its because we redirected the stderr stream to dev>null (bit trash can).
-->

> node ex1.js 2>dev>null 1>&2

<!--
    `1>&2` in `node ex1.js 2>dev>null 1>&2` implies :
    we are gonna redirect `1` to the address that we are already redirecting `2` and now both of them are gone.
-->

- This is critical to understand these basic ideas of file descriptors and stdout vs stderr, because if we are gonna write a command line shell tool something like a replacement of a bash script, one of the strong conventions is that we do regular debug output on the stdout and we do any sort of error outputs on stderr. And the reason is system monitoring tools will often hook in to the stderr stream and write those to log files (for example). They may not write all the debugging information thats comming out but they want the errors. So its good for us to make sure its very important to us, if we are gonna do an error don't just do console.log because that's our habit, do something like console.error so that it goes to the error stream.

- We don't tipically do that ourself on the command line, but this is the sort of thing that our system automation tools will often be doing when they run our programs, they will be redirecting outputs to different log files.


3. `stdin` (Input stream)

`process.stdin.read`
- We could in theory can access that stream directly. We could call read and read a character (read a byte) off of the stdin stream. We are not gonna use raw stream and its because input streams are much more quirky than the output streams. When we want to use stdin, we can use a package called `get-srdin` that already handles all those quirky behaviours of stdin in a platform agnostic way.
