import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const RPC_URL_MOONBASE_APLHA = process.env.RPC_URL_MOONBASE_APLHA
const PRIVATE_KEY = process.env.PRIVATE_KEY

const config: HardhatUserConfig = {
    solidity: "0.8.17",
    defaultNetwork: "hardhat",
    networks: {
        moon: {
            url: RPC_URL_MOONBASE_APLHA,
            accounts: [PRIVATE_KEY!],
            chainId: 1287,
        },
        localhost: {
            url: "http://localhost:8545",
            chainId: 31337,
        },
    },
};

export default config;
