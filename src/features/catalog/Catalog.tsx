import axios from 'axios';
import { useState, useEffect } from 'react';
import agent from '../../app/api/agent';
import { IProduct } from '../../app/models/product'
import ProductList from './ProductList';



const Catalog = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    
        useEffect(() => {
            agent.Catalog.list().then(products => setProducts(products));
        }, [])

    return(
        <>
            <ProductList products={products} />
        </>
    )
}

export default Catalog;