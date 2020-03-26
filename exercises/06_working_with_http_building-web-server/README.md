We'll gonna be building a web server. And our web server is going to have an api end point that serves the records from our database to a web page.

`http` module is used to handle all the details of doing http request & response handling in our web server.

`node-static-alias` module is a wrapper around a more commonly package called `node-static`, which is one of the more common of the static file servers. Especifically that one handles all of the mime type handling and content length calculations and all other junk that we don't wanna do whenever we serve javascript, css or any other kinda files, static file servers are what do that for us. And 'node-static' is probabily one of the most well known of those. 'node-static-alias' is a wrapper around 'node-static', that gives us a little more declarative alias url routing.
