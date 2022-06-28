import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";



const theme = createTheme();

const Register = () => {
    const history = useHistory();
    const {register, handleSubmit, setError, formState: {isSubmitting, errors, isValid}} = useForm({
        mode: 'all'
    })

    const handleApiErrors = (errors: any) => {
        if(errors){
            errors.forEach((error: string) => {
                if(error.includes('Password')) {
                    setError('password', {message: error})
                } else if(error.includes('Email')) {
                    setError('email', {message: error})
                } else if(error.includes('Username')){
                    setError('username', {message: error})
                }
            });
        }
        
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component={Paper} maxWidth="sm" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4}}>
                
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box 
                    component="form"
                    onSubmit={handleSubmit((data) => 
                        agent.Account.register(data)
                            .then(() => {
                                toast.success('Registration succesful!  You can now log in.');
                                history.push('/login');
                            })
                            .catch(err =>handleApiErrors(err)))
                    } 
                    noValidate 
                    sx={{ mt: 1 }}   
                >
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Username"
                        autoFocus
                        {...register('username', {required: 'Username is required'})}
                        // double !! casts the errors.username into a boolean
                        error={!!errors.username}
                        //@ts-ignore
                        helperText={errors?.username?.message}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Email address"
                        {...register('email', 
                            {
                                required: 'Email is required',
                                pattern: {
                                    value: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                                    message: 'Not a valid email address'
                                }
                            })}
                        // double !! casts the errors.username into a boolean
                        error={!!errors.email}
                        //@ts-ignore
                        helperText={errors?.email?.message}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        {...register('password', 
                            {
                                required: 'Password is required',
                                pattern: {
                                    value: /(?=^.{8,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                                    message: "Password doesn't meet complexity requirements"
                                }
                            })}
                        error={!!errors.password}
                        //@ts-ignore
                        helperText={errors?.password?.message}
                    />
                    
                    <LoadingButton
                        loading={isSubmitting}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!isValid}
                    >
                    Register
                    </LoadingButton>
                    <Grid container>
                    <Grid item>
                        <Link to='/login'>
                        {"Already have an account? Sign In"}
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
export default Register;