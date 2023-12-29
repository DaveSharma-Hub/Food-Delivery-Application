import { useQuery, gql } from '@apollo/client'; 

const USE_GET_CUSTOMER_CART = gql`
    query getCustomerCart($customerId: String){
        getCustomerCart(customerId: $customerId) {
            cart {
                frequency
                name
                price
                restaurantName
                itemId
            }
            customerId
        }
    }
`;


export default function useGetCustomerCart(customerId: string, fn: any){
    return useQuery(USE_GET_CUSTOMER_CART, {
        variables:{
            customerId: customerId
        },
        onCompleted: fn
    });
}