import 'dotenv/config';
import status from '../../status/status.js';

const url = process.env.DATABASE_LAYER_ENDPOINT;


export default async function restaurantCompletesOrder(parent, args, contextValue, info){
    try{
        const { orderId } = args;
        const endpoint = 'postRestaurantCompletesOrder'
        const {data} = await contextValue.post(url, endpoint, {orderId:orderId, status:status.restaurantCompleteOrder});
    
        contextValue.pubsub.publish(`${orderId}_CUSTOMER`,{
            CustomerOrderDetails:{
                ...data
            }
        });
        contextValue.pubsub.publish(`${orderId}_DRIVER`,{
            CustomerOrderDetails:{
                ...data
            }
        });

        return 'RESTAURANT_COMPLETES_SUCCESS';
        
    }catch(e){
        return 'RESTAURANT_COMPLETES_FAILED';
    }
}