 # README

 ## Quick Commands
Commands that can used in the terminal to interact with the Mozart API

 ```bash

# Staging env for testing
 npx ts-node src/scripts/nft-template-create.ts \
--folder-path="/Users/olivermontalbano/Documents/Technology/Mozart/koi_assets" \
--api-key="4J6oD32mthni7C2ZAknte4JF3f7t69kz8Zc4CzqqAVNs" \
--game-key="superheart" \
--num-nfts-each=4 \
--client-auth-token="eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtb3phcnQueHl6IiwiZXhwIjoxNjgyMzY3NzYxLCJuYmYiOjE2ODExNTgxNjEsImlhdCI6MTY4MTE1ODE2MSwiQXV0aElkIjoiWFh2OTlidWZ0NUsxTlpydWF1ZndvRiIsIkVtYWlsIjoib2xpdmVyQG1vemFydC54eXoiLCJBZG1pbkxvZ2luIjpmYWxzZSwiT3JnSWQiOm51bGwsIkdhbWVJZCI6ImdhbWVfQ1d1dXhFZFl1cFUifQ.v3lASJz2AcvAFlM8y7OIvsCFOpwa2PJAvVT9CVOqfEfqJqYRbVnrHMYIRpX8tOoUrTZvr2VDPyd2b5QtGjG9HA"




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