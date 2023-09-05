const status = {
    waitingRestaurantDriver: 'WAITING_ON_RESTAURANT_DRIVER',
    waitingRestaurant: 'WAITING_ON_RESTAURANT_ONLY',
    waitingDriver: 'WAITING_ON_DRIVER_ONLY',
    restaurantPreparingInProgess: 'RESTAURANT_PREPARING_IN_PROGRESS',
    restaurantCompleteOrder: 'RESTAURANT_COMPLETE_ORDER',
    restaurantFailedOrder: 'RESTAURANT_FAILED_ORDER',
    restaurantCancelOrder: 'RESTAURANT_CANCEL_ORDER',
    driverToRestaurant: 'DRIVER_TO_RESTAURANT',
    driverPickUpRestaurant: 'DRIVER_PICKUP_RESTAURANT',
    driverToCustomer: 'DRIVER_TRANSIT_TO_CUSTOMER'
};
export default status;
