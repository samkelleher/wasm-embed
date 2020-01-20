# ⚡️ Ultra fast response times serving static files WebAssembly Workers
> Serve static binary files from memory for fast response times.

### 📕 Background
With trends moving to _Serverless_ or _Function-as-a-Service_ we've started building our
web servers from instances of Express running inside Docker containers, to "functions"
that instead run on managed infastrure, responding to each request as they arrive.

Many cloud providers supply this type of system which is fast, cheap, and very easy to maintain
as all you have to do is upload your functions.

Cloudflare in particular inovate further by replicating your worker to every edge node in their
network, drastically limiting CPU + memory time, in exchange for response time as each worker
'instance' is located physically close to users. With previous approaches, worker instances
were usally just located in a single region with redundant zones only; thus requiring a load balancer to be
setup which is also not simple.

These Cloudflare workers are great as they offer unmatched performance at the edge, but if 
you're serving say a Progressive Web App, then why not bundle all our application assets into the worker
as opposed to just serving responses.

One approach to acheieve this is to publish all your assets the Cloudflare KV (_latency key-value store at all of the data centers in Cloudflare's global network_) then
all the worker has to do is locate in the cache the required file for each request, and return it the response. The base subscription
includes 10 million store reads as standard.

Approach, the one taken by this repo, is to use AssemblyScript to embed assets into a binary WebAssembly script, and use this to serve via the worker.

The edge node will load the WebAssembly file into it's memory, where the worker reads them for writing responses to requests.

This is an ultra fast technique as the files are always in system memory for near-zero latency response times.

### Directory Structure

* `./assembly` - Directory holding the AssemblyScript sources being compiled to WebAssembly.
* `./assembly/index.ts` - Entry file being compiled to WebAssembly, links static files here.
* `./build` - Build artifact directory where compiled WebAssembly files are stored.
* `./src/worker.js` - Main Cloudflare Worker file.


### 🧑🏼‍💻 Author

Created as a sample worker by [Sam Kelleher](https://samkelleher.com/).
