import './carousel.css';

const imageSrc = [
    "https://assets.simon.com/tenantlogos/5385.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
    "https://www.albanymegacentre.co.nz/assets/argosy/retailer-images/Burger-King-logo-RGB__FitWzIzMCwyMzBd.PNG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tim_Hortons_logo_%28original%29.svg/220px-Tim_Hortons_logo_%28original%29.svg.png",
    "https://assets.simon.com/tenantlogos/5385.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
    "https://www.albanymegacentre.co.nz/assets/argosy/retailer-images/Burger-King-logo-RGB__FitWzIzMCwyMzBd.PNG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tim_Hortons_logo_%28original%29.svg/220px-Tim_Hortons_logo_%28original%29.svg.png",
    "https://www.albanymegacentre.co.nz/assets/argosy/retailer-images/Burger-King-logo-RGB__FitWzIzMCwyMzBd.PNG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tim_Hortons_logo_%28original%29.svg/220px-Tim_Hortons_logo_%28original%29.svg.png",
    "https://assets.simon.com/tenantlogos/5385.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
    "https://www.albanymegacentre.co.nz/assets/argosy/retailer-images/Burger-King-logo-RGB__FitWzIzMCwyMzBd.PNG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tim_Hortons_logo_%28original%29.svg/220px-Tim_Hortons_logo_%28original%29.svg.png",
]


export default function Carousel({}){
    return(
        <div className="slider">
            <div className="slide-track" >
                {
                    imageSrc?.map((image:string)=>
                        <div className="slide">
                            <img src={image} height="100" width="90" alt="" />
                        </div>
                    )
                }
                
            </div>
        </div>
    )
}