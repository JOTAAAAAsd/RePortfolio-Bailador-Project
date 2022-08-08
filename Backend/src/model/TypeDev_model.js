

const mongoose = require("mongoose");

const Schema = mongoose.Schema;



const TypeDevSchema = Schema({


    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // hacemos referencia al modelo User
    },


    title: String,

     date_register:
    {
        date: String,
        hour: String
    },

    date_update: {
        date: String,
        hour: String
    }




});



module.exports = mongoose.model("Type_Dev", TypeDevSchema);


