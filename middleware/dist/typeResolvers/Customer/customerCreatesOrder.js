import 'dotenv/config';
import { v4 } from 'uuid';
import status from '../../status/status.js';
const url = process.env.DATABASE_LAYER_ENDPOINT;
function contructOrderId() {
    return v4();
}
export default async function customerCreatesOrder(parent, args, contextValue, info) {
    const { customerOrder } = args;
    const { customerId, order, totalCost, location, restaurantDetails } = customerOrder;
    const endpoint = 'postCustomerOrder';
    const CustomerOrderDetails = {
        orderNumber: contructOrderId(),
        customerOrderNumber: customerId,
        order: order,
        totalCost: totalCost,
        driverDetails: null,
        restaurantDetails: {
            ...restaurantDetails,
            timeToCompleteOrder: null
        },
        location: location,
        status: status.waitingRestaurantDriver
    };
    contextValue.pubsub.publish('DRIVER_NEW_ORDER', {
        driverObserveOrders: CustomerOrderDetails
    });
    contextValue.pubsub.publish(`RESTAURANT_NEW_ORDER_${restaurantDetails.restaurantId}`, {
        restaurantObserveOrders: CustomerOrderDetails
    });
    await contextValue.post(url, endpoint, CustomerOrderDetails);
    return {
        orderId: CustomerOrderDetails.orderNumber
    };
}
