

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// https://www.npmjs.com/package//mongoose-paginate-v2
const mongoosePaginate = require("mongoose-paginate-v2");
 

const ProjectSchema = Schema({

     
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"  
    },

    type_dev_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Type_Dev"
    },

    type_language_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Type_Language"
    },

    image_lang_project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image_lang_Project"
    },


    title: String,

     url_repo: String,
    url_demo: String,

     url_imgs: [{
        title: String,
        url_img: String
    }],

    description: String,

    tags: [
        {
            title: String
        }
    ],


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


 ProjectSchema.plugin(mongoosePaginate);


module.exports = mongoose.model("Project", ProjectSchema);


