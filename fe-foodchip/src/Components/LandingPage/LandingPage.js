import { Button } from "@mui/material";
import React from "react";
import './LandingPage.css';
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

export default function LandingPage() {
    const navigate = useNavigate();

    const goToSingIn = () => {
        navigate('/signin');
    }

    const goToRegister = () => {
        navigate('/register');
    }

    return (
        <>
        <div id="wrapper">
            <div class="eclipse"></div>
            <NavBar/>
            <div class="grid">
                <div>
                    <div class="par">
                    What's your eating mood today?
                    </div>
                    <div class="subpar">
                    Have you ever wonder what to cook next? FoodChip is the web application for you. All you have to do is to choose the ingredients from your fridge and be amazed to see the multitude of recipes you can try.
                    </div>
                    <div class="grid">
                        <Button variant="contained" class="register" onClick={goToRegister}>Register</Button>
                        <Button variant="contained" class="signIn" onClick={goToSingIn}>Sign In</Button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}