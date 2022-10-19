import yargs from "yargs/yargs";
import { httpRequest, HttpMethod } from "../services/http"

// TODO Pull this out
const argv = yargs(process.argv.slice(2))
  .options({
    "api-key": {
      type: "string",
      required: true,
    },
    "name": {
      type: "string",
      default: "",
    },
  })
  .help()
  .alias("help", "h").argv;

console.log("------application configuration-----");
console.log(JSON.stringify(argv, null, 2));
console.log("------------------------------------");



async function main() {
  const name = argv["name"];

  const reqData = {
    name,
  };

  const res = await httpRequest('users', HttpMethod.POST, reqData)
  console.log("Response data: ", res);
}

main();
