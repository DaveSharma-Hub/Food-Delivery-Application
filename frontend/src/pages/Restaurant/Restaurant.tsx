import MenuItemCard from "../../components/Card/MenuItemCard";
import useGetRestaurantMenu from "../../queries/restaurants/useGetRestaurantMenu"
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../Home/Header/Header";
import { Box, Button, Typography } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { CartStoreContext } from "../../utils/CartStoreContextProvider";

type MenuItemsInputType = {
    id:string
    name:string
    price: string
}

type DataInputType = {
    name: string,
    price: number,
    frequency: number,
    restaurantName: string
}

type ModalInputType = {
    isOpen:boolean,
    data:DataInputType
}

export default function Restaurant({}){
    const { getCartItems, addToCart } = useContext(CartStoreContext);
    const history = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const restaurantId: string | null = searchParams.get('id');
    const restaurantName: string | null = searchParams.get('name');
    const initModalData:ModalInputType = {
        isOpen:false,
        data:{
            name:'',
            price:0,
            frequency:0,
            restaurantName:''
        }
    }
    const [openModal, setOpenModal] = useState<ModalInputType>(initModalData);

    if(!restaurantId){
        history('/home');
    }

    const {loading, error, data} = useGetRestaurantMenu(restaurantId!);

    if(error) return <h1>Error</h1>
    if(loading) return <h1>Loading...</h1>

    const handleToggleModalCart = (data:DataInputType) => {
        setOpenModal({
            isOpen:true,
            data:data
        });
    }

    const handleAddFrequency = () => {
        const obj:ModalInputType = {
           ...openModal
        };
        obj.data.frequency = obj.data.frequency+1;
        setOpenModal(obj);
    }
    const handleRemoveFrequency = () => {
        const obj:ModalInputType = {
           ...openModal
        };
        obj.data.frequency = obj.data.frequency-1;
        setOpenModal(obj);
    }

    const handleAddToCart = () => {
        // history(`/restaurant?name=${name}&id=${id}`);
        const {
            name,
            price,
            frequency,
            restaurantName
        } = openModal.data;
        addToCart(name, price,frequency, restaurantName);
        setOpenModal(initModalData);
    }
    return(
        <div>
            <div>
                <Header/>
                <div>
                    <div className="w-full mt-20 mx-auto py-2.5">
                    <Typography sx={{textAlign:'center'}}>
                        {restaurantName}
                    </Typography>
                    </div>
                    <div className="grid grid-cols-3 gap-3 w-4/5 content-evenly mx-auto">
                        {
                            data?.getRestaurantMenu?.menuOrderIds?.map(({id, name, price}:MenuItemsInputType)=>{
                                return(
                                    <MenuItemCard
                                        id={id}
                                        name={name}
                                        foodLogo="https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg"
                                        price={price}
                                        restaurantName={restaurantName!}
                                        handleToggleModalCart={handleToggleModalCart}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                {
                    openModal.isOpen ?
                    <div style={{width:'35%', height:'25%', zIndex:'5', top:'20%',left:'32.5%',position:'fixed', backgroundColor:'blue', borderRadius:'10px 10px' }}>
                        <Box>
                            <Button onClick={handleAddFrequency}>
                                +
                            </Button>
                            <Button onClick={handleRemoveFrequency}>
                                -
                            </Button>
                            <Button onClick={handleAddToCart}>Add</Button>
                        </Box>
                    </div>
                    : null
                }
            </div>
        </div>
    )
}