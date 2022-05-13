import { Autocomplete, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import FileBase from 'react-file-base64';
import api from "../../Services/api";
import { Box } from "@mui/system";

const AddRecipe = () => {
    const [formData, setFormData] = useState({name: '', description: '', status: 'accepted', categoryId: 0, ingredients: []});
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        api.get('Category')
        .then(response => {
            setCategories(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(e.target.value);
        console.log(formData);
    }

    return (
        <>
        {categories &&
        <>
        <NavBar />
        <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}>
            <Grid item xs={12}>
                <Paper style={{width: '400px', padding: '20px'}} elevation={5}>
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
                            <TextField name="name" label="Name" fullWidth variant="standard" onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="description" multiline minRows={5} label="Description" fullWidth variant="standard" onChange={handleChange}/>
                        </Grid>
                        <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={categories}
                        sx={{ width: 300 }}
                        getOptionLabel={(option) => option.name}
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
                        <Grid item xs={12} align="center">
                            <Button variant="contained">Submit</Button>
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