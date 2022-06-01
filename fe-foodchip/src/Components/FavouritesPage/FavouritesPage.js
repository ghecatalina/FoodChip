import { CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import RecipeCard from "../BrowsePage/RecipeCard/RecipeCard";
import NavBar from "../NavBar/NavBar";

const userId = localStorage.getItem('id');

const FavouritesPage = () => {
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`Favourites/${userId}`)
        .then(response => {
            setFavourites(response.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

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
            {favourites.map((recipe) =>{
                return(
                    <Grid item>
                        <RecipeCard recipe={recipe} />
                    </Grid>
                )
            })}
        </Grid>
        }
        </>
    );
}

export default FavouritesPage;