
import 'dotenv/config';
import status from '../../status/status.js';

const url = process.env.DATABASE_LAYER_ENDPOINT;


export default async function customerCompletesOrder(parent, args, contextValue, info){
    const { orderId } = args;
    const endpoint = 'postCustomerCompletesOrder'
    const {data} = await contextValue.post(url, endpoint, {orderId:orderId, status:status.customerCompletesOrder});

    contextValue.pubsub.publish(`${orderId}_CUSTOMER`,{
        CustomerOrderDetails:{
            ...data
        }
    });
}