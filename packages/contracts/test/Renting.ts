import { ethers } from "hardhat"
import { describe } from "mocha"

// get env variables

describe("Renting", () => {
    async function deployRentingFixture() {
        const [owner, voter1, voter2, voter3, votee1, votee2, votee3] =
            await ethers.getSigners()
    }

    it("should work", () => {
        // TODO
    })
})
