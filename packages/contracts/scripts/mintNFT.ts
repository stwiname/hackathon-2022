import { ethers } from "hardhat"
import "dotenv/config"
import { MyNFT, MyNFT__factory } from "../dist"
import { metaDataEndpoint, people, Person } from "../utils/variables"

const NFT_ADDRESS = process.env.NFT_ADDRESS
const OWNER_ADRESS = process.env.MAIN_ADDRESS

const main = async () => {
    const contract = await MyNFT__factory.connect(
        NFT_ADDRESS!,
        await ethers.getSigner(OWNER_ADRESS!)
    )

    const mint = async (p: Person) => {
        console.log(`Minting NFT for ${p.name} at address: ${p.address}`)
        const metaData = `${metaDataEndpoint}/${p.name}.json`
        const tx = await contract.mintNFT(p.address, metaData)
        await tx.wait(1)
        console.log("tx: ", tx)
    }

    for (let p = 0; p < people.length; p++) {
        await mint(people[p])
    }
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
