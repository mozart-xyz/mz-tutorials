
Steps to create NFTs for an org
1. Create a folder with all the images you want to upload
2. Ensure that the images are named in the following format: "name_of_nft_1.png", "name_of_nft_2.png", etc. 
You can use this script to clean then up: cleanUpFileNames() -- see the helpers below -- just edit it to clean up the names as 
you see fit.
3. Create an org on testnet for the org - or use their existing org. Save their org api key.
go run ./apps/api/cmd/dev-tools/admin/ new-org --org-name=warshmello --admin-email=oliver@mozart.xyz


4. Make your email an admin of that org. This allows you to sign into the dashboard and into the game.
curl --request POST \
  --url https://staging-api-ij1y.onrender.com/v1/api/org/admin_user \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: 4J6oD32mthni7C2ZAknte4JF3f7t69kz8Zc4CzqqAVNs' \
  --data '{
  "email": "oliver@mozart.xyz"
}' | jq
5. Sign into the admin dashboard for the org. Create a game on that org for the nfts to be associated with. 
Save the game key.
6. Log into the game and save the client auth token.
curl --header "Content-Type: application/json" \
-X GET  https://staging-api-ij1y.onrender.com/v1/auth/login?gameId=@superheart | jq
curl --header "Content-Type: application/json" \
-X GET https://staging-api-ij1y.onrender.com/v1/auth/login_status?oauthState=XXv99buft5K1NZruaufwoF | jq
6. Run the script with the cmd line args set.
npx ts-node src/scripts/nft-template-create.ts \
--folder-path="/Users/olivermontalbano/Documents/Technology/Mozart/koi_assets" \
--api-key="4J6oD32mthni7C2ZAknte4JF3f7t69kz8Zc4CzqqAVNs" \
--game-key="superheart" \
--num-nfts-each=4 \
--client-auth-token="eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtb3phcnQueHl6IiwiZXhwIjoxNjgyMzY3NzYxLCJuYmYiOjE2ODExNTgxNjEsImlhdCI6MTY4MTE1ODE2MSwiQXV0aElkIjoiWFh2OTlidWZ0NUsxTlpydWF1ZndvRiIsIkVtYWlsIjoib2xpdmVyQG1vemFydC54eXoiLCJBZG1pbkxvZ2luIjpmYWxzZSwiT3JnSWQiOm51bGwsIkdhbWVJZCI6ImdhbWVfQ1d1dXhFZFl1cFUifQ.v3lASJz2AcvAFlM8y7OIvsCFOpwa2PJAvVT9CVOqfEfqJqYRbVnrHMYIRpX8tOoUrTZvr2VDPyd2b5QtGjG9HA"
7. Check the game in admin dashboard to ensure things have been created correctly. 
Expect to wait a while for the nfts to be created. Refresh periodically until finished.


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
    "client-auth-token": {
      type: "string",
      required: true,
    },
  })
  .help()
  .alias("help", "h").argv;

  logAppConfig(JSON.stringify(argv, null, 2))




async function main() {
  const folderPath = argv["folder-path"];
  const gameKey = argv["game-key"];
  const numNftsPerTemplate = argv["num-nfts-each"];
  const clientAuthToken = argv["client-auth-token"];

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

  console.log("formattedInfoList ====", formattedInfoList)


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
  console.log("1111111", nftTemplateReqs)
  for (const nftTemplateReq of nftTemplateReqs) {
    const nftTemplateResp = await httpRequest('api/nft_templates', HttpMethod.POST, nftTemplateReq)
    console.log("222222222", nftTemplateResp)
    logApiResp(nftTemplateResp)
    nftTemplateResps.push(nftTemplateResp)
  }
  console.log("nftTemplateResps ====", nftTemplateResps[0].data.data)

  // Create NFT Template Listings
  const nftTemplateListingResps = []
  for (const nftTemplateResp of nftTemplateResps) {
    const nftTemplateListingReq = {
      "nftTemplateId": nftTemplateResp.data.data.nftTemplateKey,
      "ftAmount": "0",
      "ftId": `@${gameKey}.default_token`,
    }

    console.log("TEST 11111 REQQQQQ ====", nftTemplateListingReq)
    const nftTemplateListingResp = await httpRequest('api/nft_template_listings', HttpMethod.POST, nftTemplateListingReq)
    logApiResp(nftTemplateListingResp)
    nftTemplateListingResps.push(nftTemplateListingResp)
  }

  console.log("nftTemplateListingResps ====", nftTemplateListingResps)

  // Create NFTs for each template

    // // Purchase NFT -- do this a bunch of times 
    for (const nftTemplateListing of nftTemplateListingResps) {
      const nftTemplateListingKey = nftTemplateListing.data.data.nftTemplateListingKey
      let i = 0
      while (i < numNftsPerTemplate) {
        const nftNum = i + 1
        const options = {
          method: 'POST',
          headers: {accept: 'application/json', 'content-type': 'application/json', 'Authorization': `Bearer ${clientAuthToken}`},
          body: JSON.stringify({nftTemplateListingId: nftTemplateListingKey})
        };
          fetch('https://staging-api-ij1y.onrender.com/v1/client/template_items/buy', options)
        // fetch('https://testnet-api.mozart.xyz/v1/client/template_items/buy', options)
          .then(() => console.log(`NFT Template: ${nftTemplateListingKey} NFT Number: ${nftNum}`))
          .catch(err => console.error(err));
        i += 1
      }
    }
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