import yargs from "yargs/yargs";
import { httpRequest, HttpMethod } from "../services/http"
import {logApiResp, logAppConfig} from "../utils/logging"

const argv = yargs(process.argv.slice(2))
  .options({
    "api-key": {
      type: "string",
      required: true,
    },
  })
  .help()
  .alias("help", "h").argv;

  logAppConfig(JSON.stringify(argv, null, 2))



async function main() {
  const resp = await httpRequest('users', HttpMethod.GET)
  logApiResp(resp)
}

main();
