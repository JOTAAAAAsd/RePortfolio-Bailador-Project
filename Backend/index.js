const express = require("express");
const bodyParser = require("body-parser");

// Con el simple hecho de importarla acá ya nos estaremos conectando al servidor y a la base de datos  
const { mongooseConnection } = require("./src/HELPERS/connection_db");
const { API_VERSION, PORT_EXPRESS, SERVER_EXPRESS } = require("./src/HELPERS/constants_config");

// LOAD ROUTING
const type_dev_route = require("./src/routing/TypeDev_route");
const type_language_route = require("./src/routing/TypeLanguage_route");
const project_route = require("./src/routing/Project_route");
const skill_route = require("./src/routing/Skill_route");
const image_lang_project_route = require("./src/routing/ImageLangProject_route");
const about_me_route = require("./src/routing/AboutMe_routing");
const user_route = require("./src/routing/User_route");
const work_experience_route = require("./src/routing/WorkExperience_routing");


// We Create new app in express
const app = express();



// Will allow us get data from the body of our form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// We configure our HEADER HTTP
app.use((req, res, next) => {
    /*
     Un solo dato mal y podemos hacer que no funcione, habilitamos todo el acceso, por eso ponemos 
     el asterísco *
    */

    res.header("Access-Control-Allow-Origin", "*");

    /*
    Da acceso a todos los headers y le da acceso a todos los "headers" y todo este listado es autorizado.

    NOTA: En esta API yo he creado un "usuario_autorizacion", este debe ir en nuestro "header" de nuestro
    "endpoint" cuando se necesite autorización, es decir, en caso de tener que pedir que el usuario esté logueado
    para manipular información.
    Pero debemos de registrarlo acá, caso contrario no funcionará, este debe ir en el frontend en su header "endpoint"
    como "usuario_autorizacion".
 
    */

    res.header(
        "Access-Control-Allow-Headers",
        "Authorization,usuario_autorizacion,  X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );

    // Pueden entrar estos métodos
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

    next();

});



// ROUTING
app.use(`/${API_VERSION}/type-dev`, type_dev_route);
app.use(`/${API_VERSION}/type-language`, type_language_route);
app.use(`/${API_VERSION}/project`, project_route);
app.use(`/${API_VERSION}/skill`, skill_route);
app.use(`/${API_VERSION}/image-lang-project`, image_lang_project_route);
app.use(`/${API_VERSION}/about-me`, about_me_route);
app.use(`/${API_VERSION}/user`, user_route);
app.use(`/${API_VERSION}/work-experience`, work_experience_route);





app.listen(PORT_EXPRESS, "0.0.0.0", () => {
    console.log("+++++++++++++++++++++++++++++ ")
    console.log(`Server running ` + SERVER_EXPRESS);
    console.log("+++++++++++++++++++++++++++++  ")
    mongooseConnection();
});



