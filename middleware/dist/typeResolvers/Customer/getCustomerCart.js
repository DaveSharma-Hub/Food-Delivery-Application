import 'dotenv/config';
const url = process.env.DATABASE_LAYER_ENDPOINT;
export default async function getCustomerCart(parent, args, contextValue, info) {
    const { customerId } = args;
    const queryParamaters = [{
            parameter: 'customerId',
            value: customerId
        }];
    const endpoint = 'getCustomerCart';
    const result = await contextValue.get(url, endpoint, queryParamaters);
    return result.data;
}
