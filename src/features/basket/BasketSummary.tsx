import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useStoreContext } from "../../app/context/StoreContext";
import { BasketItem } from "../../app/models/basket";
import { currencyFormat } from "../../app/util/util";



const BasketSummary = () =>  {
    const { basket } = useStoreContext();    
    // using reducer to get the sum total of items prices
    const subTotal = (basket?.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0 ) ?? 0);
    const deliveryFee = (subTotal >= 10000 || subTotal <= 0) ? 0 : 1400;

    return (
        <Grid container>
            <Grid item xs={6} />
            <Grid item xs={6}>
                <TableContainer component={Paper} variant={'outlined'}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={2}>Subtotal</TableCell>
                                <TableCell align="right">{currencyFormat(subTotal)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>Delivery fee*</TableCell>
                                <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>Total</TableCell>
                                <TableCell align="right">{currencyFormat(subTotal + deliveryFee)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}
export default BasketSummary;