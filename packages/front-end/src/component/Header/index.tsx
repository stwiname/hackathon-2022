import React, { useContext } from "react"
import { RouteConfigComponentProps } from "react-router-config"
import style from "./style.module.scss"

interface IProps extends RouteConfigComponentProps {}

export const Header: React.FC<IProps> = () => {
    return (
        <div className={style.header}>
        </div>
    )
}
