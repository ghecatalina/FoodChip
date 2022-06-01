import { CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import RecipeCard from "../BrowsePage/RecipeCard/RecipeCard";
import NavBar from "../NavBar/NavBar";

const RequestsPage = () => {
    const userRole = localStorage.getItem('role');
    const userId = localStorage.getItem('id');
    const [allRecipes, setAllRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const getData = async () => {
        api.get('Recipe')
        .then(response => {
            setAllRecipes(response.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
        }
        getData();
    }, [userId]);

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
        {loading && 
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" marginTop={10}>
            <CircularProgress /> 
            </Grid>
        }
        {!loading &&
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