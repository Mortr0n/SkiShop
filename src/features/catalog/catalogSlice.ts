import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { MetaData } from "../../app/models/pagination";
import { IProduct, ProductParams } from '../../app/models/product';
import { RootState } from "../../app/store/configureStore";

interface CatalogState {
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    brands: string[];
    types: string[];
    productParams: ProductParams;
    metaData: MetaData | null;
}

const productsAdapter = createEntityAdapter<IProduct>();

function getAxiosParams(productParams: ProductParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    params.append('orderBy', productParams.orderBy.toString());
    if(productParams.searchTerm) params.append('searchTerm', productParams.searchTerm);
    if(productParams.brands.length > 0) params.append('brands', productParams.brands.toString())
    if(productParams.types.length > 0) params.append('types', productParams.types.toString())
    return params;
}

export const fetchProductsAsync = createAsyncThunk<IProduct[], void, {state: RootState}>(
    'catalog/fetchProductsAsync',
    // thunkAPI has to be the second argument.  inorder to have a blank argument the _ can be used.
    // Then we have access to the thunkAPI for error handling in this case
    async (_, thunkAPI ) => {
        const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
        try{
            const response = await agent.Catalog.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items;
        } catch(err: any) {
            // see note on fetchProduct for this error info
            return thunkAPI.rejectWithValue({error: err.data});
        }
    }
)

export const fetchProductAsync = createAsyncThunk<IProduct, number>(
    'catalog/fetchProductAsync',
    async (productId, thunkAPI) => {
        try{
            return await agent.Catalog.details(productId);
        } catch(err: any) {
            // this async function is an inner function and we need to return out the 
            // error using the thunkAPI in order to have the proper error handling from the asyncThunk
            return thunkAPI.rejectWithValue({error: err.data});
        }
    }
)

export const fetchFilters = createAsyncThunk(
    'catalog/fetchFilters',
    async(_, thunkAPI) => {
        try {
            return agent.Catalog.fetchFilters();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

const initParams = () => {
    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: 'name',
        brands: [],
        types: []
    }
}

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        brands: [],
        types: [],
        productParams: initParams(),
        metaData: null,
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {...state.productParams, ...action.payload, pageNumber: 1};
        },
        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {...state.productParams, ...action.payload};
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        resetProductParams: (state) => {
            state.productParams = initParams();
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            console.log("Rejected Fetch ProductS", action);
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct';
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            console.log("Rejected Fetch Prodct", action);
            state.status = 'idle';
        });
        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingFetchFilters';
        });
        builder.addCase(fetchFilters.fulfilled, (state, action) =>  {
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.filtersLoaded = true;
        });
        builder.addCase(fetchFilters.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
    })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);

export const { setProductParams, resetProductParams, setMetaData, setPageNumber } = catalogSlice.actions;