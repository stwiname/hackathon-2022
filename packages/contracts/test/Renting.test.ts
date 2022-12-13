import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { ethers } from "hardhat"
import { MyNFT } from "../dist"
import { epochDuration, epochStart } from "../scripts/deploy_renting"
import { metaDataEndpoint } from "../scripts/mintNFT"

const deployNFT = async () => {
    const NFT = await ethers.getContractFactory("MyNFT")
    const nft = await NFT.deploy()
    await nft.deployed()

    return nft
}

const mintNFTs = async (nft: MyNFT, signers: SignerWithAddress[]) => {
    const mint = async (signer: string, recipent: string) => {
        const metaData = `${metaDataEndpoint}/${signer}.json`
        const tx = await nft.connect(signer).mintNFT(recipent, metaData)
        await tx.wait(1)
    }

    // starting at 1 to skip the main signer
    for (let p = 1; p < signers.length; p++) {
        await mint(signers[0].address, signers[p].address)
    }
}

const deployToken = async () => {
    const Token = await ethers.getContractFactory("RentToken")
    const token = await Token.deploy()
    await token.deployed()

    return token
}

const deployRenting = async (nft: string, token: string) => {
    const Renting = await ethers.getContractFactory("Renting")
    const renting = await Renting.deploy(nft, token, epochStart, epochDuration)
    await renting.deployed()

    return renting
}

describe("Renting", () => {
    const deployRentingFixture = async () => {
        console.log("deployRentingFixture:")

        // const [
        //     mainSigner, //
        //     iansSigner,
        //     robsSigner,
        //     weiqisSigner,
        // ] = await ethers.getSigners()
        const signers = await ethers.getSigners()
        signers.forEach((s) => console.log(s.address))

        const nft = await deployNFT()
        const token = await deployToken()
        const renting = await deployRenting(nft.address, token.address)

        await mintNFTs(nft, signers)

        return { nft, token, renting }
    }

    it("should work", async () => {
        const { nft, token, renting } = await deployRentingFixture()

        // expect
    })
})
