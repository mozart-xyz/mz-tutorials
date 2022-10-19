import yargs from "yargs/yargs";
import { httpRequest, HttpMethod } from "../services/http"

// TODO Pull this out
const argv = yargs(process.argv.slice(2))
  .options({
    "api-key": {
      type: "string",
      required: true,
    },
    "nftId": {
      type: "string",
      required: true,
    },
    "name": {
      type: "string",
      default: "Mystical Sword",
    },
    "image": {
      type: "string",
      default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsketchfab.com%2F3d-models%2Frune-sword-runescape-3d05d8d0296e4477aaeee0d95e47fe45&psig=AOvVaw2TRBgipxOmRB2nVQqife5Z&ust=1665980949446000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMifruf04_oCFQAAAAAdAAAAABAF",
    },
    "description": {
      type: "string",
      default: "A rune sword been endowed with magical powers.",
    },
    "metadata": {
      type: "string", // Stringified object
      default: '{"level": 32, "attack": 82, "defense": 47, "speed": 91, "weight": 11}'
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
  const metadata = JSON.parse(argv["metadata"])

  const data = {
    "name": argv["name"],
    "image": argv["image"],
    "description": argv["description"],
    "metadata": metadata,
  }

  const formattedUrlSuffix = 'nfts/' + argv["nftId"]
  const res = await httpRequest(formattedUrlSuffix, HttpMethod.PATCH, data)
  console.log("Response data: ", res);
}

main();
