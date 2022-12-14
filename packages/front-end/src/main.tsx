import React from "react"
import ReactDOM from "react-dom/client"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import "./index.css"
import { HomePage } from "./pages"
import { Header } from "./component"
import { Web3ReactProvider } from "@web3-react/core"
import { providers } from "ethers"
import { Stars } from "./pages/Stars/Stars"
import { Star } from "./pages/Star/Star"

function getLibrary(
    provider: providers.ExternalProvider
): providers.Web3Provider {
    return new providers.Web3Provider(provider)
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Web3ReactProvider getLibrary={getLibrary}>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />}>
                        <Route path="/stars" element={<Stars />}>
                            <Route path="/{id}" element={<Star />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Web3ReactProvider>
    </React.StrictMode>
)
