
const mongoose = require("mongoose");

const { SERVER_MONGODB } = require("./constants_config");

 

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};


 const calbackConexion = (error, res) => {
    if (error) {
        throw error;
    } else {
        console.log("The connection to the database is correct.");
        setTimeout(() => {
             console.log("****************************************");
            console.log(`* Connected to server and database `);
            console.log("**************************************** \n");
        }, 1500);
    }
}


 const mongooseConnection = () => {

     return mongoose.connect(SERVER_MONGODB, options, calbackConexion);
}


module.exports = {
    mongooseConnection
}