#!/usr/bin/env node

"use strict";

var util = require("util");
var path = require("path");
var http = require("http");

var staticAlias = require("node-static-alias");

const HTTP_PORT = 8039;

var SQL3;

var httpserv = http.createServer(handleRequest);

main();

// *****************************************************************************



function main() {
    httpserv.listen(HTTP_PORT);
    console.log(`Listening on http://localhost:${HTTP_PORT}...`);
}

async function handleRequest(req, res) {
    if (req.url === "/hello") {
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });
        res.end("Hello World!");
    } else {
        res.writeHead(404);
        res.end();
    }
}

function error(err) {
    if (err) {
        console.log(err.toString());
        console.log("");
    }
}

// OUTPUT: > node ex1.js
// Listening on http://localhost:8017...

// BROWSER: localhost:8039
// Hello World!
