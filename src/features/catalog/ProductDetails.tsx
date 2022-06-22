import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import LoadingComponent from "../../layout/LoadingComponent";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";


const ProductDetails = () => {
    const { id } = useParams<{id: string | undefined}>();
    const productId = Number(id);
    const { basket, status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const product = useAppSelector(state => productSelectors.selectById(state, productId));
    const { status : productStatus }  = useAppSelector(state => state.catalog)
    const [ quantity, setQuantity ] = useState(0);
    const item = basket?.items?.find(item => item.productId === Number(id));
    // I wanted the productId to be a number and never be undefined.  This was my way of doing this.
    

    useEffect(() => {
        item && setQuantity(item.quantity);
        if(!product) dispatch(fetchProductAsync(productId));
    }, [id, item, dispatch, product])

    const handleInputChange = (event: any) => {
        event.target.value >= 0 && setQuantity(parseInt(event.target.value));
    }

    const handleUpdateCart = () => {
        if(!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({productId, quantity: updatedQuantity}))
        } else if(quantity < item.quantity) {
            const updatedQuantity = item.quantity - quantity; 
            dispatch(removeBasketItemAsync({productId, quantity: updatedQuantity}))
        } else {
            console.log("The update quantity button should not have been enabled");
        }
    }

    if (productStatus.includes('pending')) return <LoadingComponent message="Grabbing your product from the back" />

    if (!product) return <NotFound />

    return(
        <Grid container spacing={6} >
            <Grid item xs={6} >
                <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{mb: 2}} />
                <Typography variant='h4' color='secondary' > ${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in Stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            type='number'
                            label='Quantity in Cart'
                            fullWidth
                            value={quantity}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={(item?.quantity === quantity) || (!item && (quantity === 0)) }
                            loading={status.includes(`pendingRemoveItem${productId}`)}
                            onClick={handleUpdateCart}
                            sx={{height: '55px'}}
                            color='primary'
                            size="large"
                            variant="contained"
                            fullWidth
                        >
                            {item ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                    
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ProductDetails;