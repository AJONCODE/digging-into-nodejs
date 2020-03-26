In `POSIX` standard convention:
- `0` exit code means everything is fine.
- anything non-zero means something went wrong.

We are gonna use the exit codes as our communication channel, instead of worrying about 'stdin' or 'stdout'. We are just gonna use exit code : if our child is successful at its task, it's gonna return `0` and if it's unsuccessful for any reason, it's gonna return 1.

So our parent `ex3.js` is gonna need to listen for these children and see if their exit code is returning back 0 or not to know if it's unsuccessful.

So in `ex3-child.js`, we are gonna make an ajax request via `node-fetch`.
<!-- var fetch = require("node-fetch"); -->

<!--
async function main() {
    try {
        let res = await fetch("http://localhost:8039/get-records");

        if (res && res.ok) {
            let records = await res.json();
            if (records && records.length > 0) {
                process.exitCode = 0;
                return;
            }
        }
    } catch (err) {}

    process.exitCode = 1;
}
-->

<!-- TERMINAL -->
> node ex3.js

<!-- OUTPUT:
    Child finished :  1
-->

<!-- TERMINAL -->
> node ex3-child.js

<!-- OUTPUT:
  ex3-child process running.
-->

Child process simply runs, but it doesn't give us any indication about whether it suceeded or not. So how can we test from command line what the exit code is. We can't really see the exit code, but there is a way to implicitly determine what the exit code might have been.

The way we are going to implicitly determine that is to observe.

The way the command line works, if we are doing multiple commands, is that if any command fails and gives us non-zero exit code it stops the rest of the process from happening.

<!-- TERMINAL -->
> node ex3-child.js && ls -la

<!-- OUTPUT:
    ex3-child process running.
    total 20
    drwxr-xr-x 2 ajoncode ajoncode 4096 Mar 22 13:30 .
    drwxr-xr-x 5 ajoncode ajoncode 4096 Mar 22 13:30 ..
    -rw-r--r-- 1 ajoncode ajoncode  513 Mar 22 20:39 ex3-child.js
    -rw-r--r-- 1 ajoncode ajoncode  382 Mar 22 20:39 ex3.js
    -rw-r--r-- 1 ajoncode ajoncode 1887 Mar 22 20:51 README.md
-->


So the directory listing will only happen if `ex3-child.js` gives us `0` exit code.
<!-- `ls -la`: is a directory listing -->
