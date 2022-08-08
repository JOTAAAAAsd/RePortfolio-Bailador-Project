
const mongoose = require("mongoose");


const Schema = mongoose.Schema;



const AboutMeSchema = Schema({


    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"  
    },


    title_home: String,

    url_img_profile: String,

    description: String,

    email: String,

    location: {
        location: String,
        country: String,
        nationality: String,
        url_flag_nationality: String
    },

    level_english: {
        level: String,
        url_flag_usa: String,
    },

    links_social: [{
        title_link_social: String,
        class_ico_link_social: String,
        url_link_social: String
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



module.exports = mongoose.model("About_me", AboutMeSchema);


