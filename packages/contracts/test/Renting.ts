import { ethers } from "hardhat"
import { describe } from "mocha"

// get env variables

describe("Renting", () => {
    const deployRentingFixture = async () => {
        const [
            mainSigner, //
            iansSigner,
            robsSigner,
            weiqisSigner,
        ] = await ethers.getSigners()

        const Renting = await ethers.getContractFactory("Renting")
        const renting = await Renting.deploy()
    }

    it("should work", () => {
        // TODO
    })
})
