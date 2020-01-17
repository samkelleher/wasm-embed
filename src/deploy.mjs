import request from "request";
import fs from "fs";

const deploy = async () => {
  const formData = {
    metadata: {
      value: fs.createReadStream("./src/metadata.json"),
      options: {
        filename: 'metadata.json',
        contentType: 'application/json'
      }
    },
    script: {
      value: fs.createReadStream("./src/worker.js"),
      options: {
        filename: 'worker.js',
        contentType: 'application/javascript'
      }
    },
    wasm: {
      value: fs.createReadStream("./build/embed.wasm"),
      options: {
        filename: 'embed.wasm',
        contentType: 'application/wasm'
      }
    }
  };

  const options = {
    url:`https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/workers/scripts/${process.env.SCRIPT_NAME}`,
    formData,
    headers: {
      'User-Agent': undefined
    }
  };

  if (process.env.CF_API_TOKEN) {
    options.headers.Authorization = `Bearer ${process.env.CF_API_TOKEN}`;
  } else {
    options.headers["X-Auth-Email"] = process.env.CF_AUTH_EMAIL;
    options.headers["X-Auth-Key"] = process.env.CF_AUTH_KEY;
  }

  return new Promise((resolve, reject) => {
    request.put(options, (err, httpResponse, body)  => {
      if (err) {
       reject(err);
       return;
      }
      resolve(body);
    });
  });
};

deploy()
  .then((resonse) => {
    console.log(`Script Deployed`);
    console.log(resonse);
  })
  .catch((err) => {
    console.log(err);
  });
