import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Basket } from "../../app/models/basket";
import { getCookie } from "../../app/util/util";

interface BasketState {
    basket: Basket | null;
    status: string
}

const initialState: BasketState = {
    basket: null,
    status: 'idle'
}

export const fetchBasketAsync = createAsyncThunk<Basket>(
    'basket/fetchBasketAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Basket.get();
        } catch (err: any) {
            return thunkAPI.rejectWithValue({error: err.data});
        }
    },
    {
        condition: () => {
            if(!getCookie('buyerId')) return false;
        }
    }
)

export const addBasketItemAsync = createAsyncThunk<Basket, {productId: number, quantity?: number}>(
    'basket/addBasketItemAsync',
    async({productId, quantity = 1}, thunkAPI) => {
        try {
            return await agent.Basket.addItem(productId, quantity);
        } catch (err: any) {
            return thunkAPI.rejectWithValue({error: err.data});
        }
    }
)

export const removeBasketItemAsync = createAsyncThunk<void, {productId: number, quantity: number, name?: string}>(
    'basket/removeBasketItemAsync',
    async ({productId, quantity}, thunkAPI)  => {
        try{
            await agent.Basket.removeItem(productId, quantity);
        } catch(err: any) {
            return thunkAPI.rejectWithValue({error: err.data})
        }
    }
)

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload
        },
        clearBasket: (state) => {
            state.basket = null;
        }
    },
    extraReducers: (builder => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingAddItem' + action.meta.arg.productId;
        });
        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.productId + action.meta.arg.name;
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const { productId, quantity } = action.meta.arg;
            //@ts-ignore
            const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);
            // ignoring line after this because this line checks for if it's undefined
            if(itemIndex === -1 || itemIndex === undefined) return;
            if(state.basket?.items !== null && state.basket?.items !== undefined){
                state.basket.items[itemIndex].quantity -= quantity;
            }
            //@ts-ignore
            if(state.basket?.items[itemIndex].quantity === 0) state.basket.items.splice(itemIndex, 1);
            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload)
        });
        builder.addMatcher(isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled), (state, action) => {
            state.basket = action.payload;
            state.status = 'idle';
        });
        builder.addMatcher(isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.rejected), (state, action) => {
            state.status = 'idle';
            console.log(action.payload)
        });
    })
})

export const { setBasket, clearBasket } = basketSlice.actions; 