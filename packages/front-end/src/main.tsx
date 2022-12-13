import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import "./index.css"
import { HomePage, RentableInfo, Rentables } from "./pages"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}>
                    <Route path="rentables" element={<Rentables />}>
                        <Route path=":name" element={<RentableInfo />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
