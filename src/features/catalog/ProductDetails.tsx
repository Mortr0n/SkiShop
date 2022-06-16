import { SettingsBackupRestoreTwoTone } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import NotFound from "../../app/errors/NotFound";
import { IProduct } from '../../app/models/product';
import LoadingComponent from "../../layout/LoadingComponent";


const ProductDetails = () => {
    const { id } = useParams<{id: string | undefined}>();
    const { basket, setBasket, removeItem } = useStoreContext();
    const [product, setProduct] = useState<IProduct>();
    const [loading, setLoading] = useState(true);
    const [ quantity, setQuantity ] = useState(0);
    const [ submitting, setSubmitting] = useState(false);
    const item = basket?.items?.find(item => item.productId === Number(id));

    useEffect(() => {
        item && setQuantity(item.quantity);
        agent.Catalog.details(Number(id))
            .then(product => {
                setProduct(product);
                console.log("Product is ", product);
            })
            .catch((err) =>  console.log("Error getting product", err))
            .finally(() => setLoading(false));
    }, [id, item])

    const handleInputChange = (event: any) => {
        event.target.value >= 0 && setQuantity(parseInt(event.target.value));
    }

    const handleUpdateCart = () => {
        setSubmitting(true);
        if(!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            agent.Basket.addItem(Number(id), updatedQuantity)
                .then((basket) => setBasket(basket))
                .catch((err) => console.log("Error adding to basket", err))
                .finally(() =>  setSubmitting(false));
        } else if(quantity < item.quantity) {
            const updatedQuantity = item.quantity - quantity; 
            agent.Basket.removeItem(Number(id), updatedQuantity)
                .then(() => removeItem(Number(id), updatedQuantity))
                .catch((err) => console.log("Error with removing quantity from item", err))
                .finally(() => setSubmitting(false));
        } else {
            console.log("The update quantity button should not have been enabled");
            setSubmitting(false);
        }
    }

    if (loading) return <LoadingComponent message="Grabbing your product from the back" />

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
                            disabled={item?.quantity === quantity || !item && quantity === 0 }
                            loading={submitting}
                            onClick={() => handleUpdateCart()}
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