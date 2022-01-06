import {
    BrowserRouter as Router,
    useRoutes,
} from "react-router-dom";
import '../App.css'
import Header from './appbar/header';
import Dashboard from "../pages/Dashboard"
import Posts from "../pages/Posts"
import Charts from "../pages/Charts"
import Maps from "../pages/Maps"
import Portfolio from "../pages/Portfolio"
import Breadcrumbs from "./Breadcrumbs";

const Layout = () => {
    let routes = useRoutes([
        { path: "/", element: <Dashboard /> },
        { path: "posts", element: <Posts /> },
        { path: "charts", element: <Charts /> },
        { path: "maps", element: <Maps /> },
        {path: "portfolio", element: <Portfolio />}
    ]);
    return <div className="AppBody">
        <Breadcrumbs />
        {routes}
    </div>
};

const AppWrapper = () => {
    return (
        <>
            <Header />
            <Router>
                <Layout />
            </Router>
        </>
    );
};

export default AppWrapper;

