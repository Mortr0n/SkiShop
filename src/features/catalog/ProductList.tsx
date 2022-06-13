import { Grid } from "@mui/material";
import { IProduct } from "../../models/product";
import ProductCard from "./ProductCard";

interface IProps {
    products: IProduct[];
}

const ProductList = (props: IProps) => {
    const { products } = props;

    return(
        <Grid container spacing={4}>
        {
            products.map((product: IProduct) => {
                return(
                    <Grid item xs={3} key={product.id}>                        
                        <ProductCard product={product} />
                    </Grid>
                )
            })
            }
        </Grid>
    )
}

export default ProductList;