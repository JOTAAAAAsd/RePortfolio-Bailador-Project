import React, { useEffect, useContext } from "react";

// CONTEXT
import { AuthContext } from "../../CONTEXT/Auth_context";

// ROUTER
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

// COMPONENTS
import { MenuApp } from "../UI/MenuApp";
import { FooterApp } from "../UI/FooterApp";

import LayoutPublic from "./LayoutPublic";


const MappingRoutesPrivate = ({ routes }) => {

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


const LayoutPrivate = (props) => {

    // console.log(props);

    const { routes } = props;

    const history = useHistory();

    // console.log(routes);
    // console.log(history);

    const auth_context = useContext(AuthContext);

    const { user, isLoading } = auth_context; //cuando ingresemos obtenremos esta informacion

    // console.log(auth_context);


    if (!user && !isLoading) {

        return (
            <>
                <Route path="/" component={LayoutPublic} />

                <Redirect to="/" />
            </>
        );

    }

    return (


        <>

            <MenuApp />

            <MappingRoutesPrivate routes={routes} />

            <FooterApp />

        </>
    );
}


export default LayoutPrivate;

