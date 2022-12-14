import React from "react"
import { RouteConfigComponentProps } from "react-router-config"
import { Carousel, Row, Col } from "antd"
import ian from "./imgs/ian.jpg"
import weiqi from "./imgs/Weiqi.jpg"
import robert from "./imgs/Rob.jpg"
import styles from "./style.module.scss"
import { Link } from "react-router-dom"
import { NFTMetadata } from "../../types/contracts/nft"
import { ListBox } from "../../component"

interface IProps extends RouteConfigComponentProps {}

export const HomePage: React.FC<IProps> = (Iprops) => {
    const nftList: NFTMetadata[] = [
        {
            name: "Ian the Ingenious",
            image: "./images/ian.jpg",
            description:
                "No matter how difficult your coding question is, Ian the Ingenious will be able to answer them all. Not only was he the co-founder of StackOverflow, he actually answered 90% of all the questions under different pseudonym to remain hidden (much like Satoshi), but we have tracked him and and made him available to everyone... for a price of course.",
        },
        {
            name: "Rob the mighty",
            image: "./images/rob.jpg",
            description: "Super Hero Business Marketing",
        },
        {
            name: "Weiqi the powerful",
            image: "./images/weiqi.jpg",
            description: "Super Hero Social Marketing",
        },
    ]
    return (
        <div className={styles.container}>
            <Carousel>
                <div>
                    <div className={styles.imgBox}>
                        <img src={ian} height={320} alt="Ian" />
                    </div>
                </div>
                <div>
                    <div className={styles.imgBox}>
                        <img src={weiqi} height={320} alt="Weiqi" />
                    </div>
                </div>
                <div>
                    <div className={styles.imgBox}>
                        <img src={robert} height={320} alt="Rob" />
                    </div>
                </div>
            </Carousel>
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
                            return <ListBox nft={e} key={e.name}/>
                        })}
                    </Col>
                </Row>
            </div>
        </div>
    )
}
