 # README

 ## Quick Commands
Commands that can used in the terminal to interact with the Mozart API

 ```bash
 # Upload image
 npx ts-node scripts/image-upload.ts \
--path="ADD_FILE_PATH_TO_LOCAL_IMAGE" \
--api-key="ADD_API_KEY"

# Create user
 npx ts-node scripts/users-create.ts \
--api-key="ADD_API_KEY" \
--name="ADD_NAME_HERE"

# Create collection
 npx ts-node scripts/collections-create.ts \
--api-key="ADD_API_KEY" \
--name="ADD_UNIQUE_COLL_NAME_HERE" \
--maxSupply=1000
# Optionally add additional params: name, image, description 

# Create NFT
 npx ts-node scripts/nfts-create.ts \
--api-key="ADD_API_KEY" \
--collectionId="ADD_COLLECTION_ID_HERE" \
--userId="ADD_USER_ID_HERE"
# Optionally add additional params: name, image, description, metadata

# Update NFT
 npx ts-node scripts/nfts-update.ts \
--api-key="ADD_API_KEY" \
--nftId="ADD_NFT_ID_HERE"
# Optionally add additional params: name, image, description, metadata

# Get list of collections
 npx ts-node scripts/collections-get.ts \
--api-key="ADD_API_KEY"

# Get list of users
 npx ts-node scripts/users-get.ts \
--api-key="ADD_API_KEY"

# Get list of NFTs
 npx ts-node scripts/nfts-get.ts \
--api-key="ADD_API_KEY"
```