import { Button, ButtonGroup, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import RecipeCard from "../BrowsePage/RecipeCard/RecipeCard"
import './BrowsePage.css';
import { api } from "../../api";

const BrowsePage = () => {
    const [recipeList, setRecipeList] = useState([]);
    const [categories, setCategories] = useState(null);
    const [categoryType, setCategoryType] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    useEffect(() => {
        const getRecipes = async () => {
        await api.get('Recipe')
        .then(response => {
            setRecipeList(response.data);
            setCategoryType('all');
        })
        .catch(function (error) {
            console.log(error);
        });
        }
        getRecipes();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            await api.get('Category')
            .then(response => {
                setCategories(response.data);
                setCategoryType('all');
            })
            .catch(function (error) {
                console.log(error);
            })
            }
            getCategories();
    }, [])

    useEffect(() => {
        if (categoryType === 'all'){
            setFilteredRecipes(recipeList.filter(recipe => recipe.status === "accepted"));
            console.log(filteredRecipes);
        }else {
            setFilteredRecipes(recipeList.filter(recipe => recipe.status === "accepted" && recipe.category === categoryType));
        }
    }, [recipeList, categoryType])

    //if (recipeList === null) return;
    //console.log(recipeList);
    //let filteredRecipes = recipeList.filter(recipe => recipe.status === "accepted")
    
    return(
        <>
        <NavBar />
        <div className="menu">
        <Grid container spacing={3}>
            <Grid item container xs={6}>
                <ButtonGroup orientation="vertical" >
                    {
                        !categories ? <CircularProgress /> :
                        categories.map((category) => {
                            return (
                                <Button key={category.id} style={categoryType === category.name ? {color: 'white', background: '#ba9473', width: '200px' } : {color: 'white', background: '#FEA150', width: '200px'}} variant="text" onClick={(e) => setCategoryType(category.name)}>{category.name}</Button>
                            )
                        })
                    }
                </ButtonGroup>
            </Grid>
        </Grid>
        </div>
        <div className="recipe">
        {!filteredRecipes.length ? 
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" marginTop={10}>
        <CircularProgress/>
        </Grid>:
            <Grid item container spacing={3} justifyContent="flex-start" style={{paddingLeft: '150px', paddingTop: '20px', paddingBottom: '10px'}}>
                {filteredRecipes.map( (recipe) => {
                    return (
                        <Grid item width="240px" key={recipe.id}>
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