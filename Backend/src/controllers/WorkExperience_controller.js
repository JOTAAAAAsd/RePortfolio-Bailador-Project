
const { charCapital } = require("../HELPERS/char_capital");
const { getdate, getHour } = require("../HELPERS/get_date_hour");

const { jwt_decodeToken } = require("../HELPERS/jwt-simple");

 const { validateURLPattern } = require("../HELPERS/url_validate");
// Para validar que sea un id objeto de mongoose. Debemos de introducir la id para que valide.
var ObjectId = require('mongoose').Types.ObjectId;

const WorkExperience = require("../model/WorkExperience_model");

const User = require("../model/User_model");

// CREAMOS UN NUEVO RECURSO
const postWorkExperience = (req, res) => {

    const { name_company, title_job, role_description, url_img_company, role_tech_usage } = req.body;

    const work_experience = new WorkExperience();


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


                        if (name_company.trim() === "") {
                            res.status(404).json({
                                ok: false,
                                message: "The field Title is required."
                            });

                        } else if (title_job.trim() === "") {

                            res.status(404).json({
                                ok: false,
                                message: "The field Title Job Img is required."
                            });

                        } else if (role_description.trim() === "") {

                            res.status(404).json({
                                ok: false,
                                message: "The Role Description is required."
                            });

                        } else if (url_img_company.trim() === "") {
                            res.status(404).json({
                                ok: false,
                                message: "The URL Img Company is required."
                            });

                        } else {
                            // console.log(req.headers.usuario_autorizacion);
                            // console.log(jwt_decodeToken(req.headers.usuario_autorizacion));

                            work_experience.name_company = charCapital(name_company.trim());
                            work_experience.title_job = charCapital(title_job.trim());
                            work_experience.role_description = charCapital(role_description.trim().toLowerCase());
                            work_experience.url_img_company = url_img_company;
                            work_experience.role_tech_usage = role_tech_usage;

                            work_experience.date_register = {
                                date: getdate(new Date),
                                hour: getHour(new Date)
                            };


                            work_experience.user_id = data_user._id;
                            // console.log(data_user._id);

                            work_experience.save();

                            res.status(201).json({
                                ok: true,
                                message: "Resource created successfully."
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
const getWorkExperienceAdmin = async (req, res) => {


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

                    var work_experience_isExist = WorkExperience.findOne({ user_id: data_user._id }).exec();

                    work_experience_isExist.then((data) => {

                        if (!data) {

                            res.status(500).json({
                                ok: false,
                                message: "No data."
                            });

                        } else {

                            WorkExperience.find({ user_id: data_user._id }).then((stored) => {

                                if (stored.length === 0) {
                                    res.status(404).json({
                                        ok: false,
                                        message: "No there Work Experience registered."
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



const getWorkExperience1 = async (req, res) => {

    WorkExperience.find().then((stored) => {

        if (stored.length === 0) {
            res.status(404).json({
                ok: false,
                message: "No there Work Experience registered."
            });

        } else {
            res.status(200).json({
                ok: true,
                message: "Getting Work Experience.",
                data: stored
            });
        }
    });

}



// ACTUALIZAMOS EL RECURSO POR SU ID
const putWorkExperienceById = async (req, res) => {

    const { id } = req.params;

    const { name_company, title_job, role_description, url_img_company, role_tech_usage } = req.body;

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

                var work_experience_user_id_isExists = WorkExperience.find({ _id: id, user_id: data_user._id }).exec();

                work_experience_user_id_isExists.then((data) => {

                    if (data.length === 0) {
                        res.status(404).json({
                            ok: false,
                            message: "No there Work Experience with that id registered.",
                        });
                    } else {


                        if (Object.keys(req.body).length === 0) {
                            res.status(404).json({
                                ok: false,
                                message: "Please fill the body with some field."
                            });

                        } else {


                            if (name_company.trim() === "") {
                                res.status(404).json({
                                    ok: false,
                                    message: "The field Title is required."
                                });

                            } else if (title_job.trim() === "") {

                                res.status(404).json({
                                    ok: false,
                                    message: "The field Title Job Img is required."
                                });

                            } else if (role_description.trim() === "") {

                                res.status(404).json({
                                    ok: false,
                                    message: "The Role Description is required."
                                });

                            } else if (url_img_company.trim() === "") {
                                res.status(404).json({
                                    ok: false,
                                    message: "The URL Img Company is required."
                                });

                            } else {

                                // console.log(req.headers.usuario_autorizacion);
                                // console.log(jwt_decodeToken(req.headers.usuario_autorizacion));

                                var body_content = {
                                    name_company: charCapital(name_company.trim()),
                                    title_job: charCapital(title_job.trim()),
                                    role_description: charCapital(role_description.trim().toLowerCase()),
                                    url_img_company: url_img_company,
                                    role_tech_usage: role_tech_usage,

                                    date_update: {
                                        date: getdate(new Date),
                                        hour: getHour(new Date)
                                    }
                                };

                                WorkExperience.findByIdAndUpdate({ _id: id }, body_content, (error, stored) => {

                                    if (error) {

                                        res.status(500).json({
                                            ok: false,
                                            message: "Server Error."
                                        });

                                    } else {

                                        if (!stored) {
                                            res.status(404).json({
                                                ok: false,
                                                message: "No there Work Experience with that id registered."
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
const deleteWorkExperienceById = (req, res) => {

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

                            var work_experience_user_id_isExists = WorkExperience.find({ _id: id, user_id: data_user._id }).exec();

                            work_experience_user_id_isExists.then((data) => {

                                // console.log(data);

                                if (data.length === 0) {
                                    res.status(404).json({
                                        ok: false,
                                        message: "No there Work Experience with that id registered.",
                                    });
                                } else {

                                    WorkExperience.findByIdAndRemove(id, (error, stored) => {

                                        if (error) {
                                            res.status(500).json({
                                                ok: false,
                                                message: "Server Error."
                                            });

                                        } else {
                                            if (!stored) {

                                                res.status(404).json({
                                                    ok: false,
                                                    message: "No there Work Experience with that id registered.",
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
    postWorkExperience,
    getWorkExperienceAdmin,
    getWorkExperience1,
    putWorkExperienceById,
    deleteWorkExperienceById
}


