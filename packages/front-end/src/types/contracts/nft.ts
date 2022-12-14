import {
    // MyNFT__factory, //
    MyNFT,
    RentToken,
    // RentToken__factory,
    Renting,
    // Renting__factory,
} from "@psst/contracts";

import { MyNFT__factory } from "@psst/contracts/src/typechain/factories/contracts/NFT.sol/MyNFT__factory";
import { Renting__factory } from "@psst/contracts/src/typechain/factories/contracts/Renting/Renting__factory";
import { RentToken__factory } from "@psst/contracts/src/typechain/factories/contracts/Token.sol/RentToken__factory";
// import assert from "assert";
import type { Signer, BigNumberish } from "ethers";
import type { Provider } from "@ethersproject/providers";

export type NFTMetadata = {
    name: string
    image: string
    description: string
    hourly?: number
    renter?: string
}

const NFT_ADDRESS = import.meta.env.NFT_ADDRESS
const TOKEN_ADDRESS = import.meta.env.TOKEN_ADDRESS
const RENT_ADDRESS = import.meta.env.RENT_ADDRESS

// We're just hard coding these for now
export const TOKEN_IDS = [1, 2, 3]

export class RentNFTSdk {
    // todo: see how Ian set this up in hackathon_voting_2022 codebase

    public readonly nftContract: MyNFT
    public readonly erc20Contract: RentToken
    public readonly rentContract: Renting

    constructor(signerOrProvider: Signer | Provider) {

        this.nftContract = MyNFT__factory.connect(NFT_ADDRESS, signerOrProvider)
        this.erc20Contract = RentToken__factory.connect(
            TOKEN_ADDRESS,
            signerOrProvider
        )
        this.rentContract = Renting__factory.connect(
            RENT_ADDRESS,
            signerOrProvider
        )
    }
}

export async function getNFTMetadata(
    contract: MyNFT,
    id: BigNumberish
): Promise<NFTMetadata> {
    const metadataUrl = await contract.tokenURI(id)

    const raw = await fetch(metadataUrl)

    return raw.json()
}

export async function rentNFTChecked(
    sdk: RentNFTSdk,
    accountAddress: string,
    tokenId: BigNumberish
) {
    const price = await sdk.rentContract.priceOf(tokenId)

    const allowance = await sdk.erc20Contract.allowance(
        accountAddress,
        sdk.rentContract.address
    )

    if (price.gt(allowance)) {
        // Submit approval tx
        const approveTx = await sdk.erc20Contract.approve(
            sdk.rentContract.address,
            price
        )

        // Wait for confirmation
        await approveTx.wait(1)
    }

    // Rent token for 1 epoch, this will most likely change arguments
    const rentTx = await sdk.rentContract.rent(tokenId, 1)

    // Wait for confirmation
    await rentTx.wait(1)
}

export async function getAllNftDetails(
    sdk: RentNFTSdk,
    tokenId: BigNumberish
): Promise<NFTMetadata & { owner: string; price: BigNumberish }> {
    const [meta, owner, price] = await Promise.all([
        getNFTMetadata(sdk.nftContract, tokenId),
        sdk.nftContract.ownerOf(tokenId),
        sdk.rentContract.priceOf(tokenId),
    ])

    return {
        ...meta,
        owner,
        price,
    }
}
