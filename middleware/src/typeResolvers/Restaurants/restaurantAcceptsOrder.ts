import 'dotenv/config';
// import status from '../../status/status';

const url = process.env.DATABASE_LAYER_ENDPOINT;


export default async function restaurantAcceptsOrder(parent, args, contextValue, info){
    try{
        const { orderId, timeToCompleteOrder } = args;
        const endpoint = 'postRestaurantAcceptsOrder'
        const {data} = await contextValue.post(url, endpoint, {orderId:orderId, timeToCompleteOrder:timeToCompleteOrder});
    
        contextValue.pubsub.publish(`${orderId}_CUSTOMER`,{
            CustomerOrderDetails:{
                ...data
            }
        });

        

        return 'RESTAURANT_ACCEPTS';
        
    }catch(e){
        return 'RESTAURANT_FAILED';
    }
}