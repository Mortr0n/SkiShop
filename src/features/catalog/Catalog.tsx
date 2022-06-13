import axios from 'axios';
import { useState, useEffect } from 'react';
import { IProduct } from '../../models/product'
import ProductList from './ProductList';



const Catalog = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    
        useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then((res) => {
            console.log("Products Get", res.data)
            setProducts(res.data);
            })
            .catch((err) => {
            console.log("Products Get Error")
            })
        }, [])

    return(
        <>
            <ProductList products={products} />
        </>
    )
}

export default Catalog;