export default function subscribeDriverObserverOrders(parent, args, contextValue, info) {
    return contextValue.pubsub.asyncIterator(['DRIVER_NEW_ORDER']);
}
