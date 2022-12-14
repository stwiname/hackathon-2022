import React, { FC } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "../../component"
import style from "./Root.module.scss"

interface IProps {
    children?: React.ReactNode
}

export const Root: FC<IProps> = (props) => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}
