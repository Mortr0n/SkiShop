import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";


const NotFound = () => {
    return(
        <Container component={Paper} sx={{height: 400}} >
            <Typography gutterBottom variant='h3'>Oops - We couldn't find what you were looking for.</Typography>
            <Divider />
            <Button variant="contained" fullWidth component={Link} to='/catalog'>Go back to the catalog</Button>
        </Container>
    )    
}

export default NotFound;