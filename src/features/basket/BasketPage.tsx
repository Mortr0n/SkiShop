import { Delete } from "@mui/icons-material";
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useStoreContext } from "../../app/context/StoreContext";
import { BasketItem } from "../../app/models/basket";


const BasketPage = () => {
    const { basket } = useStoreContext();
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
    
    if (!basket) return <Typography variant="h3">Your basket is empty</Typography>

    return(
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
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
                            <TableCell align="right">{basketItem.quantity }</TableCell>
                            <TableCell align="right">{(basketItem.price/ 100 * basketItem.quantity).toFixed(2)}</TableCell>
                            <TableCell align="right">
                                <IconButton color='error'>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BasketPage;