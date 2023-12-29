import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import { CartStoreContext } from '../../utils/CartStoreContextProvider';
import useGetCustomerCart from '../../queries/customers/useGetCustomerCart';


export function MyCart({toggleDrawer}:{toggleDrawer:any}){
     
    const id = localStorage.getItem('id');

    // const {data, loading, error} = useGetCustomerCart(id!);

    // if(error) return <h1>Error</h1>
    // if(loading) return <h1>Loading...</h1>

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
                myCart?.items?.map(({name,
                    price,
                    frequency,
                    restaurantName})=>{
                    return(
                        <div>
                            {name}
                            {price}
                            x {frequency}
                            {restaurantName}
                        </div>
                    )
                })
            }
          
        </Box>        
    )
}