export default function subscribeRestaurantObserveOrders(parent, args, contextValue, info) {
    const { restaurantId } = args;
    return contextValue.pubsub.asyncIterator([`RESTAURANT_NEW_ORDER_${restaurantId}`]);
}
