import { Button, ButtonGroup, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import NavBar from "../NavBar/NavBar";
import RecipeCard from "../BrowsePage/RecipeCard/RecipeCard"
import './BrowsePage.css';

const BrowsePage = () => {
    const [recipeList, setRecipeList] = useState([]);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        api.get('Recipe')
        .then(response => {
            setRecipeList(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        api.get('Category')
        .then(response => {
            setCategories(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);

    const addToFavourites = () => {
        
    }

    if (recipeList === null) return;
    console.log(recipeList);
    let filteredRecipes = recipeList.filter(recipe => recipe.status === "accepted")
    
    return(
        <>
        <NavBar list/>
        <div className="menu">
        <Grid container>
            <Grid item container>
                <ButtonGroup orientation="vertical" style={{background: '#FEA150'}}>
                    {
                        !categories ? <CircularProgress /> :
                        categories.map((category) => {
                            return (
                                <Button style={{color: 'white' }} variant="text">{category.name}</Button>
                            )
                        })
                    }
                </ButtonGroup>
            </Grid>
        </Grid>
        </div>
        <div className="recipe">
        {!filteredRecipes.length ? <CircularProgress/>:
            <Grid container spacing={3} justifyContent="flex-start" style={{paddingLeft: '70px', paddingTop: '20px', paddingBottom: '10px'}}>
                {filteredRecipes.map( (recipe) => {
                    return (
                        <Grid item maxWidth="250px" key={recipe.id}>
                            <RecipeCard recipe={recipe}></RecipeCard>
                        </Grid>
                    )
                })}
            </Grid>
        }
        </div>
        </>
    );
}

export default BrowsePage;