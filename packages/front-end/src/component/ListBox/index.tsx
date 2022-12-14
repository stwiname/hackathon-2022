import React from "react";
import { RouteConfigComponentProps } from "react-router-config"
import { observer } from "mobx-react"
import styles from './style.module.scss'
import { Card } from 'antd'
import { NFTMetadata } from '../../types/contracts/nft'
import { Link } from "react-router-dom";
interface IProps extends RouteConfigComponentProps {
  nft: NFTMetadata
}

export const ListBox: React.FC<IProps> = observer(({nft}) => {
  return (
    <div className={styles.container}>
      <Card title={nft.name}>
        <p><img src={nft.image} alt={nft.description} height={150}/></p>
        <p>{nft.description}</p>
        <Link to={`/${nft.name}`}>Detail</Link>
      </Card>
    </div>
  )
})