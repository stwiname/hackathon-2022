import React, { useContext } from "react"
import { RouteConfigComponentProps } from "react-router-config"
import { Link } from "react-router-dom"
import { context } from "../../pages"
import style from "./style.module.scss"

interface IProps extends RouteConfigComponentProps {}

export const Header: React.FC<IProps> = () => {
    const [state, setState] = useContext(context)

    const privateKey = "test"

    const handleConnect = (key: string) => {
        if (key) {
            setState((state: any) => ({
                ...state,
                isConnected: true,
            }))
        }
    }

    return (
        <div className={style.header}>
            <div className="logo">Logo</div>
            <Link to="/">Home</Link>
            <Link to="/rentables">Rentables</Link>
            <button
                onClick={() => {
                    // if (state.handleConnect) {
                    //     state.handleConnect(privateKey)
                    // }
                    // setState((state: any) => ({
                    //     ...state,
                    //     isConnected: true,
                    // }))
                    // state.handleConnect(state, setState, privateKey)
                    handleConnect(privateKey)
                    console.log(state)
                }}
            >
                connect
            </button>
        </div>
    )
}
