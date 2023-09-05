import 'dotenv/config';
const url = process.env.DATABASE_LAYER_ENDPOINT;
export default async function getRestaurantsNearMe(parent, args, contextValue, info) {
    const location = args.location;
    const endpoint = 'getRestaurantsNearMe';
    const queryParamters = [{
            parameter: 'location',
            value: location
        }];
    const dbResult = await contextValue.get(url, endpoint, queryParamters);
    return dbResult.data;
}
