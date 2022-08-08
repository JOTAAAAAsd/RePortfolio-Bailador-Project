

const mongoose = require("mongoose");

 
const Schema = mongoose.Schema;
 
 

const ImageLangProjectSchema = Schema({
 

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"  
    },

    
    title: String,
    
    url_img: String,
 

   
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



module.exports = mongoose.model("Image_lang_Project", ImageLangProjectSchema);


