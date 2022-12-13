import React from "react"
import { RouteConfigComponentProps } from "react-router-config"
import { Carousel, Row, Col } from "antd"
import ian from "./imgs/ian.jpg"
import weiqi from "./imgs/Weiqi.jpg"
import robert from "./imgs/Rob.jpg"
import styles from "./style.module.scss"
import { Link } from "react-router-dom"
interface IProps extends RouteConfigComponentProps {}
interface nft {
    name: string
    image: string
    description: string
}

export const HomePage: React.FC<IProps> = (Iprops) => {
    const nftList: nft[] = [
        {
            name: "Ian the brave",
            image: "/images/ian.jpg",
            description: "",
        },
        {
            name: "Rob the mighty",
            image: "/images/rob.jpg",
            description: "",
        },
        {
            name: "Weiqi the powerful",
            image: "/images/weiqi.jpg",
            description: "",
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
                                    return <div className={styles.alink} key={e.name}><Link to={`/${e.name}`}>{e.name}</Link></div>
                                })}
                            </div>
                        </div>
                    </Col>
                    <Col span={19}></Col>
                </Row>
            </div>
        </div>
    )
}
