How to use chrome dev tools debuging remotely for node process?

What we wanna do is basically insert a little bit of bug into the program that's gonna create an exception and we are gonna run it with the dev tools listening. We'll see that when the exception is thrown it actually pops us that exception over in the chrome dev tools and pauses our node process so that we can debug.

<!--
async function main() {
    console.log(`Load testing http://localhost:${HTTP_PORT}...`);

    var x = 0;
    while (true) {
        x++;
        process.stdout.write(`Sending ${MAX_CHILDREN} requests...`);
        let children = [];
        for (let i = 0; i < MAX_CHILDREN; i++) {
            children.push(childProc.spawn("node", ["ex5-child.js"]));
        }

        let resps = children.map(function wait(child) {
            return new Promise(function(res) {
                child.on("exit", function(code) {
                    if (code === 0) res(true);
                    res(false);
                });
            });
        });

        if (x > 20) {
            foo(); // no `foo` function => this will throw an exception
        }

        resps = await Promise.all(resps);

        if (resps.filter(Boolean).length === MAX_CHILDREN) {
            console.log("success!");
        } else {
            console.log("failure!");
        }

        await delay(1000);
    }
}
-->


open `chrome://inspect` in chrome browser.

<!-- TERMINAL : start server from 06_working_with_http_building-web-server/ex3 folder-->
> node ex3.js

<!--
OUTPUT :
    Listening on http://localhost:8039...
-->

<!-- TERMINAL -->
> node --inspect ex5.js

<!--
OUTPUT :
    Debugger listening on ws://127.0.0.1:9229/1c63719c-ae88-46e8-af5b-8b048e5a958a
    For help, see: https://nodejs.org/en/docs/inspector
    Load testing http://localhost:8039...
    Sending 5 requests...success!
    Sending 5 requests...success!
    Sending 5 requests...success!
    Sending 5 requests...success!
    Sending 5 requests...success!
    Sending 5 requests...ReferenceError: foo is not defined
        at main (/home/ajoncode/digging-into-node/exercises/08_child-process/ex5/ex5.js:37:13)
-->

`node --inspect ex5.js`
- `--inspect` flag is gonna tell node to go ahead and expose its listening protocol on that specific port and then chrome dev tools (which is listening to it) will immediately pick up on it and will now be able to inspect that.

 (move to chrome browser with link `chrome://inspect` asap and click on `inspect`. Go to source click on pause button and check on to `Pause on caught expections`.)

 Now we can actually see in our chrome dev tools what is happening.

 Now if we switch over to terminal, we'll see that chome dev tools have literally paused the node process. (And now we can start our debuging in chrome remotely.)
