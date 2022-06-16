import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { BasketItem } from "../../app/models/basket";
import BasketSummary from "./BasketSummary";


const BasketPage = () => {
    const { basket, setBasket, removeItem } = useStoreContext();
    const [ status, setStatus ] = useState({
        loading: false,
        name: ''
    });
    // these next commented lines are no longer needed due to setting up the StoreContext.
    // const [ loading, setLoading ] = useState(true);
    // const [ basket, setBasket ] = useState<Basket | null>(null);
    // useEffect(() => {
    //     agent.Basket.get()
    //         .then((basket) => setBasket(basket))
    //         .catch((err) => console.log("Error getting basket", err))
    //         .finally(() => setLoading(false));
    // }, [])
    // if (loading) return <LoadingComponent message="Fetching your basket" />
    
    const handleAddItem = (productId: number, name: string) => {
        setStatus({loading: true, name});
        agent.Basket.addItem(productId)
            .then((basket) => setBasket(basket))
            .catch((err) => console.log("There was an error adding an item to the basket", err))
            .finally(() => setStatus({loading: false, name: ''}));
    }

    const handleRemoveItem = (productId: number, quantity = 1, name: string) => {
        setStatus({loading: true, name});
        agent.Basket.removeItem(productId, quantity)
            .then(() => removeItem(productId, quantity))
            .catch((err) => console.log("There was an error removing an item from the basket", err))
            .finally(() => setStatus({loading: false, name: ''}));
    }

    if (!basket) return <Typography variant="h3">Your basket is empty</Typography>

    return(
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            basket?.items !== null && basket?.items !== undefined &&
                            basket?.items.map((basketItem: BasketItem) => (
                            <TableRow
                                key={basketItem.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="basketItem">
                                    <Box display='flex' alignItems='center'>
                                        <img src={basketItem.pictureUrl} alt={basketItem.name} style={{height: 50, marginRight: 20}} />
                                        <span>{basketItem.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{(basketItem.price/ 100).toFixed(2) }</TableCell>
                                <TableCell align="center">
                                    <LoadingButton 
                                        loading={status.loading && status.name === 'rem' + basketItem.productId } 
                                        onClick={() => handleRemoveItem(basketItem.productId, 1, 'rem' + basketItem.productId)} 
                                        color='error'
                                    >
                                        <Remove />
                                    </LoadingButton>
                                    {basketItem.quantity }
                                    <LoadingButton 
                                        loading={status.loading && status.name === 'add' + basketItem.productId } 
                                        onClick={() => handleAddItem(basketItem.productId, 'add' + basketItem.productId)} 
                                        color='secondary'
                                    >
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">{(basketItem.price/ 100 * basketItem.quantity).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton 
                                        loading={status.loading && status.name === 'del' + basketItem.productId} 
                                        onClick={() => handleRemoveItem(basketItem.productId, basketItem.quantity, 'del' + basketItem.productId)} 
                                        color='error'
                                    >
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <BasketSummary />
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <Button
                    component={Link}
                    to='/checkout'
                    variant="contained"
                    size='large'
                    fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
            
        </>
    )
}

export default BasketPage;