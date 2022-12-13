import React, { FC, useContext } from "react"
import { Link } from "react-router-dom"
import { context } from "../../pages"
// import style from "./Rentable.module.less"

interface IProps {
    children?: React.ReactNode
    rentable: any
}

export const Rentable: FC<IProps> = (props) => {
    const [state, useState] = useContext(context)

    return (
        <div>
            {/* prettier sucks */}I am a rentable and my name is
            {props.rentable.name}
            {state.isConnected && (
                <Link to={`${props.rentable.name}`}>More Info</Link>
            )}
        </div>
    )
}
