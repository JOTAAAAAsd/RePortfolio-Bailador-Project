
const mongoose = require("mongoose");


const Schema = mongoose.Schema;



const WorkExperienceSchema = Schema({


    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"  
    },

    name_company: String,

    title_job: String,

    role_description: String,

    url_img_company: String,

    role_tech_usage: [{
        title: String
    }],


    
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



module.exports = mongoose.model("Work_Experience", WorkExperienceSchema);


