#!/usr/bin/env node

"use strict";

var util = require("util");
var path = require("path");
var http = require("http");

// var sqlite3 = require("sqlite3");
var staticAlias = require("node-static-alias");

// const DB_PATH = path.join(__dirname, "my.db");
const WEB_PATH = path.join(__dirname, "../../../web");
const HTTP_PORT = 8039;

// var delay = util.promisify(setTimeout);

var SQL3;

var httpserv = http.createServer(handleRequest);

main();

// *****************************************************************************

var fileServer = new staticAlias.Server(WEB_PATH, {
    cache: 100,
    serverInfo: "Node workshop: 06_working_with_http_building-web-server",
    alias: [{
            match: /^\/(?:index\/?)?(?:[?#].*$)?$/,
            serve: "index.html",
            force: true
        },
        {
            match: /^\/js\/.+$/,
            serve: "<% absPath %>",
            force: true
        },
        {
            match: /^\/(?:[\w\d]+)(?:[\/?#].*$)?$/,
            serve: function onMatch(params) {
                return `${params.basename}.html`;
            }
        },
        {
            match: /[^]/,
            serve: "404.html"
        }
    ]
});

function main() {
    httpserv.listen(HTTP_PORT);
    console.log(`Listening on http://localhost:${HTTP_PORT}...`);
}

async function handleRequest(req, res) {
    fileServer.serve(req, res);
}

function error(err) {
    if (err) {
        console.log(err.toString());
        console.log("");
    }
}

// OUTPUT: > node ex2.js
// Listening on http://localhost:8039...
