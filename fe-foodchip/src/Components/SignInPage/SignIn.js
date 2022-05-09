import { Grid, TextField, Button, Paper, Typography } from "@mui/material";
import library from '../../Images/logIn.jpg';
import './SignIn.css';
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();

    const goToSignUp = () => {
        navigate('/register');
    } 

    return (
            <Grid container style={{
                minWidth: "100%",
                height: "100vh",
              }}>
                <Grid item xs={0} sm={5} md={5} lg={5} xl={5}>
                    <img src={library} alt="" style={{backgroundSize: 'contain', backgroundRepeat: 'no-repeat', width:'100%', height:'100vh'}}/>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                    <Paper class="paper" style={{width: '50%'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Welcome back</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" class="login">Log in to your account</Typography>
                            </Grid>
                            <Grid item xs={12}></Grid>
                            <Grid item xs={12}></Grid>
                            <Grid item xs={12}>
                                <TextField name="email" type="text" label="Email" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField name="password" type="password" label="Password" fullWidth/>
                            </Grid>
                            <Grid item xs={12} display="flex" justifyContent="flex-end">
                                <Button variant="text" size="small">Forgot password?</Button>
                            </Grid>
                            <Grid item xs={12} display="flex" justifyContent="flex-end">
                                <Button variant="text" size="small" onClick={goToSignUp}>Don't have an account? Register</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" class="loginButton">Log in now</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
    );
}

export default SignIn;