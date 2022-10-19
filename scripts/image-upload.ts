import yargs from "yargs/yargs";
import { httpRequest, HttpMethod } from "../services/http"
import * as fs from "fs";
import * as path from "path";
import {logApiResp, logAppConfig} from "../utils/logging"

const argv = yargs(process.argv.slice(2))
  .options({
    path: {
      type: "string",
      required: true,
    },
    name: {
      type: "string",
      default: "",
    },
    "api-key": {
      type: "string",
      required: true,
    },
  })
  .help()
  .alias("help", "h").argv;

  logAppConfig(JSON.stringify(argv, null, 2))

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

  const resp = await httpRequest('media', HttpMethod.POST, reqData)
  console.log(`File path: ${filePath}`);
  logApiResp(resp)
}

main();
