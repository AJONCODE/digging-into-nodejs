"use strict";

var util = require("util");
var path = require("path");
var fs = require("fs");

var sqlite3 = require("sqlite3");

const DB_PATH = path.join(__dirname, "my.db");
const DB_SQL_PATH = path.join(__dirname, "mydb.sql");

var args = require('minimist')(process.argv.slice(2), {
    string: ['other']
});

main().catch(console.error);

// *****************************************************************************

var SQL3;

async function main() {
    if (!args.other) {
        error("Missing '--other=...'");
        return;
    }

    // define some SQLite3 database helpers
    var myDB = new sqlite3.Database(DB_PATH);

    SQL3 = {
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

    var initSQL = fs.readFileSync(DB_SQL_PATH, "utf-8")

    // NOTE: initialize the DB structure
    await SQL3.exec(initSQL);

    var other = args.other;
    var something = Math.trunc(Math.random() * 1E9);

    var otherID = await insertOrLookupOther(other);

    if (otherID) {
        /*
            NOTE: : Now that we just inserted or we looked up. Now the next task is
            to insert 'something' in the 'something' table
        */
        let result = await insertSomething(otherID, something);

        if (result) {
            console.log('Success!');
            return;
        }
    }

    error("Oops!");
}


async function insertOrLookupOther(other) {
    var result = await SQL3.get(
        `
            SELECT
                id
            FROM
                Other
            WHERE
                data = ?
        `,
        other
    );

    if (result && result.id) {
        return result.id;
    } else {
        result = await SQL3.run(
            `
              INSERT INTO
                  Other (data)
              VALUES
                  (?)
          `,
            other
        );

        if (result && result.lastID) {
            return result.lastID;
        }
    }
}

async function insertSomething(otherID, something) {
    var result = await SQL3.run(
        `
            INSERT INTO
                Something(otherID, data)
            VALUES
                (?, ?)
        `,
        otherID,
        something
    );

    if (result && result.changes > 0) {
        return true;
    }
    return false;
}

function error(err) {
    if (err) {
        console.log(err.toString());
        console.log("");
    }
}

// OUTPUT: > node ex1.js
// Missing '--other=...'

// OUTPUT: > node ex1.js --other=hello
// Success!
