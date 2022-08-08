

const jwt_simple = require("jwt-simple");

const moment = require("moment");


const { KEYWORD } = require("../HELPERS/constants_config");



const userIsAuthMiddleware = (req, res, next) => {

    if (!req.headers.usuario_autorizacion) {

        return res.status(403).json({
            ok: false,
            message: "The request doesn´t have an authentication header."
        });

    }

    const token_header = req.headers.usuario_autorizacion.replace(/['"]+/g, "");

    // console.log(token_header);

    // console.log(jwt_simple.decode(token_header, KEYWORD));
 
    try {

        var payload = jwt_simple.decode(token_header, KEYWORD);

        // console.log(payload);

        if (payload.token_expiration <= moment.unix()) {

            return res.status(404).json({
                ok: false,
                message: "The token been expire."
            });
        }


    } catch (error) {

        // console.log(error.message);

        return res.status(404).json({
            ok: false,
            expiration: true,
            message: "The token been invalid."
        });

    }

    req.user = payload;

    next();

}

module.exports = {
    userIsAuthMiddleware
}

