 # README

 ## Quick Commands
Commands that can used in the terminal to interact with the Mozart API

 ```bash

 npx ts-node src/scripts/nft-template-create.ts \
--folder-path="/Users/olivermontalbano/Downloads/animalthumbs2" \
--api-key="64x6Pykujk9vVRAmqjSmCGM4Pmp3dhcyus6YUdgE4EUD" \
--game-key="super_heart" \
--num-nfts-each=1




 # Upload image
 npx ts-node src/scripts/image-upload.ts \
--path="ADD_FILE_PATH_TO_LOCAL_IMAGE" \
--api-key="ADD_API_KEY"

# Create user
 npx ts-node src/scripts/users-create.ts \
--api-key="ADD_API_KEY" \
--name="ADD_NAME_HERE"

# Create collection
 npx ts-node src/scripts/collections-create.ts \
--api-key="ADD_API_KEY" \
--name="ADD_UNIQUE_COLL_NAME_HERE" \
--max-supply=1000
# Optionally add additional params: name, image, description 

# Create NFT
 npx ts-node src/scripts/nfts-create.ts \
--api-key="ADD_API_KEY" \
--collection-id="ADD_COLLECTION_ID_HERE" \
--user-id="ADD_USER_ID_HERE"
# Optionally add additional params: name, image, description, metadata

# Update NFT
 npx ts-node src/scripts/nfts-update.ts \
--api-key="ADD_API_KEY" \
--nft-id="ADD_NFT_ID_HERE"
# Optionally add additional params: name, image, description, metadata

# Get list of collections
 npx ts-node src/scripts/collections-get.ts \
--api-key="ADD_API_KEY"

# Get list of users
 npx ts-node src/scripts/users-get.ts \
--api-key="ADD_API_KEY"

# Get list of NFTs
 npx ts-node src/scripts/nfts-get.ts \
--api-key="ADD_API_KEY"
```