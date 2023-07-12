import express from 'express'
import * as fcl from "@onflow/fcl"
import * as types from "@onflow/types"
import {SHA3} from 'sha3'
import elliptic from 'elliptic';
const ec = new elliptic.ec('secp256k1');



import privateKeyToAddress from "@celo/utils/lib/address.js";
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

let contract
async function getKit(addrssofmint, nft) {
  const web3 = new Web3("https://alfajores-forno.celo-testnet.org")
  const w3 = new Web3("https://testnet-rpc.coinex.net");
  const account = w3.eth.accounts.create();
  console.log(account)
const kit = newKitFromWeb3(web3);
var json = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "uri",
        "type": "string"
      }
    ],
    "name": "safeMint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
  contract = new kit.web3.eth.Contract(json, 44787 && MPContractAddress)
  kit.connection.addAccount('477195664f4a5ccd2caaa47771f5d0ab9451946c1a18b8ef215fb01059e3fdd9')
  const address = privateKeyToAddress.privateKeyToAddress('477195664f4a5ccd2caaa47771f5d0ab9451946c1a18b8ef215fb01059e3fdd9');
  console.log(address);
  let totalBalance = await kit.getTotalBalance(address)
  
  const map = new Map()
  map.set('art','https://ipfs.io/ipfs/QmQ6pkp4xcdbdabp5XCeJYuQBV5cnQnTf7CVpf34rpHUDN')
  map.set('cityilluminati','https://ipfs.io/ipfs/QmaJRr4onE83XLZAFSpP7o6eGeHWZ8yC43gK3FLFn3UH35')
  map.set('collectiable1','https://ipfs.io/ipfs/QmVNXV98TvYQx5v9WK1EZeBnEfrJyg6RMYCowA7r8ERYeK')
  map.set('collectiables','https://ipfs.io/ipfs/QmY68rpxsJ9X78pwNdBq7rZfPgv6r3P3GeViVioQHnSYze')
  map.set('location','https://ipfs.io/ipfs/Qmcdr22tpwBYQixVoW6BbpVpcXD1sQ31G1q4GbQ5niXZ5K')
  map.set('mcdonald','https://ipfs.io/ipfs/QmPcHjZY7qzye6RVu2FnPK7aHjz6c19s9VJWkcUVKhtF7Q')
  map.set('movietheatre','https://ipfs.io/ipfs/Qmc66EPoV2PnEASXLp5cUYuonq5vhp6CaDPAoHpEKZwfXX')
  map.set('voucher','https://ipfs.io/ipfs/QmRyqZP8QXzV1cymp1XFDkkQzqrJKk4GJM5SJSabyfYxRE')

  const urlofimage = map.get(nft)
  console.log(addrssofmint)
  console.log(urlofimage)
  let txObject = await contract.methods.safeMint(addrssofmint,urlofimage)
  const receipt = await txObject
 .send({

   from: address,
   gas: await txObject.estimateGas(),
 })


  console.log(receipt.blockHash)
  return receipt

}
 app.get('/mintnft/:address/:nft', async (req, res) => {

 const detailofnft= await  getKit(req.params.address,req.params.nft)
  console.log(detailofnft.blockHash)
  res.send(detailofnft.blockHash)
  })
  app.get('/mintnft', async (req, res) => {

  const detailofnft= await  flowmint()
 
  })

  app.listen(process.env.PORT || PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))