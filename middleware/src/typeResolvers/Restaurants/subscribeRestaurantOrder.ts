export default function subscribeRestaurantOrder(parent, args, contextValue, info){
    const { orderId } = args;
    return contextValue.pubsub.asyncIterator([`${orderId}_RESTAURANT`]);
}