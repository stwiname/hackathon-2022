import { MyNFT__factory, MyNFT, RentToken, RentToken__factory } from "@psst/contracts";
import assert from 'assert';
import type { Signer, BigNumberish} from 'ethers';
import type { Provider } from "@ethersproject/providers";

export type NFTMetadata = {
    name: string;
    image: string;
    description: string;
}

const NFT_ADDRESS = process.env.NFT_ADDRESS;
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;

// We're just hard coding these for now
export const TOKEN_IDS = [1, 2, 3]

export class RentNFTSdk {
    // todo: see how Ian set this up in hackathon_voting_2022 codebase

    public readonly nftContract: MyNFT;
    public readonly erc20Contract: RentToken;

    constructor(signerOrProvider: Signer | Provider) {

        assert(NFT_ADDRESS, "Nft address not provided");
        assert(TOKEN_ADDRESS, "ERC20 Token address not provided");

        this.nftContract = MyNFT__factory.connect(NFT_ADDRESS, signerOrProvider);
        this.erc20Contract = RentToken__factory.connect(TOKEN_ADDRESS, signerOrProvider)
    }
}



export async function getNFTMetadata(contract: MyNFT, id: BigNumberish): Promise<NFTMetadata> {
    const metadataUrl = await contract.tokenURI(id);

    const raw = await fetch(metadataUrl);

    return raw.json();
}
