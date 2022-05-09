import { Grid, TextField, Button, Paper, Typography } from "@mui/material";
import library from '../../Images/logIn.jpg';
import './Register.css';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();

    const goToSignIn = () => {
        navigate('/signin');
    } 

    return (
            <Grid container style={{
                minWidth: "100%",
                height: "100vh",
              }}>
                <Grid item xs={0} sm={5} md={5} lg={5} xl={5}>
                    <img src={library} alt="" style={{backgroundSize: 'contain', backgroundRepeat: 'no-repeat', width:'100%', height: '100vh'}}/>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                    <Paper class="paper" style={{width: '350px'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Welcome</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5">Create your account</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField name="email" type="text" label="Email" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField name="name" type="text" label="Name" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField name="password" type="password" label="Password" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField name="confirmPassword" type="password" label="Confirm Password" fullWidth/>
                            </Grid>
                            <Grid item xs={12} display="flex" justifyContent="flex-end">
                                <Button variant="text" size="small" onClick={goToSignIn}>Already have an account? Sign In</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" class="registerButton">Register</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
    );
}