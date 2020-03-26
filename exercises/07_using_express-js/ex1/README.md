<!-- var express = require("express"); -->

The way express works is we call the express function.
<!-- var app = express(); -->
  - `app` represents express app.

We actually use app by passing it to our http server instance.
<!-- var httpserv = http.createServer(app); -->

In other words app is automatically generated handleRequest function, that receives request and response streams and handles them. (Inside the app function we may see fancy for loop with some if statements in it.)

We do need to configure express, so that it knows what routes we want to use.

<!--
function defineRoutes() {
    app.get("/get-records", async function(req, res) {
        var records = await getAllRecords();
        res.writeHead(200, {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        });
        res.end(JSON.stringify(records));
    });

    // NOTE: handling static file requests
    app.use(express.static(WEB_PATH, {
        maxAge: 100,
        setHeaders: function setHeaders(res) {
            res.setHeader("Server", "Working with express");
        }
    }));
}
-->

*Instead of writing if statements, we declaratively state the route by calling out 'app.get'. And express will internally match to make sure that any 'get' method is the described url will call the associative function.*

`app.get`: is specifically for 'get' requests.
`app.use`: is for all incoming requests

`express.static` is a static file server that almost exactly identical to node static.
Setting custom headers with express :
<!--
    setHeaders: function setHeaders(res) {
        res.setHeader("Server", "Working with express");
    }
-->

Handling friendly url rewrites:
if the function we are using inside `app.use` is asynchronous, then we need to have a third parameter that we have to call (which is a callback function). We have to call the 'next' to tell express to move to next thing. If we don't call next, then express will assume that we have manually handled the response.

<!-- In express the order in which app is used matters -->

<!--
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
})
-->

Finally
<!--
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
-->
