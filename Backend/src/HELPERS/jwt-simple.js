
const jwt_simple = require("jwt-simple");

const moment = require("moment");

const { KEYWORD } = require("./constants_config");


// Create new Token to access
const jwt_createTokenAccess = (data_user) => {

    // console.log(data_user);

    const payload = {
        id: data_user._id,
        user: data_user.username,

        // expiration token
        token_created: moment().unix(),
        token_expiration: moment().add(3, "hours").unix() // 3hs
    };

    // console.log(payload);
    // console.log(jwt_simple.encode(payload, KEYWORD));
    return jwt_simple.encode(payload, KEYWORD);

}
// Token Encode
const jwt_updateNewToken = (user_data) => {

    // console.log(user_data);

    const payload = {
        id: user_data._id,
        token_expiration: moment().add(30, "days").unix()
    };

    // console.log(payload);
    // console.log(jwt_simple.encode(payload, KEYWORD));

    return jwt_simple.encode(payload, KEYWORD);

}

const jwt_decodeToken= (token_user)=>{
    // console.log(token_user);

    // console.log(jwt_simple.decode(token_user, KEYWORD, true));

    return jwt_simple.decode(token_user, KEYWORD, true); 

}


module.exports = {
    jwt_createTokenAccess,
    jwt_updateNewToken,
    jwt_decodeToken
}
 