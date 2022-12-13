import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { ethers } from "hardhat"
import { MyNFT } from "../dist"
import { epochDuration, epochStart } from "../utils/time"
import { metaDataEndpoint, people } from "../utils/variables"

const deployNFT = async () => {
    console.log("deploying NFT...")

    const NFT = await ethers.getContractFactory("MyNFT")
    const nft = await NFT.deploy()
    await nft.deployed()

    console.log("NFT deployed to:", nft.address)
    return nft
}

const mintNFTs = async (nft: MyNFT, signers: SignerWithAddress[]) => {
    console.log("minting NFTs...")

    const mint = async (recipent: string, name: string) => {
        console.log(`Minting NFT for ${name} at address: ${recipent}`)

        const metaData = `${metaDataEndpoint}/${name}.json`
        console.log("metaData: ", metaData)

        const tx = await nft.connect(signers[0]).mintNFT(recipent, metaData)
        await tx.wait(1)
    }

    for (let p = 0; p < people.length; p++) {
        await mint(signers[p + 1].address, people[p].name)
    }

    console.log("NFTs minted")
}

const deployToken = async () => {
    console.log("deploying token...")

    const Token = await ethers.getContractFactory("RentToken")
    const token = await Token.deploy()
    await token.deployed()

    // console.log("token deployed to:", token.address)
    return token
}

const deployRenting = async (nft: string, token: string) => {
    console.log("deploying renting contract...")

    const Renting = await ethers.getContractFactory("Renting")
    const renting = await Renting.deploy(nft, token, epochStart, epochDuration)
    await renting.deployed()

    // console.log("renting deployed to:", renting.address)
    return renting
}

describe("Renting", () => {
    const deployRentingFixture = async () => {
        console.log("deployRentingFixture:")

        const signers = await ethers.getSigners()
        signers.forEach((s) => console.log(s.address))

        const nft = await deployNFT()
        const token = await deployToken()
        const renting = await deployRenting(nft.address, token.address)

        await mintNFTs(nft, signers)

        return { nft, token, renting, signers }
    }

    it("should work", async () => {
        const { nft, token, renting } = await deployRentingFixture()

        // expect
    })
})
