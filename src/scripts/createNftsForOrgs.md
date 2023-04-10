# Steps to create NFTs for an org
1. Create a folder with all the images you want to upload
2. Ensure that the images are named in the following format: "name_of_nft_1.png", "name_of_nft_2.png", etc. 
You can use this script to clean then up: cleanUpFileNames() -- see the helpers below -- just edit it to clean up the names as 
you see fit.
3. Create an org on testnet for the org - or use their existing org. Save their org api key.
go run ./apps/api/cmd/dev-tools/admin/ new-org --org-name=warshmello --admin-email=oliver@mozart.xyz
4. Make your email an admin of that org. This allows you to sign into the dashboard and into the game.
```bash
  curl --request POST \
    --url https://staging-api-ij1y.onrender.com/v1/api/org/admin_user \
    --header 'Content-Type: application/json' \
    --header 'x-api-key: 4J6oD32mthni7C2ZAknte4JF3f7t69kz8Zc4CzqqAVNs' \
    --data '{
    "email": "oliver@mozart.xyz"
  }' | jq
```
5. Sign into the admin dashboard for the org. Create a game on that org for the nfts to be associated with. 
Save the game key.
6. Log into the game and save the client auth token.
```bash
curl --header "Content-Type: application/json" \
-X GET  https://staging-api-ij1y.onrender.com/v1/auth/login?gameId=@superheart | jq
curl --header "Content-Type: application/json" \
-X GET https://staging-api-ij1y.onrender.com/v1/auth/login_status?oauthState=XXv99buft5K1NZruaufwoF | jq
```
7. Run the script with the cmd line args set.
```bash
npx ts-node src/scripts/nft-template-create.ts \
--folder-path="/Users/olivermontalbano/Documents/Technology/Mozart/koi_assets" \
--api-key="4J6oD32mthni7C2ZAknte4JF3f7t69kz8Zc4CzqqAVNs" \
--game-key="superheart" \
--num-nfts-each=4 \
--client-auth-token="eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtb3phcnQueHl6IiwiZXhwIjoxNjgyMzY3NzYxLCJuYmYiOjE2ODExNTgxNjEsImlhdCI6MTY4MTE1ODE2MSwiQXV0aElkIjoiWFh2OTlidWZ0NUsxTlpydWF1ZndvRiIsIkVtYWlsIjoib2xpdmVyQG1vemFydC54eXoiLCJBZG1pbkxvZ2luIjpmYWxzZSwiT3JnSWQiOm51bGwsIkdhbWVJZCI6ImdhbWVfQ1d1dXhFZFl1cFUifQ.v3lASJz2AcvAFlM8y7OIvsCFOpwa2PJAvVT9CVOqfEfqJqYRbVnrHMYIRpX8tOoUrTZvr2VDPyd2b5QtGjG9HA"
```
8. Check the game in admin dashboard to ensure things have been created correctly. 
Expect to wait a while for the nfts to be created. Refresh periodically until finished.
