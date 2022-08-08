
import React from "react";

// ROUTER
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

// COMPONENTS
import { MenuApp } from "../UI/MenuApp";
import { FooterApp } from "../UI/FooterApp";


const MappingRoutesPublic = ({ routes }) => {

    // console.log(routes);



    return (
        <Switch>
            {
                routes.map((route, index) => (

                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ))
            }
        </Switch>
    );
}



const LayoutPublic = (props) => {

    // console.log(props);

    const { routes } = props;


    return (

        <>

            <MenuApp />

            <MappingRoutesPublic routes={routes} />

            <FooterApp />

        </>
    );
}


export default LayoutPublic;

