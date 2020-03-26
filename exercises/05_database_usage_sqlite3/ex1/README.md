`const DB_PATH = path.join(__dirname, "my.db");`
    - path to where we are storing our database.

`const DB_SQL_PATH = path.join(__dirname, "mydb.sql");`
    - path to where we are storing the schema for our database.


`var myDB = new sqlite3.Database(DB_PATH);`
    - we are opening our database (i.e., initialzing in our memory).

<!-- We are setting up some helpers -->
`SQL3 = {
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
};`

`util.promisify`
    - So each of the methods that's exposed by sqlite are callback expecting functions. But we want to work with promises because it's a cleaner interface for asynchronicity. In `util.promisify`, we can pass-in the function that expects callbacks and we get back a function that gives us promises.

`var initSQL = fs.readFileSync(DB_SQL_PATH, "utf-8");`
    - load the sql schema path.

`await SQL3.exec(initSQL);`
    - initialize the DB structure.


<!--
    Now what are we doing within this exercise?
        - We are gonna make a simple little command line app. When we run it, we can pass-in a value (`other`) as a command line parameter and it generates another value (`something`) and it sticks those two values relate them with keys into database record. So we can add a new record each time we call the program and then dump all of the current contents .
-->

If we go back to our schema, we'll notice exactly what's happening there.
  - We have `something` table, which is gonna hold 'something' values. And we have `other` table which stores the 'other' value that we passed via command line. And we are relating 'something' and 'other' via foreign key. (So if we kept calling the program with 'foo' over and over again as command line paramneter for 'other', then there will only be 1 record in the 'other' table, and bunch of related records in the 'something' table.)


So the first thing that we want to do is decide whether or not the other that we have been provided (via command line as a parameter) is already in the database or not. If it's not, we need to insert it. If it is, we need to get its id. So we'll make a function that's called `insertOrLookupOther`.   

<!--
    NOTE : insertOrLookupOther function will look into the database and return the other parameter ID if it exists. If it didn't exist in our database, then we'll be creating new one and return its ID.
-->


<!--
/*
    ? is how we give value for a placeholder to be interpretated in SQL api.
*/
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
-->

<!--
  async insertSomething(otherID, something) {
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
-->
To check if something has been added to the record in the database, we have a `changes` property. `result.changes` here indicates how many of the rows changed in the database. As long as `result.changes > 0`, then we know that we definitely were successful in inserting the record.    

<!--
    var otherID = await insertOrLookupOther(other);
    if (otherID) {
        /*
            NOTE: : Now that we just inserted or we looked up. Now the next task is
            to insert 'something' in the 'something' table
        */
        let result = await insertSomething(otherID, something);
        return;
    }
-->
Now we need to check to see whether or not it was successful



<!-- TERMINAL -->
> node ex1.js

<!--
    OUTPUT:
        Missing '--other=...'
-->

<!-- TERMINAL -->
> node ex1.js --other=hello

<!--
    OUTPUT:
        Success!
-->
