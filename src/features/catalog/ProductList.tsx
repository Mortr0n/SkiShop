import { Grid } from "@mui/material";
import { IProduct } from '../../app/models/product'
import { useAppSelector } from "../../app/store/configureStore";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface IProps {
    products: IProduct[];
}

const ProductList = (props: IProps) => {
    const { products } = props;
    const { productsLoaded } = useAppSelector(state => state.catalog);

    return(
        <Grid container spacing={4}>
        {
            products.map((product: IProduct) => {
                return(
                    <Grid item xs={4} key={product.id}>  
                    {!productsLoaded ? 
                        (
                            <ProductCardSkeleton />
                        ) 
                        :
                        (
                            <ProductCard product={product} />
                        )
                    }   
                    </Grid>
                )
            })
            }
        </Grid>
    )
}

export default ProductList;