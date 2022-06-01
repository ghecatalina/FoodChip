import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import './RecipeCard.css';
import api from "../../../Services/api";
import { grey, red } from "@mui/material/colors";

const RecipeCard = ({recipe}) => {
    const userId = localStorage.getItem('id');
    const userRole = localStorage.getItem('role'); 
    const pathname = window.location.pathname;
    const navigate = useNavigate();
    const [isFavourite, setIsFavourite] = useState(false);
    const [formData, setFormData] = useState({userId: userId, recipeId: Number(recipe.id)});

    const handleClick = () => {
        navigate(`/recipe/${recipe.id}`);
    }

    useEffect(() => {
        const getData = async () => {
        if (!userId)
            return;
        if (pathname !== '/favourites'){
            api.post('Favourites', formData)
            .then(response => {
                setIsFavourite(response.data);
                console.log(isFavourite);
            })
            .catch(err => {
                console.log(err);
            })
        }else{
            setIsFavourite(true);
        }
        }
        getData();
    }, [isFavourite]);

    const handleAcceptRecipe = () => {
        const formData = {
            recipeId: Number(recipe.id),
            status: 'accepted'
        }
        api.put('Recipe', formData)
        .then(response => {
            console.log(response.data);
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
    }          

    const removeFromFavourite = () => {
        api.put('Favourites/delete', formData)
            .then(response => {
                console.log(response.data);
                setIsFavourite(false);
                if (pathname === '/favourites'){
                    window.location.reload();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const addToFavourite = () => {
        api.put('Favourites/add', formData)
            .then(response => {
                console.log(response.data);
                setIsFavourite(true);
                console.log('is not');
            })
            .catch(err => {
                console.log(err);
            })
        //console.log(formData);
    }

    const handleFavourite = () => {
        if (isFavourite){
            removeFromFavourite();
        }else{
            addToFavourite();
        }
    }

    const handleDeclineRecipe = () => {
        const formData = {
            recipeId: Number(recipe.id),
            status: 'declined'
        }
        api.put('Recipe', formData)
        .then(response => {
            console.log(response.data);
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
    }

    return(
        <Card>
            <CardMedia
                component="img"
                height="194"
                image={recipe.coverImage}
                alt="Photo"
            />
            <CardContent>
                <Typography className="name" onClick={handleClick}>
                    {recipe.name}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                {userId &&
                <Grid item xs={12}>
                <IconButton aria-label="add to favorites" className="favIcon" onClick={handleFavourite}>
                <FavoriteIcon sx={isFavourite && {color: 'red'}}/>
                </IconButton>
                </Grid>
                }
                <Grid item xs={12}>
                {userRole === 'admin' && pathname === '/requests' && 
                <>
                <IconButton onClick={handleAcceptRecipe}>
                    <CheckIcon />
                </IconButton>
                <IconButton onClick={handleDeclineRecipe}>
                    <ClearIcon />
                </IconButton>
                </>
                }
                {userRole === 'regular' && pathname === '/requests' &&
                <Typography variant="body2">status: {recipe.status}</Typography>
                }
                </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}

export default RecipeCard;