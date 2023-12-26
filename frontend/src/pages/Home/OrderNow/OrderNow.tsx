import { Box, Button, Typography } from "@mui/material";

export default function OrderNow({}){
    return(
        <div className="w-full mt-20 mx-auto py-2.5">
            <Typography sx={{textAlign:'center'}}>
                Start ordering from your favourite restaurant delivered at your doorstep.
            </Typography>
            <Box sx={{
                margin:'0 auto',
                width:'25%',
                padding:'10px 10px'
                }} >
                <Button variant="outlined" 
                sx={{
                    backgroundColor:'black', 
                    borderRadius:'20px', 
                    color:'white', 
                    width:'100%',
                    '&:hover':{
                        color:'blue',
                        border:'1px solid blue'
                        }
                    }}>
                    Order Now!
                </Button>
            </Box>
        </div>
    )
}