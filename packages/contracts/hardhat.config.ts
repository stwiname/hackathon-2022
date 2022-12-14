import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "dotenv/config"

const RPC_URL_MOONBASE_APLHA = process.env.RPC_URL_MOONBASE_APLHA
const MAIN_PRIVATE_KEY = process.env.MAIN_PRIVATE_KEY

const config: HardhatUserConfig = {
    solidity: "0.8.17",
    defaultNetwork: "hardhat",
    typechain: {
        outDir: "src/typechain",
    },
    networks: {
        moon: {
            url: RPC_URL_MOONBASE_APLHA,
            accounts: [MAIN_PRIVATE_KEY!],
            chainId: 1287,
        },
        localhost: {
            url: "http://localhost:8545",
            chainId: 31337,
        },
    },
}

export default config
