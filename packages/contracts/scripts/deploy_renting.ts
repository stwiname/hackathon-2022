import { ethers } from "hardhat"
import { checkAllEnvVariables, getEpochOfLastHour } from "./utils"

const env = {
    NFT_ADDRESS: process.env.NFT_ADDRESS,
    TOKEN_ADDRESS: process.env.TOKEN_ADDRESS,
}
const epochStart = getEpochOfLastHour()
const epochDuration = 60 * 60 // 1 hour

async function main() {
    checkAllEnvVariables(env)

    const Renting = await ethers.getContractFactory("Renting")
    const renting = await Renting.deploy(
        env.NFT_ADDRESS!,
        env.TOKEN_ADDRESS!,
        epochStart,
        epochDuration
    )

    await renting.deployed()

    console.log(`Renting deployed to ${renting.address}`)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
