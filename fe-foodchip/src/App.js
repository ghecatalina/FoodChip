import React from "react"
import LandingPage from "./Components/LandingPage/LandingPage"
import SignIn from "./Components/SignInPage/SignIn"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from "./Components/RegisterPage/Register"
import BrowsePage from "./Components/BrowsePage/BrowsePage"
import AddRecipe from "./Components/AddRecipePage/AddRecipe"

const App = () => {
    return (
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<LandingPage />} />
                        <Route exact path="/signin" element={<SignIn />} />
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/browse" element={<BrowsePage />} />
                        <Route exact path="/addrecipe" element={<AddRecipe />} />
                    </Routes>
                </BrowserRouter>

    )
}

export default App