
import 'dotenv/config';
import status from '../../status/status.js';
import { CustomerOrderDetailsType } from '../../sharedTypes/sharedTypes.js';

const url = process.env.DATABASE_LAYER_ENDPOINT;


export default async function customerCompletesOrder(parent, args, contextValue, info){
    const { orderId } = args;
    const endpoint = 'postCustomerCompletesOrder'
    const {data}:{data:CustomerOrderDetailsType} = await contextValue.post(url, endpoint, {orderId:orderId, status:status.customerCompletesOrder});

    contextValue.pubsub.publish(`${orderId}_CUSTOMER`,{
        customerOrder:{
            ...data
        }
    });

    return orderId;
}