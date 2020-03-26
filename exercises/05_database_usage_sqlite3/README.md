Our goal here is to use a database. And the database that we choose is `sqlite3`. The reason for our choice of sqlite3 is because it doesn't require a seperate database program running on our system. Sqlite by virtue of the name is a sort of stripped down (still poweful though) environment where the file is maintained directly by our application.

So sqlite3 module literally just gonna modify the file directly. We don't have to like talk via the network to some other big program like a sql server and it keeps them in flat binary file format locally right were we are working. So there's a lot of advantages to it if not having to administor a whole seperate server.

So if we want to build a simple an application, persist a little bit of data and have sort of a relational sql access to it, then sqlite is a really strong powerful option.

(Infact web browsers have sqlite built-in to them, and they literally use them for their data storage and so-forth.)

`npm install sqlite3`
  - sqlite uses a binary node extension, so our particular operating system and version of node needs to be built.

If we are using a version of node that's beyond version say 10.2 or above, then we already have the method called `console.table` built-in for us. But for version before say 10.2 or below, it really didn't have that and we can use `require('console.table')` to use that method.  
