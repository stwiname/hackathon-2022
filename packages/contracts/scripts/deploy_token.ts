import { ethers } from "hardhat"

async function main() {
    const Token = await ethers.getContractFactory("RentToken")
    const token = await Token.deploy()

    await token.deployed()

    console.log(`Token deployed to ${token.address}`)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
