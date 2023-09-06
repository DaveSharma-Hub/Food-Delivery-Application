import 'dotenv/config';
import status from '../../status/status.js';

const url = process.env.DATABASE_LAYER_ENDPOINT;


export default async function driverCompletesOrder(parent, args, contextValue, info){
    const { orderId } = args;
    const endpoint = 'postDriverCompletesOrder'
    const {data} = await contextValue.post(url, endpoint, {orderId:orderId, status:status.driverCompletesOrder});

    contextValue.pubsub.publish(`${orderId}_CUSTOMER`,{
        customerOrder:{
            ...data
        }
    });

    return data.orderId;
}