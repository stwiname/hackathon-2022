import React from "react"
import { RouteConfigComponentProps } from "react-router-config"
import { Outlet } from "react-router-dom"
import { Header } from "../../component"
import { Store, initialStoreState } from "../../store"

interface IProps extends RouteConfigComponentProps {}

type State = [
    state: Store,
    setState: React.Dispatch<React.SetStateAction<Store>>
]

export const context = React.createContext({} as State)
const Provider = context.Provider

export const HomePage: React.FC<IProps> = (Iprops) => {
    const [state, setState] = React.useState(initialStoreState)

    return (
        <Provider value={[state, setState]}>
            <Header />
            <div className="body">this is the body</div>
            <Outlet />
        </Provider>
    )
}
