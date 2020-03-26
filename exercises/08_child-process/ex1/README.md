`child_process` is a built-in node module.
<!-- var childProc = require("child_process"); -->

So the basic concept behind the child process is that we end up setting up this separate thing and then we get back an object that has `stdio` streams on it and that's how we know what input we might send to the child process and what output or errors we might be getting back from the child process.

So we are gonna end up calling a method called `spawn` on this 'child_process' module, that's gonna end up creating an object that represents the child.
<!--
    async function main() {
        var child = childProc.spawn("node", ["ex1-child.js"]);
        child.on("exit", function(code) {
            console.log("Child finished : ", code);
        });
    }
 -->

`childProc.spawn("node", ["ex1-child.js"]);`
    - the executable is actually 'node' itself.
    - the parameters that we want to pass to node are `"ex1-child.js"`.

Now child as we said comes back, that has elements on it where we can listen to an event on it, and we can also read and write from its 'stdio'.

In our particular case I think all we wanna do is ask did it finish.
`child.on("exit", function(code) {
    console.log("Child finished : ", code);
});`

So what we are gonna put in our child process. So for now let's just do something simple so that we can test whether or not our child process communication stuff is working.

<!--
"use strict";

var fetch = require("node-fetch");

const HTTP_PORT = 8039;

main().catch(() => 1);

async function main() {
    var x = 0;
    for (let i = 0; i < 1000000; i++) {
        x = i + 1;
    }
}
-->

<!-- TERMINAL -->
> node ex1.js

<!-- OUTPUT:
  Child finished :  0
-->

<!-- TERMINAL -->
> node ex1-child.js

<!-- OUTPUT:
  ex1-child process running.
-->

<!-- TERMINAL -->
> node ex1.js

<!-- OUTPUT:
  Child finished :  0
-->

Notice that the last `node ex1.js` is giving us `Child finished :  0` (that is the default exit code when a process finishes with success).
