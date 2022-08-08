

const mongoose = require("mongoose");

const Schema = mongoose.Schema;



const UserSchema = Schema({


    is_active: Boolean,

    username: String,
    password: String,

     date_register: {
        date: String,
        hour: String
    },
 
});



module.exports = mongoose.model("User", UserSchema);

 
