import React from "react"
import { observer } from "mobx-react"
import { RouteConfigComponentProps } from "react-router-config"
import { useParams } from "react-router-dom"
import { NFTMetadata } from "../../types/contracts/nft"
import styles from "./style.module.scss"
import { Row, Col, Card, Button } from "antd"
import { nftList } from '../../data'

interface IProps extends RouteConfigComponentProps {}

export const DetailPage: React.FC<IProps> = observer(() => {
    let { name } = useParams()
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

                        <Card title={nft?.name}>
                            <p className={styles.renter}>
                                Rented by {nft?.renter}
                            </p>
                            <p className={styles.price}>
                                Price {nft?.hourly} eth / hour
                            </p>
                        </Card>
                        <div className={styles.btns}>
                            <Button onClick={() => alert('Added Successfully')} type="primary" className={styles.btn}>
                                Add to Card
                            </Button>
                            <Button onClick={() => {alert('Please check your email for confirmation')}} className={styles.btn}>Rent Now</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
})
