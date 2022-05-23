import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import './RecipeCard.css';

const RecipeCard = ({recipe}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/recipe/${recipe.id}`);
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
                <IconButton aria-label="add to favorites" className="favIcon">
                <FavoriteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default RecipeCard;