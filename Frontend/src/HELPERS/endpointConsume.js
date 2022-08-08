

const URL_API = process.env.REACT_APP_BACKEND_URL;



export const endpointAuth = (param_api,  body_data = {} ) => {

    const url = URL_API + param_api;

    // console.log(url);
    // console.log(body_data);
 
    const body_params = {

        method: "POST",
        body: JSON.stringify(body_data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url, body_params)
        .then((response) => {
            // console.log(response);

            return response.json();

        }).then((result) => {
            // console.log(result);
            return result;

        }).catch((error) => {

            // console.log(error);
            return {
                ok: false,
                message: "Oops " + error.message + " > Possible errors: wrong route endpoint - Error to connect DB"
            };
        });

}



export const endpointConsumeWithToken = (url_param_api, isGetData = false, method_type = "GET", body_data = {}) => {


    const token_access = localStorage.getItem("token_access");
    // console.log(token_access);

    if (!token_access || token_access === "null") {
        window.location.href = "/"; // redirect in case not have token

    } else {

        const url = URL_API + url_param_api;
        // console.log(url);

        const body_params = {
            headers: {
                "Content-Type": "application/json",
                usuario_autorizacion: token_access
            }
        };

        if (isGetData) {
            body_params.method = method_type;

        } else {
            body_params.method = method_type;
            body_params.body = JSON.stringify(body_data);
        }

        // console.log(body_params);
        return fetch(url, body_params)
            .then((response) => {
                // console.log(response);

                return response.json();

            }).then((result) => {
                // console.log(result);

                return result;

            }).catch((error) => {
                console.log(error);

                return {
                    ok: false,
                    message: "Oops " + error.message + " > Possible errors: wrong route endpoint - Error to connect DB"
                };

            });
    }
}


export const endpointConsume = (url_param_api) => {

    const url = process.env.REACT_APP_BACKEND_URL + url_param_api;


    
    // console.log(url);

    const body_params = {

        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }

    };

    return fetch(url, body_params)
        .then((response) => {
            // console.log(response);

            return response.json();

        }).then((result) => {
            // console.log(result);

            return result;

        }).catch((error) => {

            console.log(error);

            return {
                ok: false,
                message: "Oops " + error.message + " > Possible errors: wrong route endpoint - Error to connect DB"
            };

        });



}