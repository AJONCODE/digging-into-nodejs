# Digging Into Node

Kyle Simpson (Frontend Masters)

Ryan set out to build high throughput low latency socket servers. His idea of system architecture was that a system was comprised of a bunch of tiny little single purpose socket services, that all communicates with each other through very efficient network communications. And he was building node in ruby. But he really quickly realised that he needed this concept of an event loop to make that kind of asynchronity work and ruby didn't have that. And some where along his aspiration he realised JavaScript has that. And thats the fateful move, he rewrote everything to use javascript to get the event loop symentic buit-in.Thats why we have nodejs today.

Why node is so compelling, is because it was the first time that we got a really strong compelling argument for how asynchronous communication IO bound task should be modelled.

When we talk about IO bound tasks, we are talking about tasks that use the IO subsystem of the computer. So for example reading and writing from a disk, making network communications.

As oppose to CPU bound tasks, which are literally just in the CPU, IO bound tasks are two to three to four orders of magnitude slower (We are still talking about milliseconds, but they are orders of magnitude slower than what happens inside of the processors).

The prevailling thought for a long time was that the way we do concurrency is with threads. Well it turns out that threads are pretty good for modelling things that are CPU bound tasks, where we can take advantage of massive parallelism and accross the bunch of cores. And its not to say that we can't do IO bound tasks with threading, but it turns out that they are not exactly the most efficient way to do it. And we have a very strong argument today that the asynchronous event loop is a much more compelling model for IO bound tasks. And its one of the reasons why node ended up succeding.

There are really compelling benifits when we think about modelling high throughput low latency IO communication the way node does it.

Its very low barrier entry in terms of getting a platform up and going.

Asynchronous event loop is a much more compelling model for IO bound tasks.

If somebody asks: could you do CPU bound tasks in node?
- Well sure we could probabily do multiprocessing (via child processes). But if we are gonna do a lot of really significant CPU bound tasks you would be crazy to use node for that. But by the same token if we are doing high throughput low latency IO tasks and not using nodejs then we are doing it wrong.

Node best story at any company that doesn't already have it is not to rewrite the whole architecture. Its best adoption strategy is to be inserted esentially as a middle-end proxy (to be inserted as a touch point between any frontend and whatever our backend systems are).
- What if we just have our frontend talking to a node system and our node system responsible for communicating with our backend. And begin shifting those tasks that touch the frontend essentially into a middle-end tasks.  
