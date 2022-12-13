import { ethers } from "hardhat"
// import "dotenv/config"
import "dotenv/config"
import { MyNFT, MyNFT__factory } from "../dist"

const nftAdress = "0xa2A8C5eC1E1A51E9c79a143E89AB248c18767aA1"

const metaData =
    "https://gateway.pinata.cloud/ipfs/QmTfLu91SDcwmW1zP3meF7mEcPkieYBCMA5HmRnfC2AbbL/ian.json"

const ownerAdress = process.env.ADDRESS

const mint = async () => {
    console.log("ownerAdress: ", ownerAdress)

    const contract = await MyNFT__factory.connect(
        nftAdress,
        await ethers.getSigner(ownerAdress!)
    )

    // const contract = await ethers.getContractAt(MyNFT, nftAdress)

    const tx = await contract.mintNFT(ownerAdress!, metaData)
    await tx.wait()

    console.log("tx: ", tx)
}

mint().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
