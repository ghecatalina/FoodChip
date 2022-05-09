import React from "react"
import LandingPage from "./Components/LandingPage/LandingPage"
import SignIn from "./Components/SignInPage/SignIn"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from "./Components/RegisterPage/Register"

const App = () => {
    return (
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<LandingPage />} />
                        <Route exact path="/signin" element={<SignIn />} />
                        <Route exact path="/register" element={<Register />} />
                    </Routes>
                </BrowserRouter>

    )
}

export default App