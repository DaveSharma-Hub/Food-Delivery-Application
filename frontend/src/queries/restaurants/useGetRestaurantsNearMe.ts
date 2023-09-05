import { useQuery, gql } from '@apollo/client';

const USE_GET_RESTAURANTS = gql`
    query($location:String!) {
        getRestaurantsNearMe(location:$location){
            restaurantId
            name
            description
            rating
            image
            foodImage
        }
    }
`;

export default function useGetRestaurantsNearMe(location:string){
    return useQuery(USE_GET_RESTAURANTS,{
        variables:{
            location:location
        }
    });
}