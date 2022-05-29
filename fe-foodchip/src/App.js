import React from "react"
import LandingPage from "./Components/LandingPage/LandingPage"
import SignIn from "./Components/SignInPage/SignIn"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from "./Components/RegisterPage/Register"
import BrowsePage from "./Components/BrowsePage/BrowsePage"
import AddRecipe from "./Components/AddRecipePage/AddRecipe"
import RecipePage from "./Components/RecipePage/RecipePage"
import SearchIngredientsPage from "./Components/SearchIngredientsPage/SearchIngredientsPage"
import FavouritesPage from "./Components/FavouritesPage/FavouritesPage"
import RequestsPage from "./Components/RequestsPage/RequestsPage"

const App = () => {
    return (
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<LandingPage />} />
                        <Route exact path="/signin" element={<SignIn />} />
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/browse" element={<BrowsePage />} />
                        <Route exact path="/addrecipe" element={<AddRecipe />} />
                        <Route exact path="/recipe/:id" element={<RecipePage />} />
                        <Route exact path="/search" element={<SearchIngredientsPage />} />
                        <Route exact path="/favourites" element={<FavouritesPage />} />
                        <Route exact path="/requests" element={<RequestsPage />} />
                    </Routes>
                </BrowserRouter>

    )
}

export default App