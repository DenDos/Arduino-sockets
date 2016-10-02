import path from "path"
import nconf from "nconf"


nconf.argv()
    .env()
    .file({
      file: path.join(__dirname, "config.json")
    });

module.exports = nconf;
