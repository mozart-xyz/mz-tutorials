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
      required: true, // Must be unique
    },
    "image": {
      type: "string",
      default: "https://cdn11.bigcommerce.com/s-3pn7p1id/images/stencil/1280x1280/products/536/3175/DSC_7029__22759.1546012383.JPG?c=2",
    },
    "description": {
      type: "string",
      default: "An iron sword.",
    },
    // TODO Determine why maxSupply is not updating properly
    "maxSupply": {
      type: "number",
      default: 100,
    },

  })
  .help()
  .alias("help", "h").argv;

console.log("------application configuration-----");
console.log(JSON.stringify(argv, null, 2));
console.log("------------------------------------");



async function main() {
  // TODO Check that this errors if not correct
  // Check that the metadata is properly formatted

  const data = {
    "name": argv["name"],
    "image": argv["image"],
    "description": argv["description"],
    "maxSupply": argv["maxSupply"],
  }
  const res = await httpRequest('collections', HttpMethod.POST, data)
  console.log("Response data: ", res);
}

main();
