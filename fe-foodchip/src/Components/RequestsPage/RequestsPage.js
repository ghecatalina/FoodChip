import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import RecipeCard from "../BrowsePage/RecipeCard/RecipeCard";
import NavBar from "../NavBar/NavBar";

const RequestsPage = () => {
    const userRole = localStorage.getItem('role');
    const userId = localStorage.getItem('id');
    const [allRecipes, setAllRecipes] = useState([]);
    //const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        api.get('Recipe')
        .then(response => {
            setAllRecipes(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    if (allRecipes === null) return;
    console.log(allRecipes);
    let recipes = [];
    if (userRole === 'admin'){
        recipes = allRecipes.filter(r => r.status === 'pending');
    }else{
        recipes = allRecipes.filter( r => r.userId === userId);
    }

    return(
        <>
        <NavBar />
        { 
        <Grid container justifyContent="flex-start" spacing={3} style={{paddingLeft: '40px', paddingRight: '40px', paddingTop: '30px'}}>
            {recipes.map((recipe) =>{
                return(
                    <Grid item key={recipe.id}>
                        <RecipeCard recipe={recipe} />
                    </Grid>
                )
            })}
        </Grid>
        }
        </>
    );
}

export default RequestsPage;