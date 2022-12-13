import React, { FC, useContext } from "react"
import { Rentable } from "../../component/Rentable"
import { context } from "../HomePage"
// import style from "./rentables.module.less"

interface IProps {
    children?: React.ReactNode
}

export const Rentables: FC<IProps> = (props) => {
    const [state, useState] = useContext(context)

    return (
        <div>
            {state.isConnected ? (
                <div>
                    rentables list:
                    {state.rentables?.map((rentable: any) => (
                        <Rentable rentable={rentable} key={rentable.name} />
                    ))}
                </div>
            ) : (
                <div>you are not connected yet!</div>
            )}
        </div>
    )
}
