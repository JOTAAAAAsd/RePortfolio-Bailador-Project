

import React, { useState, useEffect, createContext } from "react";

import jwtDecode from "jwt-decode";

import { endpointAuth } from "../HELPERS/endpointConsume";

export const AuthContext = createContext();

export const AuthProvider = (props) => {

    // console.log(props);
    // console.log("Context");

    const { children } = props;

    const [useUserData, setUserData] = useState({
        user: null,
        isLoading: true
    });

    // console.log(useUserData);

    useEffect(() => {

        verifyUserLogued(setUserData);

    }, []);


    return (
        <AuthContext.Provider value={useUserData}>
            {
                children
            }
        </AuthContext.Provider>
    );
}


const verifyUserLogued = (setUser) => {

    const token_access = localStorage.getItem("token_access");
    // console.log(token_access);

    if (!token_access) {

        // console.log("No token access");

        const token_update = localStorage.getItem("token_update");

        if (!token_update) {
            localStorage.removeItem("token_access");
            localStorage.removeItem("token_update");

            setUser({
                user: null,
                isLoading: false
            });

        } else {

            console.log(token_update)
            endpointAuth("/user/update-token", true, { token_update: token_update });

        }

    } else {

        // console.log("Token access");

        setUser({
            user: jwtDecode(token_access),
            isLoading: false
        });

    }
}
