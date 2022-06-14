import { Paper, Container, Typography, Divider, Button } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";


const ServerError = () => {
    const history = useHistory();
    const { state } = useLocation<any>();

    return(
        <Container sx={{padding: "10px"}}  component={Paper}>
            { state?.error ? (
                <>
                    <Typography variant="h3" color="error" gutterBottom>{state.error.title}</Typography>
                    <Divider />
                    <Typography>{state.error.detail || 'Internal Server Error'}</Typography>
                </>
            ): (
                <Typography variant="h5" gutterBottom>Server Error</Typography>
            )}
            <Button variant="contained" onClick={() => history.push('/catalog')}>Go back to the catalog</Button>
        </Container>
    )
}

export default ServerError;