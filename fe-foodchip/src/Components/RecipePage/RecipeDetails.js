import { CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState, FlatList } from "react";
import api from "../../Services/api";

const RecipeDetails = ({id}) => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        api.get(`/Recipe/${id}`)
        .then((response) => {
            console.log(response.data);
            setRecipe(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);

    return(
        <>
        {!recipe ? <CircularProgress /> :
            <>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 30, marginRight: 70,}}>
                <div style={{height:350, width:400, marginRight: 50}}>
                    <img src={recipe.coverImage} alt="" style={{height: '100%', width: '100%', fill: 'cover'}}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{marginBottom: 20}}>
                        <Typography variant="h4">{recipe.name}</Typography>
                    </div>
                    <div style={{fontStyle: 'italic'}}>
                        <Typography variant="h6">{'Ingredients:'}</Typography>
                    </div>
                    <div style={{marginBottom: 20}}>
                        {recipe.ingredients.map((ing) => (
                            <Typography>{'\u2022'} {ing.ingredientName}{' - '}{ing.quantity}{'g'}</Typography>
                        ))}
                    </div>
                    <div>
                        <Typography>{recipe.description}</Typography>
                    </div>
                </div>
            </div>
            </>
        }
        </>
    );
}

export default RecipeDetails;