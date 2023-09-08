export type RestaurantsType = {
    restaurantId:String
    name:String
    description:String
    location:String
    rating:Number
    image:String
    foodImage:String
}

export type CustomersType = {
    customerId:String
    firstName:String
    lastName:String
    rating:Number
    username:String
    password:String
}

export type DriversType = {
    driverId: String
    firstName: String
    lastName: String
    rating: Number
    username:String
    password:String
}

export type OrderType = {
    id: String
    name: String
    count: Number
    costPerCount: Number
    totalCost: Number
}

export type DriverDetailsType = {
    driverId: String,
    firstName: String
    lastName: String
    currentLocation:String
    distanceToRestaurant: Number
    distanceToCustomer: Number
}

export type RestaurantDetailsType = {
    restaurantId: String
    name: String
    location: String
    timeToCompleteOrder: Number
}

export type CustomerDetailsType = {
    customerId: String
    firstName: String
    lastName: String
    location:String
}

export type CustomerOrderDetailsType = {
    orderNumber:String
    customerOrderNumber: String
    order: OrderType[]
    totalCost: Number
    driverDetails: DriverDetailsType
    restaurantDetails: RestaurantDetailsType
    location: String,
    status: String
}

export type CustomerOrderType = {
    customerId: String
    order:OrderType[]
    totalCost: Number
    location: String
    restaurantDetails: RestaurantDetailsType
}

export type DriverOrderDetailsType = {
    driverOrderNumber: String
    restaurantDetails: RestaurantDetailsType
    customerDetails: CustomerDetailsType
}

export type RestaurantOrderDetailsType = {
    restaurantOrderNumber: String
    driverDetails: DriverDetailsType
}
