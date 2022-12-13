import React from "react"
import { RouteConfigComponentProps } from "react-router-config"
import { Carousel, Row, Col } from "antd"
import ian from './imgs/ian.jpg'
import weiqi from './imgs/Weiqi.jpg'
import robert from './imgs/Rob.jpg'
import styles from './style.module.scss'
interface IProps extends RouteConfigComponentProps {}

export const HomePage: React.FC<IProps> = (Iprops) => {
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
                            <h3>Trending</h3>
                        </div>
                    </Col>
                    <Col span={19}>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
