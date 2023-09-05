import 'dotenv/config';
import {uuid} from 'uuidv4';
import status from '../../status/status.js';

const url = process.env.DATABASE_LAYER_ENDPOINT;

function contructOrderId(){
    return uuid();
}

export default async function customerCreatesOrder(parent, args, contextValue, info){
    const { customerOrder } = args;
    const {  customerId, order, totalCost, location, restaurantDetails } = customerOrder;
   
    const endpoint = 'postCustomerOrder';
    const CustomerOrderDetails = {
        orderNumber: contructOrderId(),
        customerOrderNumber: customerId,
        order: order,
        totalCost: totalCost,
        driverDetails: null,
        restaurantDetails: {
            ...restaurantDetails,
            timeToCompleteOrder:null
        },
        location: location,
        status:status.waitingRestaurantDriver
    }
    contextValue.pubsub.publish('DRIVER_NEW_ORDER',{
        CustomerOrderDetails: CustomerOrderDetails
    });
    
    contextValue.pubsub.publish(`RESTAURANT_NEW_ORDER_${restaurantDetails.restaurantId}`,{
        CustomerOrderDetails: CustomerOrderDetails
    });

    await contextValue.post(url, endpoint, CustomerOrderDetails );
    return CustomerOrderDetails.orderNumber;
}
