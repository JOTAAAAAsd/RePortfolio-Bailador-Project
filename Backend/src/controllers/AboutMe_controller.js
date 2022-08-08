
const { charCapital } = require("../HELPERS/char_capital");
const { getdate, getHour } = require("../HELPERS/get_date_hour");

const { jwt_decodeToken } = require("../HELPERS/jwt-simple");

const AboutMe = require("../model/AboutMe_model");
const { validateURLPattern } = require("../HELPERS/url_validate");
// Para validar que sea un id objeto de mongoose. Debemos de introducir la id para que valide.
var ObjectId = require('mongoose').Types.ObjectId;

const User = require("../model/User_model");


// CREAMOS UN NUEVO RECURSO
const postAboutMe = (req, res) => {

    const { title_home, url_img_profile, email, location, level_english, description, links_social } = req.body;

    const about_me = new AboutMe();


    // VALIDAMOS QUE EL USUARIO TOKEN DECODE COINCIDA CON EL ID DEL USUARIO REFERENCIADO AL USUARIO
    const get_headers = req.headers.usuario_autorizacion;
    // console.log(get_headers);
    // console.log(jwt_decodeToken(get_headers));

    if (get_headers) {
        var user_id_isExists = User.findOne({ _id: jwt_decodeToken(get_headers).id }).exec();

        user_id_isExists.then((data_user) => {

            if (!data_user) {
                res.status(500).json({
                    ok: false,
                    message: "User not found."
                });

            } else {

                // console.log(data_user.id, jwt_decodeToken(get_headers).id);

                if (data_user._id.toString() !== jwt_decodeToken(get_headers).id) {

                    res.status(500).json({
                        ok: false,
                        message: "User id not match. "
                    });

                } else {

                    console.log("READY...");

                    if (Object.keys(req.body).length === 0) {
                        res.status(404).json({
                            ok: false,
                            message: "Please fill the body with some field."
                        });

                    } else {

                        if (title_home.trim() === "") {
                            res.status(404).json({
                                ok: false,
                                message: "The field Title is required."
                            });

                        } else if (url_img_profile.trim() === "") {

                            res.status(404).json({
                                ok: false,
                                message: "The field Url Img is required."
                            });

                        } else if (!validateURLPattern(url_img_profile.trim())) {

                            res.status(404).json({
                                ok: false,
                                message: "The URL is invalid."
                            });

                        } else if (email.trim() === "") {

                            res.status(404).json({
                                ok: false,
                                message: "The Email is required."
                            });

                        } else if (description.trim() === "") {
                            res.status(404).json({
                                ok: false,
                                message: "The Description is required."
                            });

                        } else {
                            // console.log(req.headers.usuario_autorizacion);
                            // console.log(jwt_decodeToken(req.headers.usuario_autorizacion));

                            AboutMe.find().then((data) => {
                                // res.json(data.length < 2);

                                if (data.length < 1) {

                                    about_me.title_home = charCapital(title_home.trim());
                                    about_me.url_img_profile = url_img_profile.trim();
                                    about_me.email = email.trim().toLowerCase();
                                    about_me.location = location;
                                    about_me.level_english = level_english;
                                    about_me.description = charCapital(description.trim());
                                    about_me.links_social = links_social;

                                    about_me.date_register = {
                                        date: getdate(new Date),
                                        hour: getHour(new Date)
                                    };

                                    
                                    about_me.user_id = data_user._id;
                                    // console.log(data_user._id);

                                    about_me.save();

                                    res.status(201).json({
                                        ok: true,
                                        message: "Resource created successfully."
                                    });

                                } else {
                                    res.status(500).json({
                                        ok: false,
                                        message: "Only one record is allowed to be added."
                                    });
                                }
                            });
                        }
                    }
                }
            }
        });

    } else {

        res.status(500).json({
            ok: false,
            message: "No Token."
        });
    }
}


