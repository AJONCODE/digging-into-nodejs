#!/usr/bin/env node

"use strict";

var util = require("util");
var path = require("path");
var http = require("http");

var sqlite3 = require("sqlite3");
var staticAlias = require("node-static-alias");

const DB_PATH = path.join(__dirname, "my.db");
const WEB_PATH = path.join(__dirname, "../../../web");
const HTTP_PORT = 8039;

var delay = util.promisify(setTimeout);
var myDB = new sqlite3.Database(DB_PATH);

var SQL3 = {
    run(...args) {
        return new Promise(function c(resolve, reject) {
            myDB.run(...args, function onResult(err) {
                if (err) reject(err);
                else resolve(this);
            });
        });
    },
    get: util.promisify(myDB.get.bind(myDB)),
    all: util.promisify(myDB.all.bind(myDB)),
    exec: util.promisify(myDB.exec.bind(myDB))
};

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
    if (req.url === "/get-records") {
        await delay(1000);
        let records = await getAllRecords();

        res.writeHead(200, {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        });
        res.end(JSON.stringify(records));
    } else {
        fileServer.serve(req, res);
    }
}

function error(err) {
    if (err) {
        console.log(err.toString());
        console.log("");
    }
}

async function getAllRecords() {
    var result = await SQL3.all(
        `
            SELECT
                Other.data AS 'other',
                Something.data AS 'something'
            FROM
                Something JOIN Other
                ON (Something.otherID = Other.id)
            ORDER BY
                Other.id DESC, Something.data ASC
        `
    );

    if (result && result.length > 0) {
        return result;
    }
}

// *************************
// NOTE: uncomment and use this version if
//   sqlite3 is not working for you
// *************************
// async function getAllRecords() {
// 	// fake DB results returned
// 	return [
// 		{ something: 53988400, other: "hello" },
// 		{ something: 342383991, other: "hello" },
// 		{ something: 7367746, other: "world" },
// 	];
// }
