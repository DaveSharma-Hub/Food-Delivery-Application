export default function subscribeDriverOrder(parent, args, contextValue, info) {
    const { orderId } = args;
    return contextValue.pubsub.asyncIterator([`${orderId}_DRIVER`]);
}
