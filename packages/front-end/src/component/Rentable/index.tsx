import React, { FC } from "react"
// import style from "./Rentable.module.less"

interface IProps {
    children?: React.ReactNode
    rentable: any
}

export const Rentable: FC<IProps> = (props) => {
    return (
        // <div className={style.Rentable}>
        <div>
            {/* prettier sucks */}I am a rentable and my name is
            {props.rentable.name}
        </div>
    )
}
