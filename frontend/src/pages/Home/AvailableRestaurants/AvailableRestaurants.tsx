import RestaurantCard from "../../../components/Card/RestaurantCard";
import useGetRestaurantsNearMe from "../../../queries/restaurants/useGetRestaurantsNearMe";

export default function AvailableRestaurants({}){
    const {loading, error, data} = useGetRestaurantsNearMe('123');
    if(loading) return <h1>Loading...</h1>
    if(error) return <h1>Error</h1>
    return(
        <div className="grid grid-cols-3 gap-3 w-4/5 content-evenly mx-auto">
            {
                data?.getRestaurantsNearMe.map(({restaurantId, name, description, rating, image, foodImage}:any)=>{
                    return <RestaurantCard 
                        key={restaurantId}
                        name={name}
                        id={restaurantId}
                        foodLogo={foodImage} 
                        restaurantLogo={image} 
                        description={description} 
                        averageDeliveryTime={'14min'} 
                        rating={String(rating)}
                    />
                })
            }
        </div>
    )
}