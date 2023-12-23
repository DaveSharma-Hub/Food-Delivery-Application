import { useQuery, gql } from '@apollo/client'; 

const USE_GET_RESTAURANT_MENU = gql`
    query getRestaurantMenu($restaurantId: String){
        getRestaurantMenu(restaurantId: $restaurantId) {
            restaurantId
            menuId
            menuOrderIds {
                name
                price
            }
        }
    }
`;


export default function useGetRestaurantMenu(restaurantId: String){
    return useQuery(USE_GET_RESTAURANT_MENU, {
        variables:{
            restaurantId: restaurantId
        }
    });
}