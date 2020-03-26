We'll try to run our child process, check to see if it's successful and then wait for 1000 milliseconds and then try it again.

And eventually we may wanna be able spin up multiple child processes.

for loop is gonna loop upto the number of the `MAX_CHILDREN` and for each iteration of it, it's going
spawn off a new child process. But the trick is for each of the child processes, we need to listen for their exit code to check if it's `0`. And only if all of the children that we just spawn off return '0' should we mark as a success.

<!--
async function main() {
    console.log(`Load testing http://localhost:${HTTP_PORT}...`);
    let children = [];
    while (true) {
        process.stdout.write(`Sending ${MAX_CHILDREN} requests...`);

        for (let i = 0; i < MAX_CHILDREN; i++) {
            children.push(childProc.spawn("node", ["ex4-child.js"]));
        }
    }
}
-->

Now we need to baically turn those child processes into a list of promises that we'll resolve after those child processes finish (whether they are successful or not).

<!--
async function main() {
    console.log(`Load testing http://localhost:${HTTP_PORT}...`);
    let children = [];
    while (true) {
        process.stdout.write(`Sending ${MAX_CHILDREN} requests...`);

        for (let i = 0; i < MAX_CHILDREN; i++) {
            children.push(childProc.spawn("node", ["ex4-child.js"]));
        }

        let resps = children.map(function wait(child) {
            return new Promise(function(res) {
                child.on("exit", function(code) {
                    if (code === 0) res(true);
                    res(false);
                });
            });
        });
    }
}
-->

Now we need to wait for all of the promises to resolve in whatever order they finish in before moving on.
<!--
async function main() {
    console.log(`Load testing http://localhost:${HTTP_PORT}...`);
    let children = [];
    while (true) {
        process.stdout.write(`Sending ${MAX_CHILDREN} requests...`);

        for (let i = 0; i < MAX_CHILDREN; i++) {
            children.push(childProc.spawn("node", ["ex4-child.js"]));
        }

        let resps = children.map(function wait(child) {
            return new Promise(function(res) {
                child.on("exit", function(code) {
                    if (code === 0) res(true);
                    res(false);
                });
            });
        });

        resps = await Promise.all(resps);
    }
}
-->

Now we just need to check if all promises are true for success.

<!--
async function main() {
    console.log(`Load testing http://localhost:${HTTP_PORT}...`);
    while (true) {
        let children = [];
        process.stdout.write(`Sending ${MAX_CHILDREN} requests...`);

        for (let i = 0; i < MAX_CHILDREN; i++) {
            children.push(childProc.spawn("node", ["ex4-child.js"]));
        }

        let resps = children.map(function wait(child) {
            return new Promise(function(res) {
                child.on("exit", function(code) {
                    if (code === 0) res(true);
                    res(false);
                });
            });
        });

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

Just to be clear we are sending MAX_CHILDREN (in this case 5 ) via for loop in every while loop iteration.

(Be smart when using child processes.)
