import { Grid, Typography } from "@mui/material";
import React from "react";
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

const RecipeCard = ({recipe}) => {
    const userRole = localStorage.getItem('role'); 
    const pathname = window.location.pathname;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/recipe/${recipe.id}`);
    }

    const handleAcceptRecipe = () => {
        const formData = {
            recipeId: Number(recipe.id),
            status: 'accepted'
        }
        api.put('Recipe', formData)
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleDeclineRecipe = () => {
        const formData = {
            recipeId: Number(recipe.id),
            status: 'declined'
        }
        api.put('Recipe', formData)
        .then(response => {
            console.log(response.data);
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
                <Typography className="name">
                    {recipe.name}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                <Grid item xs={12}>
                <IconButton aria-label="add to favorites" className="favIcon">
                <FavoriteIcon />
                </IconButton>
                </Grid>
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
                {userRole === 'regular' && 
                <Typography variant="body2">status: {recipe.status}</Typography>
                }
                </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}

export default RecipeCard;