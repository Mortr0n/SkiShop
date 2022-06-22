import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { IProduct } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface IProps {
    product: IProduct;
}

const ProductCard = (props: IProps) => {
    const { product } = props;
    const { status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    return(
        <Card>
            <CardHeader 
                avatar={
                    <Avatar sx={{ bgcolor: 'secondary.main'}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: {fontWeight: 'bold', color: 'primary.main' }
                }}
            />
            <CardMedia
                component="img"
                sx={{ height: 140, objectFit: "contain", bgcolor: 'primary.light'  }}                
                image={product.pictureUrl}
                alt={`Image of ${product.name}`}
            />
            <CardContent>
                <Typography gutterBottom color="secondary" variant="h5" >
                    ${(product.price / 100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton 
                    loading={status.includes(`pendingAddItem${product.id}`)} 
                    onClick={() => dispatch(addBasketItemAsync({productId: product.id}))} 
                    size="small">Add to Cart
                </LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard;