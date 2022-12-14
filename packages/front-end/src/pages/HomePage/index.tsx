import React from "react"
import { RouteConfigComponentProps } from "react-router-config"
import { Carousel, Row, Col } from "antd"
// import ian from "./imgs/ian.jpg"
// import weiqi from "./imgs/Weiqi.jpg"
// import robert from "./imgs/Rob.jpg"
import styles from "./style.module.scss"
import { Link } from "react-router-dom"
import { NFTMetadata } from "../../types/contracts/nft"
import { ListBox } from "../../component"
import { observer } from "mobx-react"
import { useWeb3React } from "@web3-react/core"
import { RentNFTSdk } from "../../types/contracts/nft"
import { nftList } from "../../data"

interface IProps extends RouteConfigComponentProps {}

export const HomePage: React.FC<IProps> = observer((Iprops) => {
    const { library, account } = useWeb3React()

    const sdk = React.useMemo(
        () => !!library && new RentNFTSdk(library.getSigner(account)),
        [library, account]
    )

    return (
        <div className={styles.container}>
            <div className={styles.trendingAndListing}>
                <Row>
                    <Col span={5} className={styles.trendingCol}>
                        <div className={styles.trending}>
                            <h2>Trending</h2>
                            <div>
                                {nftList.map((e) => {
                                    return (
                                        <div
                                            className={styles.alink}
                                            key={e.name}
                                        >
                                            <Link to={`/${e.name}`}>
                                                {e.name}
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </Col>
                    <Col span={19} className={styles.nftCol}>
                        {nftList.map((e) => {
                            return <ListBox nft={e} key={e.name} />
                        })}
                    </Col>
                </Row>
            </div>
        </div>
    )
})
