import yargs from "yargs/yargs";
import { httpRequest, HttpMethod } from "../services/http"
import {logApiResp, logAppConfig} from "../utils/logging"
import * as path from "path";

const argv = yargs(process.argv.slice(2))
  .options({
    "api-key": {
      type: "string",
      required: true,
    },
    "folder-path": {
      type: "string",
      required: true,
    },
    "game-key": { // Do not include the "@"
      type: "string",
      required: true,
    },
    "num-nfts-each": {
      type: "number",
      required: true,
    },
  })
  .help()
  .alias("help", "h").argv;

  logAppConfig(JSON.stringify(argv, null, 2))




async function main() {
  const folderPath = argv["folder-path"];
  const gameKey = argv["game-key"];

    // Get images from folder
  const fs = require('fs');
  const imagePaths = []
  const testDir = await fs.promises.readdir(folderPath);
  for (const file of testDir) {
    const imagePath = folderPath + "/" + file
    imagePaths.push(imagePath)
  }

  // Upload images to Mozart
  const formattedInfoList = []
  for (const imagePath of imagePaths) {
    const base64String = fs.readFileSync(imagePath, {
      encoding: "base64",
    });
    const fileName = getFileName(imagePath);
    const reqData = {
      fileName: fileName,
      data: base64String,
    };
    const resp = await httpRequest('media', HttpMethod.POST, reqData)
    logApiResp(resp)

    console.log("NAME ====", formatName(imagePath))

    formattedInfoList.push({imageUrl: resp.data.mediaUri, name: formatName(imagePath)})
  }

  // Create NFT Templates
  const nftTemplateReqs = []
  for (const item of formattedInfoList) {
    console.log("ITEM ==== ", item)
    const nftTemplateReq = {
      "collectionId": `@${gameKey}.default_collection`,
      "name": item.name,
      "imageUrl": item.imageUrl,
      "description": "",
    }
    nftTemplateReqs.push(nftTemplateReq)
  }

  const nftTemplateResps = []
  for (const nftTemplateReq of nftTemplateReqs) {
    const nftTemplateResp = await httpRequest('nft_templates', HttpMethod.POST, nftTemplateReq)
    logApiResp(nftTemplateResp)
    nftTemplateResps.push(nftTemplateResp)
  }

  // Create NFT Template Listings
  const nftTemplateListingReqs = []
  for (const nftTemplateResp of nftTemplateResps) {
    const nftTemplateListingReq = {
      "nftTemplateId": nftTemplateResp.data.id,
      "ftAmount": "0",
      "ftId": `@${gameKey}.default_token`,
    }
    const nftTemplateListingResp = await httpRequest('nft_template_listings', HttpMethod.POST, nftTemplateListingReq)
    logApiResp(nftTemplateListingResp)
    nftTemplateListingReqs.push(nftTemplateListingReq)
  }

  // Create NFTs for each template

    // Sign in as a user

    // Purchase NFT -- do this a bunch of times 

}

main();


//--------
// Helpers
// -------


function getFileName(filePath: string): string {
  const defaultName = path.basename(filePath);
  return defaultName;
}

function formatName(filePath: string): string {
  const defaultName = path.basename(filePath);
  let i = 0
  let formattedName = ""
  while (i < defaultName.length) {
    if (defaultName[i] === "_") {
      formattedName += " ";
    } else if (defaultName[i] === ".") {
      return capitalizeWords(formattedName)
    } else {
      formattedName += defaultName[i]
    }
    i++
  }
  return capitalizeWords(formattedName);
}

function capitalizeWords(str) {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}



// Limited use for cleaning up file names
const cleanUpFileNames = (imagePath) => {
  const fs = require('fs');
  fs.rename(imagePath, imagePath.slice(0, imagePath.length - 8) + ".png", function(err) {
  })
}