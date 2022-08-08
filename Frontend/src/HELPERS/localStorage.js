  


export const setItemLocalToken = (token_access, token_update) => {

    // console.log({token_access, token_update});

    localStorage.setItem("token_access", token_access);
    localStorage.setItem("token_update", token_update);

}


export const getItemLocalToken = (type_token) => {

    if (type_token === "access") {
        localStorage.getItem("token_access");

    } else {
        localStorage.getItem("token_update");

    }
}



export const removeItemLocalToken = () => {

    localStorage.removeItem("token_access");
    localStorage.removeItem("token_update");

}


















