import 'dotenv/config';
import status from '../../status/status.js';
const url = process.env.DATABASE_LAYER_ENDPOINT;
export default async function driverPicksUpOrder(parent, args, contextValue, info) {
    const { orderId } = args;
    const endpoint = 'postDriverPicksUpOrder';
    const { data } = await contextValue.post(url, endpoint, { orderId: orderId, status: status.driverPickUpRestaurant });
    contextValue.pubsub.publish(`${orderId}_CUSTOMER`, {
        customerOrder: {
            ...data
        }
    });
    return data.orderId;
}
