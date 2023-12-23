import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CartStoreContext } from '../../utils/CartStoreContextProvider';
import { useContext } from 'react';

export default function AddToCart({}){
    const { getCartItems, removeItem, addToCart } = useContext(CartStoreContext);

    return(
        <Card sx={{ maxWidth: 345, boxShadow: 1, borderRadius:'16px', cursor:'pointer' }}>
            {/* <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {foodLogo}
                </Avatar>
                }
                title={name}
            />
            <CardMedia
                component="img"
                height="194"
                image={foodLogo}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                Price: ${price}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                <ShareIcon />
                </IconButton>
            </CardActions> */}
        </Card>
    )
}