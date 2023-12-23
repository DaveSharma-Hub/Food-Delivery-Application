import { createContext, useReducer } from "react";


export const CartStoreContext = createContext({
    getCartItems: () => {},
    removeItem: (...params: any) => {},
    addToCart: (...params: any) => {}
});

export default function CartStoreContextProvider({children}:{children:any}){
    
    const [cartStore, cartStoreDispatcher] = useReducer(taskReducer,{
        items:[],
        totalPrice:0
    });
    
    function taskReducer(tasks:any, action:any){
        switch(action.type){
            case "ADD_ITEM":
                const currentItems = [...tasks.items];
                const { menuItemPrice, frequency } = action.item;
                currentItems.push({
                    ...action.item,
                    itemId: currentItems.length
                });
                const addedPrices = menuItemPrice * frequency;
                return {
                    items: currentItems,
                    totalPrice: tasks.totalPrice + addedPrices
                };
            case "REMOVE_ITEM":
                const removedItem = tasks.items.filter((i:any)=>i.itemId === action.id);
                const {menuItemPrice: price , frequency: freq} = tasks.items.find((i:any)=>i.itemId === action.id);
                const updatedPrice = tasks.totalPrice - (price * freq);
                return {
                    items: removedItem,
                    totalPrice: updatedPrice
                };
        }
    }   
    
    const addToCart = (menuItemName: String, menuItemPrice: Number, frequency: Number, restaurantName: String) => {
        cartStoreDispatcher({
            type:"ADD_ITEM",
            item: {
                menuItemName,
                menuItemPrice,
                frequency,
                restaurantName
            }
        });
    }

    const removeItem = (menuItemId: String) => {
        cartStoreDispatcher({
            type:"REMOVE_ITEM",
            id: menuItemId
        })
    }

    const getCartItems = () => {
        return cartStore;
    }

    return(
        <CartStoreContext.Provider 
            value={{
                getCartItems:getCartItems,
                removeItem: removeItem,
                addToCart: addToCart
            }}
        >
            {children}
        </CartStoreContext.Provider>
    )
}
