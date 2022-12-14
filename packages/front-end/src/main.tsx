import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import "./index.css"
import { HomePage, DetailPage } from "./pages"
import { Header } from "./component"
import { Web3ReactProvider } from "@web3-react/core"
import { providers } from "ethers"
import { GalleryPage } from "./pages/GalleryPage"
import { Root } from "./pages/Root/Root"

function getLibrary(
    provider: providers.ExternalProvider
): providers.Web3Provider {
    return new providers.Web3Provider(provider)
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Web3ReactProvider getLibrary={getLibrary}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Root />}>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/:name" element={<DetailPage />} />
                        <Route path="/gallery" element={<GalleryPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Web3ReactProvider>
    </React.StrictMode>
)
