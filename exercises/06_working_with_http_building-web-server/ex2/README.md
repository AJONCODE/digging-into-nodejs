

Ok writing out text like that is not particularly intresting. So, How do i send whole website?
- We will be serving our html and javascript files to the browser through `node-static-alias` package.

`var staticAlias = require("node-static-alias");`

<!-- 'WEB_PATH' is going to be essentially the document root -->
`const WEB_PATH = path.join(__dirname, "../../../web");`

<!-- Setting up a static file server -->
`var fileServer = new staticAlias.Server(WEB_PATH, {
        cache: 100,
        serverInfo: "Node workshop: 06_working_with_http_building-web-server",
        alias: [
            {
                match: /^\/(?:index/\?)?(?:[?#].*$)?$/,
                serve: "index.html",
                force: true
            }
        ]
});`
    - we have set a sort 100 millisecond cache.
    - serverInfo will have some information regarding server.
    - *the important part here is that we wanna set-up some routes to determine what files map to which incoming url via  alias*

`alias: [
    {
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
]`

    - `/^\/(?:index/\?)?(?:[?#].*$)?$/` : if the url has either the word 'index' or nothing and then optionally if it's followed by some path separator like '?' or '#' (path separator may or may not exist in the url) implies the match is true.
    - if the match is true then, we'll serve index.html file
    - 'force' here tells us that if the match is true, then it has to be able to find 'index.html' or else it got to throw '404'.

    - `/^\/js\/.+$/`: if the incoming request is '/js' and then anything else on it
    - if the match is true then, we'll serve as it is (as defined in the url)

    - `/^\/(?:[\w\d]+)(?:[\/?#].*$)?$/`: we are basically saying if their is any portion on the url has words or numbers followed by url seperators on it (if any)
    - if the match is true then just serve exactly that (from url) with .html connected to it.
    - since we do not do force on this one, so if associated '.html' file is not to be found then `/[^]/` regex is matched

    - `/[^]/`: this is sort of catch all (if no above cases are served, then only this match will be true.)
    - if the match is true then, we'll serve '404.html' file

<!-- Telling fileServer to handle incoming request -->
`async function handleRequest(req, res) {
    fileServer.serve(req, res);
}`

<!-- TERMINAL -->
> node ex2.js

<!--
  OUTPUT:
  Listening on http://localhost:8039...
-->

***If we open url 'http://localhost:8039', browser will open file '../../../web/index.html'***

<!-- TERMINAL -->
> node ex2.js

<!-- Now specific path will open specific html pages and unspecified will open 404.html file -->
