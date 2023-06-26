import { useState } from 'react';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Firebase from './__test__/firebase';

const theme = createTheme();
const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const handleSubmit = (flag,event) => {
        // 👇️ prevent page refresh

        console.log("flag",flag)
        // event.preventDefault();

        const auth = getAuth();
        // const auth = Firebase.auth();
        if (flag) {
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);

                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    console.log("user", user);
                    navigate("/");

                    // ...
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("error", error)
                    // ...
                });
        }
        else {
            signInWithEmailAndPassword(auth, email, pass)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log("Login SignIn successful");
                    console.log(user);
                    navigate("/");
                    // ...
                })
                .catch((error) => {
                    // const errorCode = error.code;
                    // const errorMessage = error.message;
                    // if(email==""&& pass=="")
                    // setError("Please Enter email id and password");
                    // else if(email=="")
                    // setError("Please Enter email id");
                    // else if(pass=="")
                    // setError("Please Enter password");
                    // else
                    // setError("User does not exist. Please enter valid credentials");

                    console.log("User does not exist");
                    console.log("error", error)
                });
        }
        setTimeout(()=>{
            setError("")
        },5000)
        // console.log('form submitted ✅');
        // console.log("email", email);
        // console.log("pass", pass);

    };

    return (
        <>
            {/* <p className="title">Login Form</p>

            <div className="App" >
                <input type="email" placeholder="email" name="" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={pass} onChange={(e) => setPass(e.target.value)} />
                <button style={{ backgroundColor: "#a1eafb" }} onClick={() => handleSubmit(false)}>Submit</button>
                <button style={{ backgroundColor: "#a1eafb" }} onClick={() => handleSubmit(true)}>SignInWithGoogle</button>
            </div> */}

            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            {/* <LockOutlinedIcon /> */}
                        </Avatar>
                        <h4 style={{color:"red"}}>{error}</h4>
                        <Typography component="h1" variant="h5">
                            Log In
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={pass} onChange={(e) => setPass(e.target.value)}
                                    />
                                </Grid>

                            </Grid>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => handleSubmit(false)}
                                data-testid="login-1"
                            >
                                Login
                            </Button>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => handleSubmit(true)}
                            >
                                Sign in with Google
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        Dont have a account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                </Container>
            </ThemeProvider>
        </>
    );
};

export default Login;

