import { useRef, useState } from "react";
import AvailableRestaurants from "./AvailableRestaurants/AvailableRestaurants";
import Carousel from "./Carousel/Caroursel";
import Header from "./Header/Header";
import OrderNow from "./OrderNow/OrderNow";
import Recommended from "./Recommended/Recommended";

export default function Home({}){

    return(
      <div className="w-full">
        <Header />
        <OrderNow />
        <Carousel />
        <Recommended />
        <AvailableRestaurants />
      </div>
    )
}