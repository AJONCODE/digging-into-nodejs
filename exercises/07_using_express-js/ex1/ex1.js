#!/usr/bin/env node

"use strict";

var util = require("util");
var path = require("path");
var http = require("http");

var express = require("express");
var sqlite3 = require("sqlite3");
// var staticAlias = require("node-static-alias");

var express = require("express");
var app = express();

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

// var httpserv = http.createServer(handleRequest);
var httpserv = http.createServer(app);

main();

function main() {
    defineRoutes();
    httpserv.listen(HTTP_PORT);
    console.log(`Listening on http://localhost:${HTTP_PORT}...`);
}

function defineRoutes() {
    app.get("/get-records", async function(req, res) {
        await delay(1000);
        var records = await getAllRecords();
        res.writeHead(200, {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        });
        res.end(JSON.stringify(records));
    });

    // NOTE: Handling friendly url rewrites
    app.use(function(req, res, next) {
        // rewriting the url from friendly version to the real version
        if (/^\/(?:index\/?)?(?:[?#].*$)?$/.test(req.url)) {
            req.url = "/index.html";
        } else if (/^\/js\/.+$/.test(req.url)) {
            next();
            return;
        } else if (/^\/(?:[\w\d]+)(?:[\/?#].*$)?$/.test(req.url)) {
            let [, basename] = req.url.match(/^\/(?:[\w\d]+)(?:[\/?#].*$)?$/);
            req.url = `${basename}.html`;
        } else {
            req.url = "/404.html";
        }

        next();
    });

    // NOTE: handling static file requests
    app.use(express.static(WEB_PATH, {
        maxAge: 100,
        setHeaders: function setHeaders(res) {
            res.setHeader("Server", "Working with express");
        }
    }));
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
