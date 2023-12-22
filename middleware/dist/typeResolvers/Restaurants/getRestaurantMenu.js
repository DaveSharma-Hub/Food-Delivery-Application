import 'dotenv/config';
const url = process.env.DATABASE_LAYER_ENDPOINT;
export default async function getRestaurantMenu(parent, args, contextValue, info) {
    const restaurantId = args.restaurantId;
    const endpoint = 'getRestaurantMenu';
    const queryParamters = [{
            parameter: 'restaurantId',
            value: restaurantId
        }];
    const dbResult = await contextValue.get(url, endpoint, queryParamters);
    return dbResult.data;
}
