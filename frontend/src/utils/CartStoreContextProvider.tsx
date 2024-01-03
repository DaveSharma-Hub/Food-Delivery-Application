import { createContext, useReducer, useEffect, useState } from "react";
import usePostCustomerCart from "../mutations/customers/usePostCustomerCart";
import useGetCustomerCart from "../queries/customers/useGetCustomerCart";

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
    const id = localStorage.getItem('id');
    const [ postCustomerCart, {data,loading, error} ] = usePostCustomerCart();
    const [cartStore, cartStoreDispatcher] = useReducer(taskReducer,init);
    const [ initialRender ,setInitialRender ] = useState<boolean>(true);
    
    const {data:dataCart, loading:loadingCart, error:errorCart} = useGetCustomerCart(id!, () => {
        if(cartStore?.items.length === 0) {
            cartStoreDispatcher({
                type:"SET_ITEMS",
                items: dataCart.getCustomerCart.cart
            })
        }
    });
   
    // useEffect(() => {
    //     (async()=>{
    //         if(cartStore?.items.length!==0 && !initialRender){
    //             await postCustomerCart({
    //                 variables:{
    //                     cartInput:{
    //                         cart:cartStore?.items,
    //                         customerId:id
    //                     }
    //                 }
    //             });
    //         }else{
    //             setInitialRender(false);
    //         }
    //     })();
    // }, [cartStore?.items.length])


    if(error || errorCart) return <h1>Error</h1>
    if(loading || loadingCart) return <h1>Loading...</h1>


    function taskReducer(tasks:any, action:any){
        switch(action.type){
            case "ADD_ITEM":
                const currentItems = [...tasks.items];
                const { price: priceA, frequency:freqA } = action.item;
                
                const newItemObject = {
                    itemId: String(currentItems.length),
                    ...action.item
                };
                
                currentItems.push(newItemObject);
                const addedPrices = priceA * freqA;
                
                postCustomerCart({
                    variables:{
                        cartInput:{
                            cart:[newItemObject],
                            customerId:id
                        }
                    }
                });

                console.log(newItemObject);
                return {
                    items: currentItems,
                    totalPrice: tasks.totalPrice + addedPrices
                };
                
            case "REMOVE_ITEM":
                const removedItem = tasks.items.filter((i:any)=>i.itemId !== action.id);
                const {price: priceR , frequency: freqR} = tasks.items.find((i:any)=>i.itemId === action.id);
                const updatedPrice = tasks.totalPrice - (priceR * freqR);
                return {
                    items: removedItem,
                    totalPrice: updatedPrice
                };
            case "CLEAR_ITEMS":
                return {
                    items:[],
                    totalPrice:0
                }
            case "SET_ITEMS":
                const items = []; 
                let totalPrice = 0;               
                for(const item of action.items){
                    items.push({
                        name: item.name,
                        price: item.price,
                        frequency: item.frequency,
                        restaurantName: item.restaurantName,
                        itemId: item.itemId
                    });
                    totalPrice += (item.price * item.frequency);
                }
                console.log(items);
                return {
                    items: items,
                    totalPrice: totalPrice
                };
        }
    }   
    
    const addToCart = (menuItemName: String, menuItemPrice: Number, frequency: Number, restaurantName: String) => {
        cartStoreDispatcher({
            type:"ADD_ITEM",
            item: {
                name: menuItemName,
                price: menuItemPrice,
                frequency: frequency,
                restaurantName: restaurantName
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
