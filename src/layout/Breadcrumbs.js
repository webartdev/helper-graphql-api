import React, {useMemo} from "react";
import {
  Breadcrumbs as MUIBreadcrumbs,
  Link,
  Typography
} from "@material-ui/core";
import NavLinks from "./NavLinks"
// import { withRouter } from "react-router-dom";
import {
  // withRouter,
  BrowserRouter as Router,
  useRoutes,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
// import NavLinks from ".//NavLinks";
//#endregion
//#endregion
const getPageNames = () => {
  const flatten = (data) => {
    return data
    .flat()
    .map((x) => (x.children ? flatten(x.children) : x))
    .flat()
  }
  const response = {}
  flatten(Object.values(NavLinks)).map(
    (x) => (response[x.url.split("/").slice(-1)] = x.name)
  )
  return response
}

const Breadcrumbs = () => {
  const pageNames = useMemo(()=> {
    return getPageNames();
  }, [])
  const navigate = useNavigate();
  const location = useLocation()
  // console.log("location", location)
  const pathnames = location.pathname.split("/").filter(x => x);
  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
      {pathnames.length > 0 ? (
        <Link style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Home</Link>
      ) : 
      null}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography key={name}>{pageNames[name]}</Typography>
        ) : (
            <Link key={name} onClick={() => navigate(routeTo)}>
              {pageNames[name]}
            </Link>
          );
      })}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs

