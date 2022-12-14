import React, { FC } from "react"
import style from "./Stars.module.scss"

interface IProps {
    children?: React.ReactNode
}

export const Stars: FC<IProps> = (props) => {
    return <div className={style.Stars}>stars</div>
}
