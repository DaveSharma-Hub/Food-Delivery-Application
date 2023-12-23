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
import {useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import { CartStoreContext } from '../../utils/CartStoreContextProvider';
import { Button } from '@mui/material';

type MenuItemCardType = {
    id:string
    name:string
    foodLogo:string
    price: string
    restaurantName: string
}

export default function MenuItemCard({id,name,foodLogo, price, restaurantName}:MenuItemCardType){
    const { getCartItems, removeItem, addToCart } = useContext(CartStoreContext);

    const history = useNavigate();
    const handleClickAddToCart = () => {
        // history(`/restaurant?name=${name}&id=${id}`);
        addToCart(name, Number.parseInt(price),1, restaurantName);
    }

    return(
    <Card sx={{ maxWidth: 345, boxShadow: 1, borderRadius:'16px', cursor:'pointer' }}>
      <CardHeader
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
        {/* <Typography variant="body2" color="text.secondary">
          {description}
        </Typography> */}
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <Button onClick={handleClickAddToCart}>Add To Cart</Button>
        </CardActions>
    </Card>
    )
}





