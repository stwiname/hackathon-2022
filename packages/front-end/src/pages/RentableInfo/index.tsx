import React, { FC, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import { context } from ".."
// import style from "./Rentable.module.less"

interface IProps {
    children?: React.ReactNode
}

export const RentableInfo: FC<IProps> = (props) => {
    const [state, useState] = useContext(context)

    const { name } = useParams()

    return (
        // <div className={style.Rentable}>
        <div>Rentables Info:{name}</div>
    )
}
