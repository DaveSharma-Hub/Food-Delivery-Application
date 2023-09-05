import 'dotenv/config';

const url = process.env.DATABASE_LAYER_ENDPOINT;

export default async function restaurantGetOrders(parent, args, contextValue, info){
    const { restaurantId } = args;
    const endpoint = 'getRestaurantOrders';
    const queryParamters = [{
            restaurantId:restaurantId
    }];
    const dbResult = await contextValue.get(url, endpoint, queryParamters);
    return dbResult.data;
}