import React, { useContext } from "react"
import { RouteConfigComponentProps } from "react-router-config"
import style from "./style.module.scss";
import { useStore } from '../../store';

interface IProps extends RouteConfigComponentProps {}

export const Header: React.FC<IProps> = () => {
    const { auth } = useStore();
    return (
        <div className={style.header}>
            <button onClick={() => {
                auth.getPrivateKey()
            }}>sdsds</button>
        </div>
    )
}
