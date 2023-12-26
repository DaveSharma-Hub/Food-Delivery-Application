
import { gql, useMutation } from "@apollo/client";

const USE_POST_CUSTOMER_CART = gql`
    mutation customerUpdateCart($cartInput: CartOrderInput) {
        customerUpdateCart(cartInput: $cartInput)
    }
`;

export default function usePostCustomerCart(){
    return useMutation(USE_POST_CUSTOMER_CART);
}