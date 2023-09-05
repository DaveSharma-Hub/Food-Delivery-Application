import customerCompletesOrder from './Customer/customerCompletesOrder.js';
import customerCreatesOrder from './Customer/customerCreatesOrder.js';
import subscribeCustomerOrder from './Customer/subscribeCustomerOrder.js';
import driverAcceptsOrder from './Driver/driverAcceptsOrder.js';
import driverCompletesOrder from './Driver/driverCompletesOrder.js';
import driverPicksUpOrder from './Driver/driverPicksUpOrder.js';
import subscribeDriverOrder from './Driver/subscribeDriverOrder.js';
import getRestaurantsNearMe from './Restaurants/getRestaurants.js';
import restaurantAcceptsOrder from './Restaurants/restaurantAcceptsOrder.js';
import restaurantCompletesOrder from './Restaurants/restaurantCompletesOrder.js';
import subscribeRestaurantObserveOrders from './Restaurants/subscribeRestaurantObserveOrders.js';
const resolvers = {
    Query: {
        getRestaurantsNearMe: getRestaurantsNearMe
    },
    Mutation: {
        customerCreatesOrder: customerCreatesOrder,
        restaurantAcceptsOrder: restaurantAcceptsOrder,
        driverAcceptsOrder: driverAcceptsOrder,
        restaurantCompletesOrder: restaurantCompletesOrder,
        driverPicksUpOrder: driverPicksUpOrder,
        driverCompletesOrder: driverCompletesOrder,
        customerCompletesOrder: customerCompletesOrder
    },
    Subscription: {
        customerOrder: {
            subscribe: subscribeCustomerOrder
        },
        driverOrder: {
            subscribe: subscribeDriverOrder
        },
        restaurantOrder: {
            subscribe: subscribeCustomerOrder
        },
        restaurantObserveOrders: {
            subscribe: subscribeRestaurantObserveOrders
        },
        driverObserveOrders: {
            subscribe: subscribeRestaurantObserveOrders
        }
    }
};
export default resolvers;
