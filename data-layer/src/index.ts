import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { distanceBetweenLocations, validateObjectSchema } from './utils/utilityFunctions.js';
import DBClient from './connection/client.js';
import status from './status/status.js';
import { CustomerOrderDetailsType, CustomersType, DriversType, RestaurantsType } from './types/types.js';

const PORT = Number.parseInt(process.env.PORT) || 5000;

const app = express();

// const client = new DBClient();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.post('/postCustomerOrder',(req,res)=>{
    try{
        const data:CustomerOrderDetailsType = req.body;
        customerOrders.push(data);
        res.send(JSON.stringify(data));
    }catch(e){
        console.log(e);
        res.sendStatus(e.status);
    }
})

app.post('/postRestaurantAcceptsOrder',(req,res)=>{
    try{
        const { orderId, timeToCompleteOrder }:{orderId:String, timeToCompleteOrder:Number} = req.body;
        const index = customerOrders.findIndex(({orderNumber})=>orderNumber===orderId);
        if(index){
            customerOrders[index].restaurantDetails.timeToCompleteOrder = timeToCompleteOrder;
            customerOrders[index].status = customerOrders[index].status === status.waitingRestaurant ? status.restaurantPreparingInProgess : status.waitingDriver
            res.send(JSON.stringify(customerOrders[index]));
        }else{
            res.sendStatus(500);
        }
    }catch(e){
        console.log(e);
    }
})

app.post('/postDriverAcceptsOrder',(req,res)=>{
    try{
        const { orderId, driverId: id, driverLocation }:{orderId:String, driverId:String, driverLocation:String} = req.body;
        const driver = drivers.find(({driverId})=>driverId === id);

        const index = customerOrders.findIndex(({orderNumber})=>orderNumber===orderId);

        if(index){
            const order:CustomerOrderDetailsType = customerOrders[index];

            const driverToRestaurant:number = distanceBetweenLocations(driverLocation,order.restaurantDetails.location);
            const driverToCustomer:number = driverToRestaurant + distanceBetweenLocations(driverLocation,order.restaurantDetails.location);
            
            const driverDetails = {
                ...driver,
                currentLocation:driverLocation,
                distanceToRestaurant: driverToRestaurant,
                distanceToCustomer:driverToCustomer ,
            }
    
            customerOrders[index]['restaurantDetails']['driverDetails'] = driverDetails;
            customerOrders[index]['status'] = customerOrders[index].status === status.waitingDriver ? status.restaurantPreparingInProgess : status.waitingRestaurant
            res.send(JSON.stringify(customerOrders[index]));
        }
        else{
            res.sendStatus(500);
        }
    }catch(e){
        console.log(e);
        res.sendStatus(e.status);
    }
})


app.post('/postRestaurantCompletesOrder',(req,res)=>{
    try{
        const { orderId, status }:{orderId:String, status:String} = req.body;
        const index = customerOrders.findIndex(({orderNumber})=>orderNumber===orderId);
        if(index){
            customerOrders[index].status = status;
            res.send(JSON.stringify(customerOrders[index]));
        }else{
            res.sendStatus(500);
        }
    }catch(e){
        console.log(e);
    }
})

app.post('/postDriverPicksUpOrder',(req,res)=>{
    try{
        const { orderId, status }:{orderId:String, status:String} = req.body;
        const index = customerOrders.findIndex(({orderNumber})=>orderNumber===orderId);
        if(index){
            customerOrders[index].status = status;
            res.send(JSON.stringify(customerOrders[index]));
        }else{
            res.sendStatus(500);
        }
    }catch(e){
        console.log(e);
    }
})
app.post('/postDriverCompletesOrder',(req,res)=>{
    try{
        const { orderId, status }:{orderId:String, status:String} = req.body;
        const index = customerOrders.findIndex(({orderNumber})=>orderNumber===orderId);
        if(index){
            customerOrders[index].status = status;
            res.send(JSON.stringify(customerOrders[index]));
        }else{
            res.sendStatus(500);
        }
    }catch(e){
        console.log(e);
    }
})
app.post('/postCustomerCompletesOrder',(req,res)=>{
    try{
        const { orderId, status }:{orderId:String, status:String} = req.body;
        const index = customerOrders.findIndex(({orderNumber})=>orderNumber===orderId);
        if(index){
            customerOrders[index].status = status;
            res.send(JSON.stringify(customerOrders[index]));
        }else{
            res.sendStatus(500);
        }
    }catch(e){
        console.log(e);
    }
})

