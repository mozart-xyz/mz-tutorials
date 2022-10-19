import yargs from "yargs/yargs";
import { httpRequest, HttpMethod } from "../services/http"

// TODO Pull this out
const argv = yargs(process.argv.slice(2))
  .options({
    "api-key": {
      type: "string",
      required: true,
    },
    "collectionId": {
      type: "string",
      required: true,
    },
    "userId": {
      type: "string",
      required: true,
    },
    "name": {
      type: "string",
      default: "Iron Sword",
    },
    "image": {
      type: "string",
      default: "https://cdn11.bigcommerce.com/s-3pn7p1id/images/stencil/1280x1280/products/536/3175/DSC_7029__22759.1546012383.JPG?c=2",
    },
    "description": {
      type: "string",
      default: "An iron sword.",
    },
    "metadata": {
      type: "string", // Stringified object
      default: '{"level":1,"attack":18,"defense":6,"speed":43,"weight":41}',
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
  const test = {'level': 1,'attack': 18,'defense': 6,'speed': 43,'weight': 41}
  const testJson = JSON.stringify(test)
  console.log('METADATA JSON ==== ',argv["metadata"])
  const metadata = JSON.parse(argv["metadata"])

  const data = {
    "userId": argv["userId"],
    "collectionId": argv["collectionId"],
    "name": argv["name"],
    "image": argv["image"],
    "description": argv["description"],
    "metadata": metadata,
  }
  const res = await httpRequest('nfts', HttpMethod.POST, data)
  console.log("Response data: ", res);
}

main();
