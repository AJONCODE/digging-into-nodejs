`var httpserv = http.createServer(handleRequest);`
    - instantiate our server

`async function handleRequest(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });
    res.end("Hello World!");
}`
    - 'writeHead' is gonna write down all headers for our http response.
    - 'write' is gonna write some content to the http resoponse stream.
    - 'end' makes sure to end the streams so that everything is flushed.

<!--
    NOTE: For our purpose, since we are only sending one stream, we can actually pass that stream via `end`. But if we have more streams to pass onto the response http then we have to use 'res.write' and then flush everything by calling 'res.end();'
-->

All of the big major node router frameworks that are out there like express, etch. Really they boil down to a series of if statements. So if we want to do our own custom routing.

`async function handleRequest(req, res) {
    if (req.url === "/hello") {
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });
        res.end("Hello World!");
    } else {
        res.writeHead(404);
        res.end();
    }

}`

<!-- TERMINAL -->
> node ex1.js

<!--
    OUTPUT
    Listening on http://localhost:8039...
-->

<!--
    BROWSER: localhost:8039/
    Hello World!
-->
