import express from 'express'
import * as fcl from "@onflow/fcl"
import * as types from "@onflow/types"
import {SHA3} from 'sha3'
import elliptic from 'elliptic';
const ec = new elliptic.ec('secp256k1');
const app = express();
const PORT = 8080
const PRIVATE_KEY = "0x61fedfe87fe3800a769ac9c58a668582e4681d17b0b16ef4a25abd71ce42a2d2";
const ADDRESS = "0x25d1f50796afd33c";
const KEY_ID = 0;
const sign = (message) => {
  const key = ec.keyFromPrivate(Buffer.from(PRIVATE_KEY, "hex"))
  const sig = key.sign(hash(message)) // hashMsgHex -> hash
  const n = 32
  const r = sig.r.toArrayLike(Buffer, "be", n)
  const s = sig.s.toArrayLike(Buffer, "be", n)
  return Buffer.concat([r, s]).toString("hex")
}

const hash = (message) => {
  const sha = new SHA3(256);
  sha.update(Buffer.from(message, "hex"));
  return sha.digest();
}

async function authorizationFunction(account) {
  return {
    ...account,
    tempId: `${ADDRESS}-${KEY_ID}`,
    addr: fcl.sansPrefix(ADDRESS),
    keyId: Number(KEY_ID),
    signingFunction: async (signable) => {
      return {
        addr: fcl.withPrefix(ADDRESS),
        keyId: Number(KEY_ID),
        signature: sign(signable.message)
      }
    }
  }
}
const ImageURLS = ["https://ipfs.io/ipfs/QmQ6pkp4xcdbdabp5XCeJYuQBV5cnQnTf7CVpf34rpHUDN", "https://ipfs.io/ipfs/QmaJRr4onE83XLZAFSpP7o6eGeHWZ8yC43gK3FLFn3UH35", "https://ipfs.io/ipfs/QmVNXV98TvYQx5v9WK1EZeBnEfrJyg6RMYCowA7r8ERYeK", "https://ipfs.io/ipfs/QmY68rpxsJ9X78pwNdBq7rZfPgv6r3P3GeViVioQHnSYze", "https://ipfs.io/ipfs/Qmcdr22tpwBYQixVoW6BbpVpcXD1sQ31G1q4GbQ5niXZ5K", "'https://ipfs.io/ipfs/QmPcHjZY7qzye6RVu2FnPK7aHjz6c19s9VJWkcUVKhtF7Q", "https://ipfs.io/ipfs/QmRyqZP8QXzV1cymp1XFDkkQzqrJKk4GJM5SJSabyfYxRE"]

async function flowmint(){
  fcl.config()
 .put("app.detail.title", "My Flow NFT DApp")
 .put("app.detail.icon", "https://mapx255.netlify.app/assets/coffee-shop-ab814802.png")
 .put("accessNode.api", "https://rest-testnet.onflow.org")
 const transactionID = await fcl.send([
  fcl.transaction( `

  import BasicNFT from  0x25d1f50796afd33c
  
  transaction (url: String){
  
    prepare(acct: AuthAccount) {
    
      acct.save(<-BasicNFT.createNFT(url: url), to: /storage/BasicNFTPath)
      acct.link<&BasicNFT.NFT{BasicNFT.NFTPublic}>(/public/BasicNFTPath, target: /storage/BasicNFTPath)
    
    }
  
    execute {
      log("NFT Created!")
    }
  }
  
  
  `),
  fcl.args([fcl.arg(ImageURLS[parseInt(1)], fcl.t.String)]),
  fcl.payer( authorizationFunction),
  fcl.proposer( authorizationFunction),
  fcl.authorizations([authorizationFunction]),
  fcl.limit(9999)
]).then(fcl.decode)
console.log(transactionID)
}



  app.get('/mintnft', async (req, res) => {

  const detailofnft= await  flowmint()
 
  })

  app.listen(process.env.PORT || PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
