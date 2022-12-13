import { ethers } from "hardhat"
// import "dotenv/config"
import "dotenv/config"
import { MyNFT, MyNFT__factory } from "../dist"

const NFT_ADDRESS = process.env.NFT_ADDRESS
const OWNER_ADRESS = process.env.MAIN_ADDRESS

const metaData =
    "https://gateway.pinata.cloud/ipfs/QmTfLu91SDcwmW1zP3meF7mEcPkieYBCMA5HmRnfC2AbbL/ian.json"

const mint = async () => {
    const contract = await MyNFT__factory.connect(
        NFT_ADDRESS!,
        await ethers.getSigner(OWNER_ADRESS!)
    )

    // const contract = await ethers.getContractAt(MyNFT, nftAdress)

    const tx = await contract.mintNFT(OWNER_ADRESS!, metaData)
    await tx.wait()

    console.log("tx: ", tx)
}

mint().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
