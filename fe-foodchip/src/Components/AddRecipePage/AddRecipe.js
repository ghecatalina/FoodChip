import { Autocomplete, Button, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import FileBase from 'react-file-base64';
import api from "../../Services/api";
import { Box } from "@mui/system";

const AddRecipe = () => {
    const [formData, setFormData] = useState({name: '', description: '', status: 'accepted', categoryId: 0, ingredients: {}, coverImage: ''});
    const [categories, setCategories] = useState(null);
    const [ingredients, setIngredients] = useState(null);
    const [ingredientsQuantity, setIngredientsQuantity] = useState({name: '', quantity: 0});
    const quanInput = React.useRef(null);

    useEffect(() => {
        api.get('Category')
        .then(response => {
            setCategories(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        api.get('Ingredient')
        .then(response => {
            setIngredients(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);

    const handleAddIngredientQuantity = () => {
        const obj = formData.ingredients;
        obj[String(ingredientsQuantity.name)] = ingredientsQuantity.quantity;
        //const ingred = formData.ingredients.concat(obj);
        setFormData({...formData, ingredients: obj});
        quanInput.current.value = "";
    }

    const handleSubmit = () => {
        console.log(formData);

        api.post('Recipe', formData)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <>
        {categories && ingredients &&
        <>
        <NavBar />
        <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh', marginTop: 40}}>
            <Grid item xs={12}>
                <Paper style={{maxWidth: 500, padding: '20px'}} elevation={5}>
                    <Grid container rowSpacing={3} alignItems="center">
                        <Grid item xs={12} align="center">
                            <Typography variant="h5">Add a recipe</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <div>
                                <Typography variant="subtitle2">Choose recipe photo</Typography>
                                <FileBase type="file" multiple={false} onDone={({ base64 }) => setFormData({ ...formData, coverImage: base64 })} />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="name" label="Name" fullWidth variant="standard" onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="description" multiline minRows={5} label="Description" fullWidth variant="standard" onChange={(e) => setFormData({...formData, description: e.target.value})}/>
                        </Grid>
                        <Grid item xs={12}>
                        <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={categories}
                        sx={{ width: 200 }}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => setFormData({...formData, categoryId: newValue.id})}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                {option.name}
                            </Box>
                        )} 
                        renderInput={(params) => 
                            <TextField
                            {...params}
                            label="Choose a category"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                            />
                        }
                        />
                        </Grid>
                        <Grid item container xs={12} spacing={2}>
                            <Grid item xs={6}>
                                <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={ingredients}
                                sx={{ width: 200 }}
                                getOptionLabel={(option) => option.ingredientName}
                                onChange={(event, newValue) => setIngredientsQuantity({...ingredientsQuantity, name: newValue.ingredientName})}
                                renderOption={(props, option) => (
                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                        {option.ingredientName}
                                    </Box>
                                )} 
                                renderInput={(params) => 
                                    <TextField
                                    {...params}
                                    label="Choose an ingredient"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                    />
                                }
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                style={{width: 120}}
                                inputRef={quanInput}
                                label="Quantity"
                                id="outlined-start-adornment"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">g</InputAdornment>,
                                }}
                                onChange={(e) => setIngredientsQuantity({...ingredientsQuantity, quantity: Number(e.target.value)})}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton onClick={handleAddIngredientQuantity}>Add</IconButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
        </>}
        </>
    );
}

export default AddRecipe;