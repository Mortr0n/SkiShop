import { debounce, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";


const ProductSearch = () => {
    const { productParams } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);

    const debouncedSearch = useMemo(
        () => 
            debounce((e: any) => {
            dispatch(setProductParams({searchTerm: e.target.value}));
        }, 1000),
        [dispatch]
    );

    return(
        <TextField
            label='Search Products'
            variant='outlined'
            fullWidth
            value={searchTerm || ''}
            onChange={(e: any) => {
                setSearchTerm(e.target.value);
                debouncedSearch(e);
            }}
        />
    )
}

export default ProductSearch;