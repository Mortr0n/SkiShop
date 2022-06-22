import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BasketItem } from "../../app/models/basket";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import BasketSummary from "./BasketSummary";


const BasketPage = () => {
    const { basket, status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

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
                                        loading={status === 'pendingRemoveItem' + basketItem.productId + 'rem' } 
                                        onClick={() => dispatch(removeBasketItemAsync({
                                            productId: basketItem.productId, 
                                            quantity: 1,
                                            name: 'rem'                                            
                                        }))} 
                                        color='error'
                                    >
                                        <Remove />
                                    </LoadingButton>
                                    {basketItem.quantity }
                                    <LoadingButton 
                                        loading={status === 'pendingAddItem' + basketItem.productId } 
                                        onClick={() => dispatch(addBasketItemAsync({productId: basketItem.productId}))} 
                                        color='secondary'
                                    >
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">{(basketItem.price/ 100 * basketItem.quantity).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton 
                                        loading={status === 'pendingRemoveItem' + basketItem.productId + 'del' } 
                                        onClick={() => dispatch(removeBasketItemAsync({
                                            productId: basketItem.productId, 
                                            quantity: basketItem.quantity, name: 'del'
                                        })) } 
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