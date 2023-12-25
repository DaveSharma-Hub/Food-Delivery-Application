import Box from '@mui/material/Box';
import { useContext, useState } from 'react';
import { CartStoreContext } from '../../utils/CartStoreContextProvider';


export function MyCart({toggleDrawer}:{toggleDrawer:any}){
    const { getCartItems, removeItem, addToCart } = useContext(CartStoreContext);    
    const [ myCart, setMyCart ] = useState(getCartItems());   

    return (
        <Box
          sx={{ width:250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
            {
                myCart?.items?.map(({menuItemName,
                    menuItemPrice,
                    frequency,
                    restaurantName})=>{
                    return(
                        <div>
                            {menuItemName}
                            {menuItemPrice}
                            x {frequency}
                            {restaurantName}
                        </div>
                    )
                })
            }
          
        </Box>        
    )
}