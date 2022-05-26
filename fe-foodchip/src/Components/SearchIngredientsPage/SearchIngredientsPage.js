import { Autocomplete, Button, CircularProgress, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { api } from "../../api";
import RecipeCard from "../BrowsePage/RecipeCard/RecipeCard";
import NavBar from "../NavBar/NavBar";

const SearchIngredientsPage = () => {
    const [ingredients, setIngredients] = useState([]);
    const [searchIngredients, setSearchIngredients] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        api.get('Ingredient')
        .then(response => {
            setIngredients(response.data);
        })
        .catch(error => {
            console.log(error);
        })

        api.get('Category')
        .then(response => {
            //setCategories(response.data);
            //setCategories(categories.concat({id: 0, name: 'all', recipes: []}));
            var list = [];
            //list = (response.data).concat({id: 0, name: 'all', recipes: []});
            list = [{id: 0, name: 'all', recipes: []}, ...response.data];
            setCategories(list);
            console.log(categories);
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    const handleSearch = () => {
        const list = [];
        searchIngredients.forEach(ingr => list.push(ingr.ingredientName));

        const searchData = {
            category: category,
            ingredients: list
        }
        
        api.post('Recipe/search', searchData)
        .then(response => {
            setRecipes(response.data);
        })
        .catch(err => {
            console.log(err);
        })

        //console.log(recipes);
    }

    return(
        !ingredients.length && !categories.length ? <CircularProgress /> :
        <>
        <NavBar />
        <Grid container justifyContent="flex-start" style={{paddingLeft: '40px', paddingRight: '40px', paddingTop: '30px'}}>
            <Grid item container xs={12} >
            <Grid item xs={9} style={{paddingRight: '30px'}}>
            <Autocomplete
            multiple
            id="tags-standard"
            options={ingredients}
            getOptionLabel={(option) => option.ingredientName}
            onChange={(event, newValue) => {setSearchIngredients(newValue)}}
            renderInput={(params) => (
            <TextField  
                {...params}
                variant="standard"
                label="Search your ingredients"
                placeholder="Ingredients"
            />
            )}
        />
            </Grid>
            <Grid item xs={2} style={{paddingRight: '30px'}}>
            <Autocomplete
            id="tags-standard"
            options={categories}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.name}
            defaultValue={categories[0]}
            onChange={(event, newValue) => {setCategory(newValue.name)}}
            renderInput={(params) => (
            <TextField  
                {...params}
                variant="standard"
                label="Choose category"
                placeholder="Categories"
            />
            )}
        />
            </Grid>
            <Grid item xs={1} style={{paddingTop: '10px'}}>
                <Button variant="contained" onClick={handleSearch} style={{background: '#FEA150'}}>Search</Button>
            </Grid>
            </Grid>
            <Grid item container xs={12} columnSpacing={6} style={{paddingTop: '30px'}}>
                    {recipes.map( (recipe) => {
                        return (
                            <Grid item xs={3}>
                                <RecipeCard recipe={recipe} />
                            </Grid>
                        )
                    })}
            </Grid>
        </Grid>
        </>
    );
}

export default SearchIngredientsPage;