export default function subscribeRestaurantObserveOrders(parent, args, contextValue, info) {
    const { restaurantId } = args;
    return contextValue.ctx.pubsub.asyncIterator([`RESTAURANT_NEW_ORDER_${restaurantId}`]);
}
