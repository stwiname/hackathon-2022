import { Carousel } from "antd"
import React, { FC } from "react"
import { nftList } from "../../data"
import style from "./GalleryPage.module.scss"

interface IProps {
    children?: React.ReactNode
}

export const GalleryPage: FC<IProps> = (props) => {
    return (
        <div className={style.container}>
            <Carousel>
                {nftList.map((e) => {
                    return (
                        <div key={e.name}>
                            <div className={style.imgBox}>
                                <img src={e.image} height={320} alt={e.name} />
                            </div>
                        </div>
                    )
                })}
            </Carousel>
        </div>
    )
}
