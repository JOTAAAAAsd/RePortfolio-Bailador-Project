
import React from "react";


// ROUTER
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


// File external
import { ROUTES_NAV } from "./routes_nav";


const RouteMapping = () => {

    return (

        <Switch>
            {
                ROUTES_NAV.map((route, index) => <RouteItems key={index} {...route} />)
            }
        </Switch>

    )
}

const RouteItems = (route) => {

    return (

        <Route
            path={route.path}
            exact={route.exact}
            render={(props) => <route.component routes={route.routes} {...props} />}
        />
    );
}



const AppRouting = () => {
    
    return (
        <Router>
            <RouteMapping />
        </Router>
    );

}

export default AppRouting;


