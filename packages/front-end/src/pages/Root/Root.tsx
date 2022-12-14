import React, { FC, useEffect } from "react"
import { Outlet, redirect, useNavigate } from "react-router-dom"
import { Header } from "../../component"
import style from "./Root.module.scss"

interface IProps {
    children?: React.ReactNode
}

export const Root: FC<IProps> = (props) => {
    const nav = useNavigate()
    useEffect(() => {
        nav('/Home')
    }, [])
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}
