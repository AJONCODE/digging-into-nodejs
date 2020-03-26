"use strict";

const HTTP_PORT = 8039;

main().catch(() => 1);

async function main() {
    console.log("ex1-child process running.");
    var x = 0;
    for (let i = 0; i < 1000000; i++) {
        x = i + 1;
    }
}
