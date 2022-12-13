import { ethers } from "hardhat";

async function main() {
    const NFT = await ethers.getContractFactory("MyNFT");
    const nft = await NFT.deploy();

    await nft.deployed();

    console.log(`NFT deployed to ${nft.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
