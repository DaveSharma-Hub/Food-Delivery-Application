import { createContext, useReducer } from "react";
import usePostCustomerCart from "../mutations/customers/usePostCustomerCart";

type myCartType = {
    items: any[],
    totalPrice: number
}

export const CartStoreContext = createContext({
    getCartItems: ():myCartType => ({items:[], totalPrice:0}),
    removeItem: (...params: any) => {},
    addToCart: (...params: any) => {},
    clearItems: (...params:any) => {}
});

export default function CartStoreContextProvider({children}:{children:any}){
    const init: myCartType = {
        items:[],
        totalPrice:0
    };
    const [cartStore, cartStoreDispatcher] = useReducer(taskReducer,init);
    const [ postCustomerCart, {data,loading, error} ] = usePostCustomerCart();
    const id = localStorage.getItem('id');

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
                
                postCustomerCart({
                    variables:{
                        cartInput:{
                            cart:cartStore?.items,
                            customerId:id
                        }
                    }
                })
                .then()
                .catch((e)=>{
                    console.log(e);
                })
                
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
            case "CLEAR_ITEMS":
                return {
                    items:[],
                    totalPrice:0
                }
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

    const getCartItems = ():myCartType => {
        return {
            items:cartStore?.items,
            totalPrice: cartStore?.totalPrice
        };
    }

    const clearItems = () => {
        cartStoreDispatcher({
            type:"CLEAR_ITEMS"
        })
    }

    return(
        <CartStoreContext.Provider 
            value={{
                getCartItems:getCartItems,
                removeItem: removeItem,
                addToCart: addToCart,
                clearItems: clearItems
            }}
        >
            {children}
        </CartStoreContext.Provider>
    )
}
