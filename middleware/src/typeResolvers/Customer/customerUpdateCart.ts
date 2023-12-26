import 'dotenv/config';
import { CartOrderType } from '../../sharedTypes/sharedTypes';

const url = process.env.DATABASE_LAYER_ENDPOINT;

export default async function customerUpdateCart(parent, args, contextValue, info){
    console.log(args);
    console.log(JSON.stringify(args));
    const { cartInput } = args;
    const { cart, customerId } = cartInput;
    const endpoint = 'postUpdateCustomerCart';
    const result = await contextValue.post(url, endpoint, {
        cart,
        customerId
    });
    return JSON.stringify(result.data);
}