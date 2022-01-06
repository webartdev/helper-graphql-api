
import Charts from "./assets/charts.jpg";
import Maps from "./assets/maps.jpeg";
import Portfolio from "./assets/portfolio.jpeg";
import Posts from "./assets/table.jpg";

const NavLinks = {
    data: [
        {
            name: "Potfolio",
            icon: "track_changes",
            url: "/portfolio",
            image: Portfolio
        },
        {
            name: "Posts",
            icon: "store_mall_directory",
            url: "/posts",
            image: Posts
        },
        {
            name: "Charts",
            icon: "assessment",
            url: "/charts",
            image: Charts,
        },
        {
            name: "Maps",
            icon: "map",
            url: "/maps",
            image: Maps
        },
    ]
}

export default NavLinks
