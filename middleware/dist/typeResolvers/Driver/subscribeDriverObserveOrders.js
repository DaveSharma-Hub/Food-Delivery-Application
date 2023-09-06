export default function subscribeDriverObserverOrders(parent, args, contextValue, info) {
    return contextValue.ctx.pubsub.asyncIterator(['DRIVER_NEW_ORDER']);
}
