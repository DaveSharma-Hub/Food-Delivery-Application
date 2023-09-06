import 'dotenv/config';
// import status from '../../status/status';
const url = process.env.DATABASE_LAYER_ENDPOINT;
export default async function driverAcceptsOrder(parent, args, contextValue, info) {
    const { orderId, driverId, driverLocation } = args;
    const endpoint = 'postDriverAcceptsOrder';
    const { data } = await contextValue.post(url, endpoint, { orderId: orderId, driverId: driverId, driverLocation: driverLocation });
    contextValue.pubsub.publish(`${orderId}_CUSTOMER`, {
        customerOrder: {
            ...data
        }
    });
    return {
        orderId: data.orderNumber
    };
}
