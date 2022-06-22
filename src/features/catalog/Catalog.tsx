import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import LoadingComponent from '../../layout/LoadingComponent';
import { fetchProductsAsync, productSelectors } from './catalogSlice';
import ProductList from './ProductList';



const Catalog = () => {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, status } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    if(status.includes('pending')) return <LoadingComponent message='Finding Products'/>

    return(
        <>
            <ProductList products={products} />
        </>
    )
}

export default Catalog;