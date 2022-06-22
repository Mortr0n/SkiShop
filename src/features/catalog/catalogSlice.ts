import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { IProduct } from '../../app/models/product';
import { RootState } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter<IProduct>();

export const fetchProductsAsync = createAsyncThunk<IProduct[]>(
    'catalog/fetchProductsAsync',
    // thunkAPI has to be the second argument.  inorder to have a blank argument the _ can be used.
    // Then we have access to the thunkAPI for error handling in this case
    async (_, thunkAPI ) => {
        try{
            return await agent.Catalog.list();
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

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle'
    }),
    reducers: {},
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
    })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);