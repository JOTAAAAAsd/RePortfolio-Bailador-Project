

const bcrypt = require("bcrypt-nodejs");

const moment = require("moment");

const User = require("../model/User_model");

const { getdate, getHour } = require("../HELPERS/get_date_hour");

const { jwt_createTokenAccess, jwt_updateNewToken, jwt_decodeToken } = require("../HELPERS/jwt-simple");

const registerUser = (req, res) => {

    const { username, password, repeat_password } = req.body;

    const user = new User();

    if (Object.keys(req.body).length === 0) {
        res.status(404).json({
            ok: false,
            message: "Please fill the body with some field."
        });

    } else {

        if (username.trim() === "") {
            res.status(404).json({
                ok: false,
                message: "The field Username is required."
            });

        } else if (password.trim() === "") {

            res.status(404).json({
                ok: false,
                message: "The field Password is required."
            });

        } else if (repeat_password.trim() === "") {

            res.status(404).json({
                ok: false,
                message: "The field Password is required."
            });

        } else if (password !== repeat_password) {

            res.status(404).json({
                ok: false,
                message: "The passwords should be equals."
            });

        } else {
            var user_isExist = User.findOne({ username: username }).exec();

            user_isExist.then((data) => {

                if (!data) {

                    user.username = username;
                    user.is_active = false;

                    bcrypt.genSalt(10, function (error, salt) {

                        if (error) {
                            res.status(500).json({
                                ok: false,
                                message: "Server Error."
                            });
                        } else {

                            bcrypt.hash(password, salt, null, function (error, hash) {

                                if (error) {
                                    res.status(500).json({
                                        ok: false,
                                        message: "Server Error."
                                    });
                                } else {

                                    user.password = hash;

                                    user.date_register = {
                                        date: getdate(new Date),
                                        hour: getHour(new Date)
                                    };

                                    user.save();

                                    res.status(201).json({
                                        ok: true,
                                        message: "Resource created successfully.",
                                        // data: user
                                    });

                                }
                            });

                        }

                    });


                } else {
                    res.status(500).json({
                        ok: false,
                        message: "There is already a record."
                    });
                }
            });
        }
    }
}



const loginUser = (req, res) => {

    const { username, password } = req.body;

    const user = new User();

    if (Object.keys(req.body).length === 0) {
        res.status(404).json({
            ok: false,
            message: "Please fill the body with some field."
        });

    } else {

        if (username.trim() === "") {
            res.status(404).json({
                ok: false,
                message: "The field Username is required."
            });

        } else if (password.trim() === "") {

            res.status(404).json({
                ok: false,
                message: "The field Password is required."
            });

        } else {

            var user_isExist = User.findOne({ username: username }).exec();

            user_isExist.then((data) => {

                if (data) {
                    // Load hash from your password DB.
                    bcrypt.compare(password, data.password, function (error, result) {
 
                        if (error) {
                            res.status(500).json({
                                ok: false,
                                message: "Server Error."
                            });

                        } else if (!result) {
                            res.status(404).json({
                                ok: false,
                                message: "Password Incorrect."
                            });

                        } else {

                            if (!data.is_active) {
                                res.status(500).json({
                                    ok: false,
                                    message: "The user is not active."
                                });
                            } else {

                                res.status(200).json({
                                    ok: true,
                                    mensaje: "User logged correctly.",
                                    // user: data,
                                    token_access: jwt_createTokenAccess(data),
                                    token_update: jwt_updateNewToken(data)
                                });
                            }
                        }

                    });

                } else {
                    res.status(500).json({
                        ok: false,
                        message: "User doesn´t exists."
                    });
                }
            });
        }
    }
}




// Validate Token
const verifyTokenExpiration= (token_user)=>{

    const { token_expiration }= jwt_decodeToken(token_user);

    const date_current= moment().unix();

    if(date_current > token_expiration){
        // console.log("Token expirated. ");
        return true;
    }


    // No expirated
    return false;
}


const updateTokenAccess= (req,res)=>{

    const { update_token }= req.body;

    const is_token_expirated= verifyTokenExpiration(update_token);
    // console.log(update_token);

    console.log(is_token_expirated);


    // true or false
    if(is_token_expirated){

        res.status(404).json({
            ok: false,
            message: "The token to update been expired."
        });

    }else{

        const { id }= jwt_decodeToken(update_token);

        // console.log(id);
        // console.log(jwt_decodeToken(update_token));


        User.findOne({_id: id}, (error, stored)=>{
        
            if(error){
                res.status(500).json({
                    ok: false,
                    message: "Server Error."
                });

            }else{

                if(!stored){

                    res.status(404).json({
                        ok: false,
                        message: "User doesn´t found."
                    });

                }else{

                    res.status(200).json({
                        ok: true,
                        message: "New token generated.",
                        token_access: jwt_createTokenAccess(stored),
                        update_token: update_token
                    });
                }
            }
        });
    }
}
  

module.exports = {
    registerUser,
    loginUser,
    updateTokenAccess
    
}
