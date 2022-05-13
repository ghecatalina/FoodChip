import { Button, ButtonGroup, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import NavBar from "../NavBar/NavBar";

const BrowsePage = () => {
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

    console.log(categories);

    return(
        <>
        <NavBar />
        <Grid container>
            <Grid item  container xs={6}>
                <ButtonGroup orientation="vertical" style={{background: '#FEA150'}}>
                    {
                        !categories ? <CircularProgress /> :
                        categories.map((category) => {
                            return (
                                <Button style={{color: 'white'}} variant="text">{category.name}</Button>
                            )
                        })
                    }
                </ButtonGroup>
            </Grid>
        </Grid>
        </>
    );
}

export default BrowsePage;