const typeDefs = `
    input RestaurantDetailsInput{
        restaurantId: String
        name: String
        location: String
        timeToCompleteOrder: Float
    }

    input CustomerOrderInput{
        customerId: String
        order:[OrderTypeInput]
        totalCost: Float
        location: String
        restaurantDetails: RestaurantDetailsInput
    }

    input OrderTypeInput{
        id: String
        name: String
        count: Int
        costPerCount: Float
        totalCost: Float
    }

    input CartOrder {
        name: String,
        price: Float,
        frequency: Int,
        restaurantName:String,
        itemId: String
    }

    input CartOrderInput {
        cart: [CartOrder]
        customerId: String
    }

    type CartOrdersType {
        cart: [CartOrderType]
        customerId: String
    }

    type CartOrderType {
        name: String,
        price: Float,
        frequency: Int,
        restaurantName:String,
        itemId: String
    }

    type Restaurants{
        restaurantId:String
        name:String
        description:String
        location:String
        rating:Float
        image:String
        foodImage:String
    }

    type Customers{
        customerId:String
        firstName:String
        lastName:String
        rating:Float
        username:String
        password:String
    }

    type Drivers{
        driverId: String
        firstName: String
        lastName: String
        rating: Float
        username:String
        password:String
    }

    type OrderType{
        id: String
        name: String
        count: Int
        costPerCount: Float
        totalCost: Float
    }

    type DriverDetails{
        driverId: String,
        firstName: String
        lastName: String
        currentLocation:String
        distanceToRestaurant: Float
        distanceToCustomer: Float
    }

    type RestaurantDetails{
        restaurantId: String
        name: String
        location: String
        timeToCompleteOrder: Float
    }

    type CustomerDetails{
        customerId: String
        firstName: String
        lastName: String
        location:String
    }

    type CustomerOrderDetails {
        orderNumber:String
        customerOrderNumber: String
        order: [OrderType]
        totalCost: Float
        driverDetails: DriverDetails
        restaurantDetails: RestaurantDetails
        location: String,
        status: String
    }

    type CustomerOrder{
        customerId: String
        order:[OrderType]
        totalCost: Float
        location: String
        restaurantDetails: RestaurantDetails
    }

    type DriverOrderDetails{
        driverOrderNumber: String
        restaurantDetails: RestaurantDetails
        customerDetails: CustomerDetails
    }

    type RestaurantOrderDetails{
        restaurantOrderNumber: String
        driverDetails: DriverDetails
    }

    type MenuDetailType{
        name: String
        price: String
    }

    type RestaurantMenuDetails{
        menuId: String
        restaurantId: String
        menuOrderIds: [MenuDetailType]
    }

    
    type Query{
        getRestaurantsNearMe(location:String): [Restaurants]
        restaurantGetOrders(restaurantId:String):[CustomerOrderDetails]
        getRestaurantMenu(restaurantId: String):RestaurantMenuDetails
        
        getCustomerCart(customerId:String): CartOrdersType
    }

    type OrderId {
        orderId:String
    }

    type LoginInfo {
        loggedIn: String
        id:String
    }
    
    type Mutation{
        customerCreatesOrder(customerOrder:CustomerOrderInput): OrderId
        restaurantAcceptsOrder(orderId:String, timeToCompleteOrder: Float): OrderId
        driverAcceptsOrder(orderId: String, driverId: String, driverLocation:String): OrderId

        restaurantCompletesOrder(orderId: String): String
        driverPicksUpOrder(orderId: String): String
        driverCompletesOrder(orderId: String): String
        customerCompletesOrder(orderId: String): String

        customerLogin(username:String, password:String, userType:String):LoginInfo
        customerSignup(username:String, password:String, userType:String, firstName:String, lastName:String):LoginInfo
        customerUpdateCart(cartInput: CartOrderInput): String
    }

    type Subscription{
        customerOrder(orderId: String): CustomerOrderDetails
        driverOrder(orderId:String): DriverOrderDetails
        restaurantOrder(orderId:String): RestaurantOrderDetails

        restaurantObserveOrders(restaurantId:String): CustomerOrderDetails
        driverObserveOrders: CustomerOrderDetails
    }
    
`;
export default typeDefs;
/*
type Subscription{
        customerOrder: CustomerOrderDetails,
        driverOrder: DriverOrderDetails,
        restaurantOrder: RestaurantOrderDetails,

        restaurantObserveOrders: [CustomerOrderDetails],
        driverObserveOrders: [CustomerOrderDetails],
    }

*/ 
