import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { distanceBetweenLocations, validateObjectSchema } from './utils/utilityFunctions.js';
import status from './status/status.js';
const PORT = Number.parseInt(process.env.PORT) || 5000;
const app = express();
// const client = new DBClient();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.post('/postCustomerOrder', (req, res) => {
    try {
        const data = req.body;
        customerOrders.push(data);
        res.send(JSON.stringify(data));
    }
    catch (e) {
        console.log(e);
        res.sendStatus(e.status);
    }
});
app.post('/postRestaurantAcceptsOrder', (req, res) => {
    try {
        const { orderId, timeToCompleteOrder } = req.body;
        const index = customerOrders.findIndex(({ orderNumber }) => orderNumber === orderId);
        if (index) {
            customerOrders[index].restaurantDetails.timeToCompleteOrder = timeToCompleteOrder;
            customerOrders[index].status = customerOrders[index].status === status.waitingRestaurant ? status.restaurantPreparingInProgess : status.waitingDriver;
            res.send(JSON.stringify(customerOrders[index]));
        }
        else {
            res.sendStatus(500);
        }
    }
    catch (e) {
        console.log(e);
    }
});
app.post('/postDriverAcceptsOrder', (req, res) => {
    try {
        const { orderId, driverId: id, driverLocation } = req.body;
        const driver = drivers.find(({ driverId }) => driverId === id);
        const index = customerOrders.findIndex(({ orderNumber }) => orderNumber === orderId);
        if (index) {
            const order = customerOrders[index];
            const driverToRestaurant = distanceBetweenLocations(driverLocation, order.restaurantDetails.location);
            const driverToCustomer = driverToRestaurant + distanceBetweenLocations(driverLocation, order.restaurantDetails.location);
            const driverDetails = {
                ...driver,
                currentLocation: driverLocation,
                distanceToRestaurant: driverToRestaurant,
                distanceToCustomer: driverToCustomer,
            };
            customerOrders[index]['restaurantDetails']['driverDetails'] = driverDetails;
            customerOrders[index]['status'] = customerOrders[index].status === status.waitingDriver ? status.restaurantPreparingInProgess : status.waitingRestaurant;
            res.send(JSON.stringify(customerOrders[index]));
        }
        else {
            res.sendStatus(500);
        }
    }
    catch (e) {
        console.log(e);
        res.sendStatus(e.status);
    }
});
app.post('/postRestaurantCompletesOrder', (req, res) => {
    try {
        const { orderId, status } = req.body;
        const index = customerOrders.findIndex(({ orderNumber }) => orderNumber === orderId);
        if (index) {
            customerOrders[index].status = status;
            res.send(JSON.stringify(customerOrders[index]));
        }
        else {
            res.sendStatus(500);
        }
    }
    catch (e) {
        console.log(e);
    }
});
app.post('/postDriverPicksUpOrder', (req, res) => {
    try {
        const { orderId, status } = req.body;
        const index = customerOrders.findIndex(({ orderNumber }) => orderNumber === orderId);
        if (index) {
            customerOrders[index].status = status;
            res.send(JSON.stringify(customerOrders[index]));
        }
        else {
            res.sendStatus(500);
        }
    }
    catch (e) {
        console.log(e);
    }
});
app.post('/postDriverCompletesOrder', (req, res) => {
    try {
        const { orderId, status } = req.body;
        const index = customerOrders.findIndex(({ orderNumber }) => orderNumber === orderId);
        if (index) {
            customerOrders[index].status = status;
            res.send(JSON.stringify(customerOrders[index]));
        }
        else {
            res.sendStatus(500);
        }
    }
    catch (e) {
        console.log(e);
    }
});
app.post('/postCustomerCompletesOrder', (req, res) => {
    try {
        const { orderId, status } = req.body;
        const index = customerOrders.findIndex(({ orderNumber }) => orderNumber === orderId);
        if (index) {
            customerOrders[index].status = status;
            res.send(JSON.stringify(customerOrders[index]));
        }
        else {
            res.sendStatus(500);
        }
    }
    catch (e) {
        console.log(e);
    }
});
app.get('/getRestaurantsNearMe', (req, res) => {
    try {
        validateObjectSchema(req.query, ['location']);
        res.send(JSON.stringify(restaurants));
    }
    catch (e) {
        console.log(e);
    }
});
app.get('/getRestaurantOrders', (req, res) => {
    try {
        const restaurantId = String(req.query);
        const orders = customerOrders.map((details) => {
            const { restaurantDetails } = details;
            if (restaurantDetails.restaurantId === restaurantId) {
                return details;
            }
        });
        res.send(JSON.stringify(orders));
    }
    catch (e) {
        console.log(e);
    }
});
app.get('/health', (req, res) => {
    res.send('200 Healthy');
});
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
const customers = [
    {
        customerId: '1',
        firstName: 'Bob',
        lastName: 'Doe',
        rating: 4.5
    }
];
const drivers = [
    {
        driverId: '1',
        firstName: 'Kelly',
        lastName: 'Mason',
        rating: 4.5
    }
];
const customerOrders = [];
const restaurants = [
    {
        restaurantId: '1',
        name: 'Subway',
        description: 'Fast-food restaurant company',
        location: '50,-50',
        rating: 4.3,
        image: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
        foodImage: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg'
    },
    {
        restaurantId: '2',
        name: 'Pizza Hut',
        description: 'Fast-food restaurant company',
        location: '30,-50',
        rating: 4.4,
        image: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
        foodImage: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg'
    },
    {
        restaurantId: '3',
        name: 'Gogi',
        description: 'Korean fast-food',
        location: '40,-30',
        rating: 4.8,
        image: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
        foodImage: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg'
    },
    {
        restaurantId: '4',
        name: 'Raj Palace',
        description: 'Indain Cuisine',
        location: '90,-45',
        rating: 4.6,
        image: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
        foodImage: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg'
    },
    {
        restaurantId: '5',
        name: 'Burger King',
        description: 'Fast food restaurant',
        location: '90,-45',
        rating: 4.0,
        image: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
        foodImage: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg'
    },
    {
        restaurantId: '6',
        name: 'McDonald',
        description: 'Fast food restaurant',
        location: '90,-45',
        rating: 3.9,
        image: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
        foodImage: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg'
    },
    {
        restaurantId: '7',
        name: 'A&W',
        description: 'Fast food restaurant',
        location: '90,-45',
        rating: 4.1,
        image: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
        foodImage: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg'
    },
    {
        restaurantId: '8',
        name: 'A&W',
        description: 'Fast food restaurant',
        location: '90,-45',
        rating: 4.1,
        image: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
        foodImage: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg'
    },
    {
        restaurantId: '9',
        name: 'Hapi Hoeki',
        description: 'Korean restaurant',
        location: '90,-45',
        rating: 4.3,
        image: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
        foodImage: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg'
    },
    {
        restaurantId: '10',
        name: 'Swiss Chalet',
        description: 'American restaurant',
        location: '90,-45',
        rating: 4.5,
        image: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
        foodImage: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg'
    }
];
