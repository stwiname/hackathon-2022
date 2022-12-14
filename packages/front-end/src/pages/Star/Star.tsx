import React, { FC } from "react"
import { useParams } from "react-router-dom"
import style from "./Star.module.scss"

interface IProps {
    children?: React.ReactNode
}

export const Star: FC<IProps> = (props) => {
    const { star } = useParams()
    return (
        <div className={style.Star}>
            {star ? (
                <div>
                    <h1>Star {star}</h1>
                </div>
            ) : (
                <div>Star not found</div>
            )}
        </div>
    )
}
