import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import RecipeDetails from "./RecipeDetails";

const RecipePage = () => {
    const {id} = useParams();

    return (
        <>
        <NavBar />
        <RecipeDetails id={id} />
        </>
    );
} 

export default RecipePage;