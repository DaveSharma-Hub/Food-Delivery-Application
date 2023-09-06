export default function subscribeRestaurantOrder(parent, args, contextValue, info) {
    const { orderId } = args;
    return contextValue.ctx.pubsub.asyncIterator([`${orderId}_RESTAURANT`]);
}
