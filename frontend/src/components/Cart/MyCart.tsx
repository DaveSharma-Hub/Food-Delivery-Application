import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
            <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{ width:'100%', textAlign:'center', display: { cursor:'pointer', xs: 'none', sm: 'block', color:'black', fontWeight:'serif', fontFamily:'sans-serif',textShadow: '0.5px 0 0 #000, 0 -0.5px 0 #000, 0 0.5px 0 #000, -0.5px 0 0 #000' } }}
            >
                My Cart
            </Typography>
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