// OBTENEMOS SOLO UN RECURSO NADA MÁS
const getAboutMeAdmin = async (req, res) => {


    // VALIDAMOS QUE EL USUARIO TOKEN DECODE COINCIDA CON EL ID DEL USUARIO REFERENCIADO AL USUARIO
    const get_headers = req.headers.usuario_autorizacion;
    // console.log(get_headers);
    // console.log(jwt_decodeToken(get_headers));

    if (get_headers) {
        var user_id_isExists = User.findOne({ _id: jwt_decodeToken(get_headers).id }).exec();

        user_id_isExists.then((data_user) => {

            if (!data_user) {
                res.status(500).json({
                    ok: false,
                    message: "User not found."
                });

            } else {

                // console.log(data_user.id, jwt_decodeToken(get_headers).id);

                if (data_user._id.toString() !== jwt_decodeToken(get_headers).id) {

                    res.status(500).json({
                        ok: false,
                        message: "User id not match. "
                    });

                } else {

                    console.log("READY...");

                    var about_me_isExist = AboutMe.findOne({ user_id: data_user._id }).exec();

                    about_me_isExist.then((data) => {

                        if (!data) {

                            res.status(500).json({
                                ok: false,
                                message: "No data."
                            });

                        } else {

                            AboutMe.find({ user_id: data_user._id }).then((stored) => {

                                if (stored.length === 0) {
                                    res.status(404).json({
                                        ok: false,
                                        message: "No there About me registered."
                                    });

                                } else {
                                    res.status(200).json({
                                        ok: true,
                                        message: "Getting AboutMe.",
                                        data: stored
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    } else {

        res.status(500).json({
            ok: false,
            message: "No Token."
        });
    }


}



const getAboutMe1 = async (req, res) => {

    AboutMe.find().then((stored) => {

        if (stored.length === 0) {
            res.status(404).json({
                ok: false,
                message: "No there About Me registered."
            });

        } else {
            res.status(200).json({
                ok: true,
                message: "Getting About Me.",
                data: stored
            });
        }
    });

}



// ACTUALIZAMOS EL RECURSO POR SU ID
const putAboutMeById = async (req, res) => {

    const { id } = req.params;

    const { title_home, url_img_profile, email, location, level_english, description, links_social } = req.body;

    var id_mongo_validate = ObjectId.isValid(id);

    // console.log(id_mongo_validate); // True is valid | False not valid

    if (id_mongo_validate) {


        // VALIDAMOS QUE EL USUARIO TOKEN DECODE COINCIDA CON EL ID DEL USUARIO REFERENCIADO AL USUARIO
        const get_headers = req.headers.usuario_autorizacion;
        // console.log(get_headers);
        // console.log(jwt_decodeToken(get_headers));

        if (get_headers) {

            var user_id_isExists = User.findOne({ _id: jwt_decodeToken(get_headers).id }).exec();

            user_id_isExists.then((data_user) => {

                console.log(data_user._id.toString());

                var about_me_user_id_isExists = AboutMe.find({ _id: id, user_id: data_user._id }).exec();

                about_me_user_id_isExists.then((data) => {

                    if (data.length === 0) {
                        res.status(404).json({
                            ok: false,
                            message: "No there About Me with that id registered.",
                        });
                    } else {


                        if (Object.keys(req.body).length === 0) {
                            res.status(404).json({
                                ok: false,
                                message: "Please fill the body with some field."
                            });

                        } else {
                            if (title_home.trim() === "") {
                                res.status(404).json({
                                    ok: false,
                                    message: "The field Title is required."
                                });

                            } else if (url_img_profile.trim() === "") {

                                res.status(404).json({
                                    ok: false,
                                    message: "The field Url Img is required."
                                });

                            } else if (!validateURLPattern(url_img_profile.trim())) {

                                res.status(404).json({
                                    ok: false,
                                    message: "The URL is invalid."
                                });

                            } else if (email.trim() === "") {

                                res.status(404).json({
                                    ok: false,
                                    message: "The Email is required."
                                });

                            } else if (description.trim() === "") {
                                res.status(404).json({
                                    ok: false,
                                    message: "The Description is required."
                                });

                            } else {

                                // console.log(req.headers.usuario_autorizacion);
                                // console.log(jwt_decodeToken(req.headers.usuario_autorizacion));

                                var body_content = {
                                    title_home: charCapital(title_home.trim()),
                                    url_img_profile: url_img_profile.trim(),
                                    email: email.trim().toLowerCase(),
                                    location: location,
                                    level_english: level_english,
                                    description: charCapital(description.trim()),
                                    links_social: links_social,
                                    date_update: {
                                        date: getdate(new Date),
                                        hour: getHour(new Date)
                                    }
                                };


                                AboutMe.findByIdAndUpdate({ _id: id }, body_content, (error, stored) => {

                                    if (error) {

                                        res.status(500).json({
                                            ok: false,
                                            message: "Server Error."
                                        });

                                    } else {

                                        if (!stored) {
                                            res.status(404).json({
                                                ok: false,
                                                message: "No there About Me with that id registered."
                                            });

                                        } else {

                                            res.status(201).json({
                                                ok: true,
                                                message: "Resource updated successfully."
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            });


        } else {
            res.status(500).json({
                ok: false,
                message: "No Token."
            });
        }

    } else {

        res.status(500).json({
            ok: false,
            message: "Id param entered is not valid."
        });
    }
}


// ELIMINAMOS EL RECURSO POR SU ID
const deleteAboutMeById = (req, res) => {

    const { id } = req.params;

    var id_mongo_validate = ObjectId.isValid(id);

    if (id_mongo_validate) {


        // console.log(req.headers.usuario_autorizacion);
        // console.log(jwt_decodeToken(req.headers.usuario_autorizacion));

        const get_headers = req.headers.usuario_autorizacion;

        if (get_headers) {
            // console.log(get_headers);
            // console.log(jwt_decodeToken(get_headers));
            const id_user_decode_data = jwt_decodeToken(get_headers).id;
            // console.log(id_user_decode_data);

            var user_isExists = User.findOne({ _id: id_user_decode_data }).exec();
            user_isExists.then((data_user) => {
                // console.log(data_user);

                if (!data_user) {
                    // console.log("Doesn´t exist user with that token.");
                    res.status(500).json({
                        ok: false,
                        message: "Doesn´t exist user with that token."
                    });
                } else {
                    // console.log("Adding");

                    // console.log(data_user._id.toString(), id_user_decode_data)

                    if (data_user._id.toString() !== id_user_decode_data) {

                        res.status(500).json({
                            ok: false,
                            message: "Doesn´t exist user with that token."
                        });

                    } else {

                        // VALIDAMOS QUE EL USUARIO TOKEN DECODE COINCIDA CON EL ID DEL USUARIO REFERENCIADO AL USUARIO
                        var user_id_isExists = User.findOne({ _id: jwt_decodeToken(get_headers).id }).exec();

                        user_id_isExists.then((data_user) => {

                            console.log(data_user._id.toString());

                            var about_me_user_id_isExists = AboutMe.find({ _id: id, user_id: data_user._id }).exec();

                            about_me_user_id_isExists.then((data) => {

                                // console.log(data);

                                if (data.length === 0) {
                                    res.status(404).json({
                                        ok: false,
                                        message: "No there Type Dev with that id registered.",
                                    });
                                } else {

                                    AboutMe.findByIdAndRemove(id, (error, stored) => {

                                        if (error) {
                                            res.status(500).json({
                                                ok: false,
                                                message: "Server Error."
                                            });

                                        } else {
                                            if (!stored) {

                                                res.status(404).json({
                                                    ok: false,
                                                    message: "No there About Me with that id registered.",
                                                });
                                            } else {
                                                res.status(200).json({
                                                    ok: true,
                                                    message: "Resource removed successfully."
                                                });
                                            }

                                        }
                                    });

                                }
                            });
                        });
                    }
                }
            });

        } else {

            res.status(500).json({
                ok: false,
                message: "No Token."
            });
        }


    } else {
        res.status(500).json({
            ok: false,
            message: "Id param entered is not valid."
        });
    }

}

module.exports = {
    postAboutMe,
    getAboutMe1,
    getAboutMeAdmin,
    putAboutMeById,
    deleteAboutMeById
}


