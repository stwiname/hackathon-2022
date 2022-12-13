import { ethers } from "hardhat"

// hardcoding address from when I deployed to moonbase
const address = '0xa2A8C5eC1E1A51E9c79a143E89AB248c18767aA1'

const mint = async () => {
// use ethers to get the contract instance
const contract = await ethers.getContractAt('MyNFT', address)

}