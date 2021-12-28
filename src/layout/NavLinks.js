
import Charts from "./assets/charts.jpg";
import Maps from "./assets/maps.jpeg";
import Portfolio from "./assets/portfolio.jpeg";
import Posts from "./assets/posts.jpeg";

const NavLinks = {
    data: [
        {
            name: "Dashboard",
            icon: "assesment",
            url: "/",
            // image: Portfolio
        },
        {
            name: "Potfolio",
            icon: "assesment",
            url: "/portfolio",
            image: Portfolio
        },
        {
            name: "Posts",
            icon: "map",
            url: "/posts",
            image: Posts
        },
        {
            name: "Charts",
            icon: "track_changes",
            url: "/charts",
            image: Charts,
        },
        {
            name: "Maps",
            icon: "store_mall_directory",
            url: "/maps",
            image: Maps
        },
    ]
}

export default NavLinks
