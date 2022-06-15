import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export const useStoreContext = () => {
    const context = useContext(StoreContext);

    if(context === undefined) {
        throw Error("Oops we don't seem to be in the provider");
    }

    return context;
} 

export const StoreProvider = ({children}: PropsWithChildren<any>) => {
    const [ basket, setBasket ] = useState<Basket | null>(null);

    const removeItem = (productId: number, quantity: number) => {
        if(!basket) return;
        // had to add the !== null and undefined as it kept saying that basket.items isn't an array.
        let items: any;
        if(basket.items !== null && basket.items !== undefined){
            items = [...basket.items]
        }
        const itemIndex = items?.findIndex((i: { productId: number; }) => i.productId === productId);
        if(itemIndex !== undefined && itemIndex >= 0){
            if(items !== undefined){
                items[itemIndex].quantity -= quantity;
                if(items[itemIndex].quantity <= 0) items.splice(itemIndex, 1);
                setBasket(prevState => {
                    return {...prevState!, items}
                })
            }
        }
    }   

    return(
        <StoreContext.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}