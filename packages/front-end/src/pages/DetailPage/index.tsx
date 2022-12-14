import React from "react"
import { observer } from "mobx-react"
import { RouteConfigComponentProps } from "react-router-config"
import { useParams } from "react-router-dom"
import { NFTMetadata } from "../../types/contracts/nft"
import styles from "./style.module.scss"
import { Row, Col, Card, Button } from "antd"

interface IProps extends RouteConfigComponentProps {}

export const DetailPage: React.FC<IProps> = observer(() => {
    let { name } = useParams()
    const nftList: any[] = [
        {
            name: "Ian the Ingenious",
            image: "./images/ian.jpg",
            description:
                "No matter how difficult your coding question is, Ian the Ingenious will be able to answer them all. Not only was he the co-founder of StackOverflow, he actually answered 90% of all the questions under different pseudonym to remain hidden (much like Satoshi), but we have tracked him and and made him available to everyone... for a price of course.",
            renter: "Ian",
            hourly: 1,
        },
        {
            name: "Rob the mighty",
            image: "./images/rob.jpg",
            description: "Super Hero Business Marketing",
            renter: "Robert",
            hourly: 1,
        },
        {
            name: "Weiqi the powerful",
            image: "./images/weiqi.jpg",
            description: "Super Hero Social Marketing",
            renter: "Weiqi",
            hourly: 1,
        },
    ]
    const nft = nftList.find((e) => e.name === name)
    return (
        <div className={styles.container}>
            <div className={styles.imgAndPrice}>
                <Row style={{ height: "100%" }}>
                    <Col span={10} className={styles.imgBox}>
                        <img src={nft?.image} alt={nft?.name} height={450} />
                    </Col>
                    <Col span={14} className={styles.productBox}>
                        <p className={styles.title}>{nft?.name}</p>

                        <Card title={nft.name}>
                            <p className={styles.renter}>
                                Rented by {nft.renter}
                            </p>
                            <p className={styles.price}>
                                Price {nft.hourly} eth / hour
                            </p>
                        </Card>
                        <div className={styles.btns}>
                            <Button type="primary" className={styles.btn}>
                                Add to Card
                            </Button>
                            <Button className={styles.btn}>Rent Now</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
})
