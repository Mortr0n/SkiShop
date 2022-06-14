import { Alert, AlertTitle, Button, ButtonGroup, List, ListItem, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import agent from "../../app/api/agent";


const AboutPage = () => {
    const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

    const getValidationError = () => {
        agent.TestErrors.getValidationError()
            .then(() => {
            console.log("Shouldn't see this because error" );
            })
            .catch((err) => {
                setValidationErrors(err);
            })
    }

    return(
        <Container>
            <Typography gutterBottom variant='h2'>Errors for testing purposes</Typography>
            <ButtonGroup fullWidth>
                <Button variant='contained' onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>Test 400 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>Test 401 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>Test 404 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>Test 500 Error</Button>
                <Button variant='contained' onClick={getValidationError}>Test Validation Error</Button>
            </ButtonGroup>
            {validationErrors.length > 0 &&
                <Alert severity="error" >
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {
                            validationErrors.map((error) => {
                                return(
                                    <ListItem key={error}>{error}</ListItem>
                                )                                
                            })
                        }
                    </List>
                </Alert>
            }
        </Container>    
    )
}

export default AboutPage;