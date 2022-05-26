import { AppBar, Button, Container, Grid, IconButton, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../Images/logo2.png';
import '@fontsource/roboto/400.css';

const NavBar = () => {
    const userRole = localStorage.getItem('role');
    const pathname = window.location.pathname;
    console.log(pathname);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }

    return(
    <>
        <AppBar position="static" style={{background: 'none', boxShadow: "none"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Grid container>
                        <Grid item xs={6}>
                        <NavLink to="/browse" style={{color: "white", textDecoration: "none"}}>
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
                    {userRole==='regular' && <Button variant="text" onClick={(e) => navigate('/favourites')} style={pathname === '/favourites' ? {fontWeight: 700, color: 'black' , width: 200, textDecoration: 'none'} : { color: 'black', width: 200, textDecoration: 'none'}}>Favourites</Button>}
                    {userRole && <Button variant="text" onClick={(e) => navigate('/addrecipe')} style={pathname === '/addrecipe' ? {fontWeight: 700, color: 'black' , width: 200, textDecoration: 'none'} : { color: 'black', width: 200,textDecoration: 'none'}}>{userRole==='admin' ? 'Add recipe' : 'Request recipe'}</Button>}
                    <Button variant="text" onClick={(e) => navigate('/browse')} style={pathname === '/browse' ? {fontWeight: 700, color: 'black' , width: 200, textDecoration: 'none'} : { color: 'black', width: 200,textDecoration: 'none'}}>Browse</Button>
                    <Button variant="text" onClick={(e) => navigate('/search')} style={pathname === '/search' ? {fontWeight: 700, color: 'black' , width: 350, textDecoration: 'none'} : { color: 'black', width: 350, textDecoration: 'none'}}>Search Your Ingredients</Button>
                    {userRole && <Button variant="text" style={{color: 'black' }} onClick={handleLogout}>Logout</Button>}
                </Toolbar>
            </Container>
        </AppBar>
    </>
    );
}

export default NavBar;