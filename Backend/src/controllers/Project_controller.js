
const { charCapital } = require("../HELPERS/char_capital");
const { getdate, getHour } = require("../HELPERS/get_date_hour");
const { jwt_decodeToken } = require("../HELPERS/jwt-simple");

// Para validar que sea un id objeto de mongoose. Debemos de introducir la id para que valide.
var ObjectId = require('mongoose').Types.ObjectId;


const Project = require("../model/Project_model");
const TypeDev = require("../model/TypeDev_model");
const TypeLanguage = require("../model/TypeLanguage_model");
const ImageLangProject = require("../model/ImageLangProject_model");

const User = require("../model/User_model");

// CREAMOS UN NUEVO RECURSO
const postProject = (req, res) => {

    const { type_dev_id = "", type_language_id = "", image_lang_project_id = "", title = "", url_repo = "", url_demo = "",
        url_imgs, description = "", tags
    } = req.body;


    const project = new Project();

    if (Object.keys(req.body).length === 0) {
        res.status(404).json({
            ok: false,
            message: "Please fill the body with some field."
        });

    } else {

        if (type_dev_id.trim() === "" || type_language_id.trim() === "" || image_lang_project_id.trim() === "") {
            res.status(404).json({
                ok: false,
                message: "you need to enter the 3 id - Type Dev | Type Lang | Image Lang Project."
            });

        } else {

            if (title.trim() === "") {

                res.status(404).json({
                    ok: false,
                    message: "The field Title is required."
                });

            } else if (description.trim() === "") {

                res.status(404).json({
                    ok: false,
                    message: "The field Description is required."
                });

            } else {

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

                                var project_isExist = Project.findOne({ title: charCapital(title), user_id: data_user._id }).exec();

                                project_isExist.then((data) => {

                                    if (!data) {

                                        var id_mongo_validate_type_dev = ObjectId.isValid(type_dev_id);
                                        var id_mongo_validate_type_language = ObjectId.isValid(type_language_id);
                                        var id_mongo_validate_type_image_lang_project = ObjectId.isValid(image_lang_project_id);

                                        if (id_mongo_validate_type_dev && id_mongo_validate_type_language && id_mongo_validate_type_image_lang_project) {

                                            const type_dev_id_isExists = TypeDev.findOne({ _id: type_dev_id });
                                            const type_lang_id_isExists = TypeLanguage.findOne({ _id: type_language_id });
                                            const image_lang_project_id_isExists = ImageLangProject.findOne({ _id: image_lang_project_id });

                                            Promise.all([type_dev_id_isExists, type_lang_id_isExists, image_lang_project_id_isExists]).then((mix_result) => {

                                                // console.log(mix_result[0], mix_result[1], mix_result[2]);

                                                if (mix_result[0] && mix_result[1] && mix_result[2]) {

                                                    project_isExist.then((data) => {

                                                        if (!data) {

                                                            project.type_dev_id = type_dev_id;
                                                            project.type_language_id = type_language_id;
                                                            project.image_lang_project_id = image_lang_project_id;

                                                            project.title = charCapital(title);
                                                            project.url_repo = url_repo;
                                                            project.url_demo = url_demo;
                                                            project.url_imgs = url_imgs;
                                                            project.description = charCapital(description);
                                                            project.tags = tags;

                                                            project.user_id = data_user._id;
                                                            // console.log(data_user._id);

                                                            project.date_register = {
                                                                date: getdate(new Date),
                                                                hour: getHour(new Date)
                                                            };

                                                            project.save();

                                                            res.status(201).json({
                                                                ok: true,
                                                                message: "Resource created successfully."
                                                            });

                                                        } else {
                                                            res.status(500).json({
                                                                ok: false,
                                                                message: "There is already a record."
                                                            });
                                                        }
                                                    });

                                                } else {
                                                    res.status(500).json({
                                                        ok: false,
                                                        message: "No there Type Dev or Type Language or Image Lang Project with that id registered."
                                                    });
                                                }
                                            });

                                        } else {
                                            res.status(500).json({
                                                ok: false,
                                                message: "Id param entered is not valid."
                                            });
                                        }

                                    } else {
                                        res.status(500).json({
                                            ok: false,
                                            message: "There is already a record."
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
        }
    }
}


// OBTENEMOS TODOS LOS RECURSOS - No incluye paginación
const getProjectAdmin = async (req, res) => {


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

                    var project_isExist = Project.findOne({ user_id: data_user._id }).exec();

                    project_isExist.then((data) => {

                        console.log(data)

                        if (!data) {

                            res.status(500).json({
                                ok: false,
                                message: "No data."
                            });

                        } else {

                            Project.find({ user_id: data_user._id }).populate(["type_dev_id", "type_language_id", "image_lang_project_id"]).then((stored) => {

                                if (stored.length === 0) {
                                    res.status(404).json({
                                        ok: false,
                                        message: "No there Project registered."
                                    });

                                } else {
                                    res.status(200).json({
                                        ok: true,
                                        message: "Getting Project.",
                                        data: stored.sort((a, b) => (a.title > b.title) ? 1 : -1)
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



const getProjects = async (req, res) => {


    Project.find({}).populate(["type_dev_id", "type_language_id", "image_lang_project_id"])
        .then((stored) => {

            // console.log(stored);

            if (!stored) {

                res.status(404).json({
                    ok: false,
                    message: "Server Error."
                });

            } else {

                if (stored.length === 0) {

                    res.status(404).json({
                        ok: false,
                        message: "No there Project registered."
                    });

                } else {

                    res.status(200).json({
                        ok: true,
                        message: "Getting Project.",
                        data: stored.sort((a, b) => (a.title > b.title) ? 1 : -1)
                    });

                }
            }

        });

}


// OBTENEMOS TODOS LOS RECURSOS - CONTENDRÁ SOLO PAGINACIÓN
const getProjectsWithPagination = async (req, res) => {


    /*
     Nos interesa recibir como query 2 argumentos, en este caso será "page" y "limit", donde "limit" sería
     la cantidad de registro a visualizar por página y "page" será el número de la página, en este caso
     mostraremos por defecto la página 1 con límite de 5, es decir que por cada página tendrá un límite de 
     registro, como ser 5 registros por página.

     NOTA: Las "query" deben estar en inglés, así no los pide la librería de "mongoosePaginate". Si no ponemos
     nada en "page" por default será 1 y lo mismo pasa con "limit" si no ponemos el límite por default será 10.

     Ej: http://localhost:4000/api/v1/project/list-paginate?page=3&limit=5 <-- En este nos muestra la página 3 con un registro de 5 por página
     
    */

    const { page = 1, limit = 20 } = req.query; // será de tipo query, es decir debemos de poner un ? para hacer la consulta, no un ID}

    /*
     En "sort" ordenamos el registro por descendente según la fecha de registro de nuestro campo, usamos la propiedad "populate" para
     poblar las referencias, de la otra manera realizada hasta el momento no funcionará, cada referencia a apuntar para poblar en este
     caso irá en arreglo, ya que son más de una e irá separado por coma,poblaremos todas sus pertenencias a ese modelo.

        https://www.npmjs.com/package/mongoose-paginate-v2
        https://mongoosejs.com/docs/api.html#query_Query-populate
    
    */

    const options = {
        page, limit: parseInt(limit),
        sort: { date_register: "desc" },
        populate: ["type_dev_id", "type_language_id", "image_lang_project_id"]
    };


    Project.paginate({}, options, (error, stored) => {

        if (error) {
            res.status(500).json({
                ok: false,
                messaje: "Server Error."
            });

        } else {

            if (!stored) {

                res.status(404).json({
                    ok: false,
                    message: "No there Project registered."
                });

            } else {

                res.status(200).json({
                    ok: true,
                    message: "Getting Project.",
                    data: stored
                });

            }
        }
    });

}


// OBTENEMOS TODOS LOS RECURSOS - CONTENDRÁ PAGINACIÓN + CONSULTA POR SU ID PARA FILTRAR BÚSQUEDA
const getProjectsWithPaginationAndWithQuery = (req, res) => {


    // Ej: http://localhost:4000/api/v1/project/list?type_dev_id=61c8ef3d33cae58a8707e810
    const { query } = req;

    // Pude venir uno solo o ambos, si viene ambos debemos de filtrar bien
    const { type_dev_id, type_language_id, page, limit } = query; // Ej: type_dev_id=62e025c53825b838bda20ab1 | type_language_id=62e025c53825b838bda20ab1

    //  console.log(query);

    const options = {
        page, limit: parseInt(limit),
        sort: { date_register: "desc" },
        populate: ["type_dev_id", "type_language_id", "image_lang_project_id"]
    };

    /*
     Si la consulta para saber el tipo de desarrollo viene vacío procedemos a poner el objeto vacío {}, lo mismo pasará con el 
     tipo de lenguaje, cosa que solo tome la "query" page=1 y limit=10, es así como podremos usarlo bien en el frontend sin 
     problemas, por lo que si estos campos viene vacío solo procederá a aplicar la paginación solamene, es equivalente a 
     la función anterior, pero acá lo estamos unificando.
    */

    if (page && limit) {
        // console.log("Tipo de lenguaje: " + type_language_id + "Tipo de desarrollo: " + type_dev_id);

        var type_query = {};

        if (type_language_id && type_dev_id) {
            type_query.type_language_id = type_language_id;
            type_query.type_dev_id = type_dev_id;

        } else if (type_language_id) {
            type_query.type_language_id = type_language_id;

        } else if (type_dev_id) {
            type_query.type_dev_id = type_dev_id;

        }

        // type_query traerá las coincidencias en base al campo por lo que funcionaría como el FindOne, filtra los datos.
        Project.paginate(type_query, options, (error, stored) => {


            if (error) {
                res.status(500).json({
                    ok: false,
                    message: "Error server."
                });

            } else {

                if (!stored) {
                    res.status(404).json({
                        ok: false,
                        message: "No there Project registered."
                    });

                } else {

                    // console.log(stored.docs)
                    res.status(200).json({
                        ok: true,
                        message: "Getting Project.",
                        data: stored
                    });
                }
            }

        });

    } else {
        res.status(500).json({
            ok: false,
            message: "Param page and limit are required."
        });
    }


}


// ACTUALIZAMOS EL RECURSO POR SU ID
const putProjectById = async (req, res) => {

    const { id } = req.params;


    const { type_dev_id = "", type_language_id = "", image_lang_project_id = "", title = "", url_repo = "", url_demo = "",
        url_imgs, description = "", tags
    } = req.body;


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

                var project_user_id_isExists = Project.find({ _id: id, user_id: data_user._id }).exec();

                project_user_id_isExists.then((data) => {

                    if (data.length === 0) {
                        res.status(404).json({
                            ok: false,
                            message: "No there Project with that id registered.",
                        });
                    } else {

                        var body_content = {
                            title: charCapital(title),
                            date_update: {
                                date: getdate(new Date),
                                hour: getHour(new Date)
                            }
                        };


                        if (Object.keys(req.body).length === 0) {
                            res.status(404).json({
                                ok: false,
                                message: "Please fill the body with some field."
                            });

                        } else {


                            if (type_dev_id.trim() === "" || type_language_id.trim() === "" || image_lang_project_id.trim() === "") {
                                res.status(404).json({
                                    ok: false,
                                    message: "you need to enter the 3 id - Type Dev | Type Lang | Image Lang Project."
                                });

                            } else {

                                if (title.trim() === "") {

                                    res.status(404).json({
                                        ok: false,
                                        message: "The field Title is required."
                                    });

                                } else if (description.trim() === "") {

                                    res.status(404).json({
                                        ok: false,
                                        message: "The field Description is required."
                                    });

                                } else {

                                    var id_mongo_validate_type_dev = ObjectId.isValid(type_dev_id);
                                    var id_mongo_validate_type_language = ObjectId.isValid(type_language_id);
                                    var id_mongo_validate_type_image_lang_project = ObjectId.isValid(image_lang_project_id);

                                    if (id_mongo_validate_type_dev && id_mongo_validate_type_language && id_mongo_validate_type_image_lang_project) {

                                        const type_dev_id_isExists = TypeDev.findOne({ _id: type_dev_id });
                                        const type_lang_id_isExists = TypeLanguage.findOne({ _id: type_language_id });
                                        const image_lang_project_id_isExists = ImageLangProject.findOne({ _id: image_lang_project_id });

                                        Promise.all([type_dev_id_isExists, type_lang_id_isExists, image_lang_project_id_isExists]).then((mix_result) => {

                                            // console.log(mix_result[0], mix_result[1], mix_result[2]);

                                            if (mix_result[0] && mix_result[1] && mix_result[2]) {

                                                var body_content = {
                                                    type_dev_id: type_dev_id,
                                                    type_language_id: type_language_id,
                                                    image_lang_project_id: image_lang_project_id,
                                                    title: charCapital(title.trim()),
                                                    url_repo: url_repo.trim(),
                                                    url_demo: url_demo.trim(),
                                                    url_imgs: url_imgs,
                                                    description: charCapital(description.trim()),
                                                    tags: tags,
                                                    date_update: {
                                                        date: getdate(new Date),
                                                        hour: getHour(new Date)
                                                    }
                                                }

                                                Project.findByIdAndUpdate({ _id: id }, body_content, (error, stored) => {

                                                    if (error) {

                                                        res.status(500).json({
                                                            ok: false,
                                                            message: "Server Error."
                                                        });

                                                    } else {

                                                        if (!stored) {
                                                            res.status(404).json({
                                                                ok: false,
                                                                message: "No there Project with that id registered."
                                                            });

                                                        } else {

                                                            res.status(201).json({
                                                                ok: true,
                                                                message: "Resource updated successfully."
                                                            });
                                                        }
                                                    }
                                                });

                                            } else {
                                                res.status(500).json({
                                                    ok: false,
                                                    message: "No there Type Dev or Type Language or Image Lang Project with that id registered."
                                                });
                                            }
                                        });

                                    } else {
                                        res.status(500).json({
                                            ok: false,
                                            message: "Id param entered is not valid."
                                        });
                                    }
                                }
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
const deleteProjectById = (req, res) => {

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

                        var user_id_isExists = User.findOne({ _id: jwt_decodeToken(get_headers).id }).exec();

                        user_id_isExists.then((data_user) => {

                            console.log(data_user._id.toString());

                            var project_user_id_isExists = Project.find({ _id: id, user_id: data_user._id }).exec();

                            project_user_id_isExists.then((data) => {

                                // console.log(data);

                                if (data.length === 0) {
                                    res.status(404).json({
                                        ok: false,
                                        message: "No there Project with that id registered.",
                                    });
                                } else {

                                    Project.findByIdAndRemove(id, (error, stored) => {

                                        if (error) {
                                            res.status(500).json({
                                                ok: false,
                                                message: "Server Error."
                                            });

                                        } else {
                                            if (!stored) {

                                                res.status(404).json({
                                                    ok: false,
                                                    message: "No there Project with that id registered.",
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
    postProject,
    getProjects,
    getProjectAdmin,
    getProjectsWithPagination,
    getProjectsWithPaginationAndWithQuery,
    putProjectById,
    deleteProjectById
}


