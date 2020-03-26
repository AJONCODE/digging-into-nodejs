- We are gonna make essentially an executable shell script (a simple one to start)

How we can write a command line script that is gonna execute similar to if it was a bash script?

- One of the standard conventions if we are working in a typical linux kind of shell like bash or zsh, is that we can put what's called the shebang(`#!`) comment at the top of a file and that will tell the shell environment that when it starts to execute it, it knows what program to hind that execution of to instead of trying to interpretate as a bash script.


`#!fileToUseForInterpretation`
- Since we want our file to be interpretate by node, so we can give it the full path to our node program. But if we want our script to be able to run on say all of the developer machines, we probablily want to be a bit more agnostic about it, so there's a trick there is another program called `env` that will be available on all of our distros (distributions of linux or mac).

`env`
- We give the name of an executable and it finds where that is for us.

`#!/usr/bin/env node` or `#!/usr/bin/env nodejs`
- This is saying, go find node where ever it is in our system and use node to interpretate the rest of our program.
- `/usr/bin/env` is the path where nodejs is installed in our system.

`"use strict";`
- We should always run our program in strict mode.
- We typically think of `"use strict";` is only working if it's at the very top of the file without anything in front of it. But we actually have `#!/usr/bin/env node` or `#!/usr/bin/env nodejs` before it. So the thing we need to be aware of is that by the time this line of code (`#!/usr/bin/env node` or `#!/usr/bin/env nodejs`) runs with node that line of code (`#!/usr/bin/env node` or `#!/usr/bin/env nodejs`) would be actually empty. So it been already stripped out by the processing environment by the time it runs. Thus we don't have to worry about `#!/usr/bin/env node` or `#!/usr/bin/env nodejs` being an invalid javascript syntax.

Making it an executable
- In linux system, if we look into file descriptors and look into files  eg.,
  1. `-rwxr--r--`. So if `x` is there, then it can be executed as a user.
  2. `-rw-r--r--`. So if `x` is not in there, then it can't be executed as a user.

<!-- TERMINAL -->

<!-- `which nodejs` is used to show the path where nodjs is installed  -->
> which nodejs


<!-- `ls -la` is used to show all files executable or not  -->

<!-- To make executable we can say -->
> chmod u+x ex1.js
> ls -la
> ./ex1.js

<!--  `./ex1.js` will run the executable file -->

- One other thing that we want to do is whenever we are going to working with a node script or any kind of shell script that we are making is we wanna have good clean output for these things. We should put for ourselves some kind of help output for our scripts, because we'll come back to the script three days from now and completely forget, how it is we are suppose to pass stuff in.   
