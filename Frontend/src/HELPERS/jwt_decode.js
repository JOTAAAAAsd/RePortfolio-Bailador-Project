 
import jwtDecode from "jwt-decode";
 
 
export const getTokenAccessDecode= ()=>{
    
    const token_access= localStorage.getItem("token_access");

    // console.log(token_access);
    // console.log(expirationToken(token_access) ? null : token_access);

    if(!token_access || token_access === "null"){
        return null;
    }


    return expirationToken(token_access) ? null : token_access;

}
  
export const expirationToken = (token_user) => {

    const seconds = 60;

    const information_token = jwtDecode(token_user);

    // console.log(information_token);

    const { token_expiration } = information_token;

    const date_current = (Date.now() + seconds) / 100;

    return date_current > token_expiration;

}
 
export const getUpdateToken = () => {

    const token_update =  localStorage.getItem("token_update"); 

    if (!token_update || token_update === "null") {
        return null;
    }

    // return token_update;
    return expirationToken(token_update) ? null : token_update;

}

 