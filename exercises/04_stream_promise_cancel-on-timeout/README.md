If we have 2 different concurrent things that are happening and we don't know what order they are gonna finishing, but I wanna wait for both of them to finish that general concept in asynchronicity can be modelled with a gate which we can do with `Promise.all()`.

So if we're to attach a promise (similar to a `getStdin` where we had a stream that had a promise on the end) to the end of the stream read (like we just did in 'streamComplete'. Attach a promise which tells us when the stream has finished and gives us all of its contents.)

And we had promise for 2 streams and put both of them (promises) into a `promise.all([])`, that promise would resolve whenever both of them have successfully completed (whichever order they finish in).

<!--
    stream1;
    stream2;

    function streamComplete(stream) {
        return new Promise(function c(res) {
            stream.on('end', res);
        });
    }

    var allDone = Promise.all([
      streamComplete(stream1),
      streamComplete(stream2)
    ])
    .then(function(responses) {
        responses[0]; // stream1's contents
        responses[1]; // stream2's contents
    });
-->
