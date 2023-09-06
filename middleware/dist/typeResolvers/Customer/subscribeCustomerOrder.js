export default function subscribeCustomerOrder(parent, args, contextValue, info) {
    const { orderId } = args;
    return contextValue.ctx.pubsub.asyncIterator([`${orderId}_CUSTOMER`]);
}
