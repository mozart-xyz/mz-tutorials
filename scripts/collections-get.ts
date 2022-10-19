import yargs from "yargs/yargs";
import { httpRequest, HttpMethod } from "../services/http"

// TODO Pull this out
const argv = yargs(process.argv.slice(2))
  .options({
    "api-key": {
      type: "string",
      required: true,
    },
  })
  .help()
  .alias("help", "h").argv;

console.log("------application configuration-----");
console.log(JSON.stringify(argv, null, 2));
console.log("------------------------------------");



async function main() {
  const res = await httpRequest('collections', HttpMethod.GET)
  console.log("Response data: ", res);
}

main();