app.post('/postUserLogin',(req,res)=>{
    const {username:user, password:pass, userType} = req.body;
    const result = {
        loggedIn:false,
        id:new String('')
    };
    switch(userType){
        case 'CUSTOMER':
            const customerFound = customers.find(({username, password})=>username===user && password===pass);
            if(customerFound){
                result.loggedIn = true;
                result.id = customerFound.customerId;
            }
            break;
        case 'DRIVER':
            const driverFound = drivers.find(({username, password})=>username===user && password===pass);
            if(driverFound){
                result.loggedIn = true;
                result.id = driverFound.driverId;
            }
            break;
        case 'RESTAURANT':
            break;
        default:
            break;
    }
    res.send(JSON.stringify(result));
})


app.post('/postUserSignup',(req,res)=>{
    const {username, password, userType,firstName, lastName } = req.body;
    const result = {
        loggedIn:true,
        id:new String('')
    };
    switch(userType){
        case 'CUSTOMER':
            const customerItem = {
                customerId:new String(customers.length+1),
                firstName:firstName,
                lastName:lastName,
                rating:0,
                username:username,
                password: password,
                cart:[]
            }
            customers.push(customerItem);
            result.id = customerItem.customerId;
            break;
        case 'DRIVER':
            const driverItem = {
                driverId:new String(drivers.length+1),
                firstName:firstName,
                lastName:lastName,
                rating:0,
                username:username,
                password: password
            }
            drivers.push(driverItem);
            result.id = driverItem.driverId;
            break;
        case 'RESTAURANT':
            
            break;
        default:
            break;
    }
    res.send(JSON.stringify(result));
});

app.post('/postUpdateCustomerCart',(req,res)=>{
    try{
        const { cart, customerId:id } = req.body;
        const index = customers.findIndex(({customerId})=>customerId === id);
        if(index === -1){
            throw Error("Customer doesnt exist");
        }
        for(let i=0;i<cart.length;i++){
            const { name, price, frequency, restaurantName } = cart[i];
            customers[index].cart.push({
                name:name, 
                price:price, 
                frequency:frequency, 
                restaurantName:restaurantName
            });
        }
        res.send(JSON.stringify({
            status:200
        }));
    }catch(e){
        console.log(e);
        res.send(JSON.stringify({
            status:500
        }));
    }
});

app.get('/getCustomerCart',(req,res)=>{
    const result:any = {
        cart:[],
        customerId:''
    };
    try{
        const { customerId:id } = req.query;
        const customer = customers.find(({customerId})=>customerId === id);
        if(!customer){
            throw Error("Customer doesnt exist, incorrect id");
        }

        result.customerId = id;
        result.cart = customer.cart;
    }catch(e){
        console.log(e);
    }
    res.send(JSON.stringify(result));
});

app.get('/getRestaurantsNearMe',(req,res)=>{
    try{
        validateObjectSchema(req.query,['location']);
        res.send(JSON.stringify(restaurants));
    }catch(e){
        console.log(e);
    }
})

app.get('/getRestaurantOrders', (req,res)=>{
    try{
        const restaurantId = (req.query);
        const orders = customerOrders.map((details)=>{
            const {restaurantDetails} = details; 
            if(restaurantDetails.restaurantId === restaurantId.restaurantId){
                return details;
            }   
        });
        res.send(JSON.stringify(orders));
    }catch(e){ 
        console.log(e);
    }
})

app.get('/getRestaurantMenu',(req,res)=>{
    const { restaurantId } = req.query;
    const menu = menus.find(({restaurantId:rID })=>rID === restaurantId);
    res.send(JSON.stringify(menu));
})

app.get('/health',(req,res)=>{
    res.send('200 Healthy');
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});


const customers:CustomersType[] = [
    {
        customerId:'1',
        firstName:'Bob',
        lastName:'Doe',
        rating:4.5,
        username:'Bob123',
        password:'12345',
        cart:[]
    }
]

const drivers:DriversType[] = [
    {
        driverId:'1',
        firstName:'Kelly',
        lastName:'Mason',
        rating:4.5,
        username:'kells',
        password:'12345'
    }
]

const customerOrders:CustomerOrderDetailsType[] = []

