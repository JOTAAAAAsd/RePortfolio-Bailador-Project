

const express = require("express");

const { postImageLangProject, getImagesLangProject, getImageLangProjectAdmin, putImageLangProjectById, deleteImageLangProjectById } = require("../controllers/ImageLangProject_controller");

const { userIsAuthMiddleware } = require("../middlewares/user_is_auth");




const router = express.Router();


router.post("/create", userIsAuthMiddleware, postImageLangProject);

router.get("/list", getImagesLangProject);

router.get("/list-admin", userIsAuthMiddleware, getImageLangProjectAdmin);


router.put("/update/:id", userIsAuthMiddleware, putImageLangProjectById); 

router.delete("/remove/:id", userIsAuthMiddleware, deleteImageLangProjectById);



module.exports = router;

