import React from "react"
import { RouteConfigComponentProps } from "react-router-config"
import { Header } from "../../component"
import { store } from "../../store"

interface IProps extends RouteConfigComponentProps {}

export const context = React.createContext(store)
const Provider = context.Provider

export const HomePage: React.FC<IProps> = (Iprops) => {
    return (
        <Provider value={store}>
            <Header />
            <div className="body">this is the body</div>
        </Provider>
    )
}
