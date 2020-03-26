- We talked about several things like
  - the problem if we're to process a really large file and our current approach is that we're pulling this whole thing in and dumping it out. So let's talk about how we might deal with `streams`.

HOW NODE STREAMS WORK ?
  `https://github.com/substack/stream-handbook`

- Basic idea that we need to grasp on to is that streams can be in a mode where we can read from them (read from what they are producing). That's called a read stream or a readable stream. And the other mode will be that there is a writable stream meaning that can receive inputs and we can write to them. Those are called `simplex streams`, meaning they are uni-directional (i.e., we can either read from it or write to it).

- There is an special kind of stream called a `duplex stream`, meaning which can be both read to and written from. (We'll not cover duplex stream here.)


<!--
let stream1; // readable stream
let stream2; // writable stream

let stream3 = stream1.pipe(stream2);
-->

<!--
Connecting those two via `stream1.pipe(stream2);`, so that the flow of data is continuous through them, then we literally will take the readable stream and pipe it into the writable stream. ('pipe' is a part of the readable interface. And the mechanisms under the covers that pipe uses to attach and start writing into it, those will only be available if we pass in a writable stream,)
-->

<!--
We call `.pipe` on a readable stream, and that hooks up a listener to listen for chunks of data that are coming through. These streams under the covers are in chunks. And they are reading binary data from a readable stream and then pushing it out to the writable stream. And they are doing this chunks at a time.
-->

So if we want to find out what was coming out of the process `stream1.pipe(stream2);`, then we need to put the return value from a '.pipe' call into another read stream. (`let stream3 = stream1.pipe(stream2);`)

So the pattern here is: `resultantReadableStream = readableStream.pipe(writableStream)`

And that means that we could then have kinda chain of these:
`resultantReadableStream = readableStream.pipe(writableStream1).pipe(writableStream2).pipe(writableStream3).pipe(finalWritableStream)`
- It just takes a readable stream pipes it to a writable stream and then expose it as a readable stream that can read from the other end of that and lets us keep chaining that to as many places as we need.

The pattern again is readable.pipe and pass in a writable stream and we get back a readable stream.
