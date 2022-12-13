import React, { useContext } from "react"
import { RouteConfigComponentProps } from "react-router-config"
import { context } from "../../pages"
import style from "./style.module.scss"

interface IProps extends RouteConfigComponentProps {}

export const Header: React.FC<IProps> = () => {
    const consumer = useContext(context)

    const privateKey = "test"

    return (
        <div className={style.header}>
            <div className="logo">Logo</div>
            <button onClick={() => consumer.handleConnect(privateKey)}>
                connect
            </button>
        </div>
    )
}
