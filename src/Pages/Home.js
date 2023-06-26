import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { app } from '../auth'
const Home = () => {
    const [user, setUser] = useState("");
    const auth = getAuth();
    const navigate = useNavigate();
    console.log("Auth", auth);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {

                const uid = user.uid;
                console.log("UID", user);
                setUser(user);

            } else {

            }
        });
    }, [])

    const logout = () => {

        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("SignOut successfully")
        }).catch((error) => {
            // An error happened.
        });
        navigate("/login");
    }
    const doLogin = () => {
        navigate("/login");
    }

    return (
        <div className="home">
            {
                user.email ?
                    <div>
                        <Typography component="h1" variant="h5">
                            {user.email}, You are logged In
                        </Typography><br />
                        <Typography component="h1" variant="h6">
                            Select button to logout
                        </Typography>
                        <Button
                            type="button"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => logout()}
                        >
                            Logout
                        </Button>
                       
                    </div>
                    :
                    <div>

                        <Typography component="h2" variant="h6">
                            You are not logged In. Do Login or Signup.
                        </Typography><br />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    type="button"

                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    type="button"

                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => navigate("/signup")}
                                >
                                    Signup
                                </Button>
                            </Grid>
                        </Grid>
                    </div>


            }

        </div>
    );
}

export default Home;