const restaurants:RestaurantsType[] = [
    {
        restaurantId: '1',
        name: 'Subway',
        description: 'Fast-food restaurant company',
        location: '50,-50',
        rating: 4.3,
        image: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
        foodImage:'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg'
    },
    {
        restaurantId: '2',
        name: 'Pizza Hut',
        description: 'Fast-food restaurant company',
        location: '30,-50',
        rating: 4.4,
        image: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
        foodImage:'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg'

    },
    {
        restaurantId:'3',
        name:'Gogi',
        description:'Korean fast-food',
        location:'40,-30',
        rating:4.8,
        image:'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
        foodImage:'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg'

    },
    {
        restaurantId:'4',
        name:'Raj Palace',
        description:'Indain Cuisine',
        location:'90,-45',
        rating:4.6,
        image:'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
        foodImage:'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg'

    },
    {
        restaurantId:'5',
        name:'Burger King',
        description:'Fast food restaurant',
        location:'90,-45',
        rating:4.0,
        image:'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
        foodImage:'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg'

    }
    ,
    {
        restaurantId:'6',
        name:'McDonald',
        description:'Fast food restaurant',
        location:'90,-45',
        rating:3.9,
        image:'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
        foodImage:'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg'
    }
    ,
    {
        restaurantId:'7',
        name:'A&W',
        description:'Fast food restaurant',
        location:'90,-45',
        rating:4.1,
        image:'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
        foodImage:'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg'
    }
    ,
    {
        restaurantId:'8',
        name:'A&W',
        description:'Fast food restaurant',
        location:'90,-45',
        rating:4.1,
        image:'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
        foodImage:'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg'
    }
    ,
    {
        restaurantId:'9',
        name:'Haanki',
        description:'Korean restaurant',
        location:'90,-45',
        rating:4.3,
        image:'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
        foodImage:'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg'
    }
    ,
    {
        restaurantId:'10',
        name:'Swiss Chalet',
        description:'American restaurant',
        location:'90,-45',
        rating:4.5,
        image:'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
        foodImage:'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg'
    }
];

const menus = [
    {
        menuId:'1',
        restaurantId:'1',
        menuOrderIds: [
            {
                name:'Club Sandwich',
                price:14.00
            },{
                name:'Veggie Delight',
                price:9.10
            },{
                name:'Chicken Sandwich',
                price:10.20
            }
        ]
    },
    {
        menuId:'2',
        restaurantId:'2',
        menuOrderIds: [
            {
                name:'Cheese Pizza',
                price:10.00
            },
            {
                name:'Veggie Pizza',
                price:7.10
            }
        ]
    }
    ,
    {
        menuId:'3',
        restaurantId:'3',
        menuOrderIds: [
            {
                name:'Chicken Bowl',
                price:14.00
            },{
                name:'Beef Bowl',
                price:9.10
            }
        ]
    }
    ,
    {
        menuId:'4',
        restaurantId:'4',
        menuOrderIds: [
            {
                name:'Butter Chicken',
                price:14.00
            },{
                name:'Naan',
                price:9.10
            }
        ]
    }
    ,
    {
        menuId:'5',
        restaurantId:'5',
        menuOrderIds: [
            {
                name:'Whopper Burger',
                price:14.00
            },{
                name:'Chicken Burger',
                price:9.10
            }
        ]
    }
    ,
    {
        menuId:'6',
        restaurantId:'6',
        menuOrderIds: [
            {
                name:'Big Mac',
                price:14.00
            },{
                name:'Chicken Nuggets',
                price:9.10
            }
        ]
    }
    ,
    {
        menuId:'7',
        restaurantId:'7',
        menuOrderIds: [
            {
                name:'Papa Burger',
                price:14.00
            },{
                name:'Buddy Burger',
                price:9.10
            }
        ]
    }
    ,
    {
        menuId:'8',
        restaurantId:'8',
        menuOrderIds: [
            {
                name:'Mama Burger',
                price:14.00
            },{
                name:'Chicken Strip',
                price:9.10
            }
        ]
    }
    ,
    {
        menuId:'9',
        restaurantId:'9',
        menuOrderIds: [
            {
                name:'Chicken Bowl',
                price:14.00
            },{
                name:'Beef Bowl',
                price:9.10
            }
        ]
    }
    ,
    {
        menuId:'10',
        restaurantId:'10',
        menuOrderIds: [
            {
                name:'Ribs',
                price:14.00
            },{
                name:'Steak',
                price:9.10
            }
        ]
    }

]
/*
IMPORTANT, need options for each ordr and size/variation for each order
*/