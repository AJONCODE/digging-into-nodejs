How could we respond to AJAX request (How could we have an api end-point)?
<!-- async function handleRequest(req, res) {
    if (req.url === "/get-records") {
        // NOTE: handle manually
        let records = await getAllRecords();

        res.writeHead(200, {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        });
        res.end(JSON.stringify(records));
    } else {
        fileServer.serve(req, res);
    }
} -->

- `req.url === "get-records"`: then we'll be using our 'getAllRecords' to retrieve all records from database

<!--
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
-->

- If we do not have any database then simply copy 'my.db' from sql exercise or use fake records :
<!--
async function getAllRecords() {
	// fake DB results returned
	return [
		{ something: 53988400, other: "hello" },
		{ something: 342383991, other: "hello" },
		{ something: 7367746, other: "world" },
	];
}
-->

Now let's simulate that the results might be coming back a little bit more slowly :
<!-- var delay = util.promisify(setTimeout); -->


<!--
async function handleRequest(req, res) {
    if (req.url === "/get-records") {
        // NOTE: delay of one second into our response from the database
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
-->

04:53:00
