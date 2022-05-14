import { AppBar, Button, Container, Grid, IconButton, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../../Images/logo2.png';
import '@fontsource/roboto/400.css';

const NavBar = () => {
    const pathname = window.location.pathname;
    console.log(pathname);

    return(
    <>
        <AppBar position="static" style={{background: 'none', boxShadow: "none"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Grid container>
                        <Grid item xs={6}>
                        <NavLink to="" style={{color: "white", textDecoration: "none"}}>
                            <Box sx={{display: 'inline-flex'}}>
                            <IconButton size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            height={50}>
                                <img src={logo} alt="" height={100} />
                            </IconButton>
                            </Box>
                            </NavLink>
                        </Grid>
                    </Grid>
                    <Button variant="text" style={pathname === '/favourites' ? {fontWeight: 700, color: 'black' , width: 200, textDecoration: 'none'} : { color: 'black', width: 200, textDecoration: 'none'}}>Favourites</Button>
                    <Button variant="text" style={pathname === '/browse' ? {fontWeight: 700, color: 'black' , width: 200, textDecoration: 'none'} : { color: 'black', width: 200,textDecoration: 'none'}}>Browse</Button>
                    <Button variant="text" style={pathname === '/search' ? {fontWeight: 700, color: 'black' , width: 350, textDecoration: 'none'} : { color: 'black', width: 350, textDecoration: 'none'}}>Search Your Ingredients</Button>
                </Toolbar>
            </Container>
        </AppBar>
    </>
    );
}

export default NavBar;