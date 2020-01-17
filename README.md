# Embed file within WebAssembly Worker
> Serve static binary files from memory for fast response times.

### Directory Structure

* `./assembly` - Directory holding the AssemblyScript sources being compiled to WebAssembly.
* `./assembly/index.ts` - Entry file being compiled to WebAssembly, links static files here.
* `./build` - Build artifact directory where compiled WebAssembly files are stored.
* `./src/worker.js` - Main Cloudflare Worker file.
