import yargs from "yargs/yargs";
import { randomInt } from "crypto";
import * as fs from "fs";
import * as path from "path";

const argv = yargs(process.argv.slice(2))
  .options({
    path: {
      type: "string",
      //   alias: "n",
      required: true,
    },
    name: {
      type: "string",
      default: "",
    },
    // proxyAddr: {
    //   description: "proxy address",
    //   type: "string",
    //   alias: "p",
    //   required: false,
    //   default: "",
    // },
    // tokenId: {
    //   type: "number",
    //   default: randomInt(2 ** 32),
    // },
  })
  .help()
  .alias("help", "h").argv;

console.log("------application configuration-----");
console.log(JSON.stringify(argv, null, 2));
console.log("------------------------------------");

const endpoint = "http://localhost:8080/v1/media";

function getFileName(filePath: string, fileName: string): string {
  const defaultName = path.basename(filePath);
  if (fileName === "") {
    fileName = defaultName;
  }
  return fileName;
}

async function main() {
  const filePath = argv["path"];
  const base64String = fs.readFileSync(filePath, {
    encoding: "base64",
  });


  const fileName = getFileName(filePath, argv["name"]);
  const reqData = {
    fileName: fileName,
    data: base64String,
  };
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqData),
  });
  const respData = await response.json();
  //   console.log("req data", reqData);
  console.log(`file path: ${filePath}`);
  console.log("resp data", respData);
}

main();
