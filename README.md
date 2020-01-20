# ⚡️ Ultra fast response times serving static files with WebAssembly Workers
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

### 🚀 Getting Started 

This is a Node project using ESM, run `yarn` to install the required packages first.

1. `yarn build` - This will produce `embed.wasm` in the `build` directory.
   1. Examine the template at `./assembly/embed.template.ts`
   2. Read the files from `./sampleData/` and embed them in `embed.ts`.
   3. Compile the resulting `embed.ts` TypeScript file using AssemblyScript to product `embed.wasm`.
2. `yarn test` - This will initialize the WebAssembly module.
   1. The embedded files are read out of the module and saved in `./testOutput`.
   2. The SHA-1 hash is compared to the extraced file and the original.
   3. The test is complete when the hash matches, meaning the file was successfully embedded into a WebAssembly
   Module without being damaged or modified. If you're just interested in how to embed files into wasm, you
   can stop here. Or continue if you want to serve these files from a worker.
3. If you want to serve your files, `yarn deploy` - This will upload and publish the worker and assembly module to Cloudflare. Requires
the environment variables:
    * `CF_ACCOUNT_ID` - Cloudflare Account ID
    * `SCRIPT_NAME` - The name given to your worker.
    * Both `CF_AUTH_EMAIL` + `CF_AUTH_KEY` to authenticate with the API using your account keys.
        * Or as an alternative, `CF_API_TOKEN` if you have a scoped API token to use instead.
4. The files can now be accessed when making requests to the worker. Your app will enjoy fast response times
to users across the planet. 🌍 🌎 🌏

### Directory Structure

* `./assembly` - Directory holding the AssemblyScript sources being compiled to WebAssembly.
* `./assembly/index.ts` - Entry file being compiled to WebAssembly, links static files here.
* `./build` - Build artifact directory where compiled WebAssembly files are stored.
* `./src/worker.js` - Main Cloudflare Worker file.


### 🧑🏼‍💻 Author

Created as a sample worker by [Sam Kelleher](https://samkelleher.com/).
