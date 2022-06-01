import { Autocomplete, Button, CircularProgress, Container, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { api } from "../../api";
import RecipeCard from "../BrowsePage/RecipeCard/RecipeCard";
import NavBar from "../NavBar/NavBar";

const SearchIngredientsPage = () => {
    const [ingredients, setIngredients] = useState([]);
    const [searchIngredients, setSearchIngredients] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('all');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getIngredients = async () => {
        api.get('Ingredient')
        .then(response => {
            setIngredients(response.data);
        })
        .catch(error => {
            console.log(error);
        })
        }
        const getCategories = async () => {
        api.get('Category')
        .then(response => {
            //setCategories(response.data);
            //setCategories(categories.concat({id: 0, name: 'all', recipes: []}));
            var list = [];
            //list = (response.data).concat({id: 0, name: 'all', recipes: []});
            list = [{id: 0, name: 'all'}, ...response.data];
            setCategories(list);
            console.log(categories);
        })
        .catch(error => {
            console.log(error)
        })
        }
        getIngredients();
        getCategories();
    }, [])

    const handleSearch = () => {
        const list = [];
        searchIngredients.forEach(ingr => list.push(ingr.ingredientName));
        setLoading(true);
        const searchData = {
            category: category,
            ingredients: list
        }
        
        const search = async () => {
        api.post('Recipe/search', searchData)
        .then(response => {
            setRecipes(response.data.filter(recipe => recipe.status === 'accepted'));
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
        }
        search();

        console.log(searchData);
    }

    return(
        <>
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
            defaultValue={{id: 0, name: 'all'}}
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
            {loading && 
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" marginTop={10}>
            <CircularProgress /> 
            </Grid>
            }
            {!loading && 
            <Grid item container xs={12} spacing={6} style={{paddingTop: '30px', paddingBottom: '30px'}}>
                    {recipes.map( (recipe) => {
                        return (
                            <Grid item xs={3}>
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            </Grid>
                        )
                    })}
            </Grid>
            }
        </Grid>
        </>
        </>
    );
}

export default SearchIngredientsPage;