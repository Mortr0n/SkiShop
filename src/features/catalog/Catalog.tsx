import { useState, useEffect } from 'react';
import agent from '../../app/api/agent';
import { IProduct } from '../../app/models/product'
import LoadingComponent from '../../layout/LoadingComponent';
import ProductList from './ProductList';



const Catalog = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    
        useEffect(() => {
            agent.Catalog.list()
                .then(products => setProducts(products))
                .catch((err) => console.log("Error in getting products", err))
                .finally(() => setLoading(false));
        }, [])

        if(loading) return <LoadingComponent message='Finding Products'/>

    return(
        <>
            <ProductList products={products} />
        </>
    )
}

export default Catalog;