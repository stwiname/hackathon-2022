import { ethers } from "hardhat"
import { checkAllEnvVariables, getEpochOfLastHour } from "../utils"
import { epochDuration, epochStart } from "../utils/time"

const env = {
    NFT_ADDRESS: process.env.NFT_ADDRESS,
    TOKEN_ADDRESS: process.env.TOKEN_ADDRESS,
}

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
