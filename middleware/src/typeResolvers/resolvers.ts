import customerCompletesOrder from './Customer/customerCompletesOrder.js';
import customerCreatesOrder from './Customer/customerCreatesOrder.js';
import customerLogin from './Customer/customerLogin.js';
import customerSignup from './Customer/customerSignup.js';
import customerUpdateCart from './Customer/customerUpdateCart.js';
import getCustomerCart from './Customer/getCustomerCart.js';
import subscribeCustomerOrder from './Customer/subscribeCustomerOrder.js';
import driverAcceptsOrder from './Driver/driverAcceptsOrder.js';
import driverCompletesOrder from './Driver/driverCompletesOrder.js';
import driverPicksUpOrder from './Driver/driverPicksUpOrder.js';
import subscribeDriverObserverOrders from './Driver/subscribeDriverObserveOrders.js';
import subscribeDriverOrder from './Driver/subscribeDriverOrder.js';
import getRestaurantMenu from './Restaurants/getRestaurantMenu.js';
import getRestaurantsNearMe from './Restaurants/getRestaurants.js';
import restaurantAcceptsOrder from './Restaurants/restaurantAcceptsOrder.js';
import restaurantCompletesOrder from './Restaurants/restaurantCompletesOrder.js';
import subscribeRestaurantObserveOrders from './Restaurants/subscribeRestaurantObserveOrders.js';
import { withFilter } from 'graphql-subscriptions';

const resolvers = {
    Query: {
        getRestaurantsNearMe: getRestaurantsNearMe,
        getRestaurantMenu: getRestaurantMenu,
        getCustomerCart: getCustomerCart
    },
    Mutation: {
        customerCreatesOrder: customerCreatesOrder,
        restaurantAcceptsOrder: restaurantAcceptsOrder,
        driverAcceptsOrder: driverAcceptsOrder,

        restaurantCompletesOrder: restaurantCompletesOrder,
        driverPicksUpOrder:driverPicksUpOrder,
        driverCompletesOrder: driverCompletesOrder,
        customerCompletesOrder: customerCompletesOrder,
        customerLogin:customerLogin,
        customerSignup: customerSignup,
        customerUpdateCart: customerUpdateCart
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
            subscribe: subscribeDriverObserverOrders 
        }
    }
}


export default resolvers;