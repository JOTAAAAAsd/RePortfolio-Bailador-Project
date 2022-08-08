

const express = require("express");

const { postAboutMe, getAboutMe1, getAboutMeAdmin, putAboutMeById, deleteAboutMeById} = require("../controllers/AboutMe_controller");
 
const { userIsAuthMiddleware } = require("../middlewares/user_is_auth");


const router = express.Router();

router.post("/create", userIsAuthMiddleware, postAboutMe);

router.get("/list", getAboutMe1);

router.get("/list-admin", userIsAuthMiddleware, getAboutMeAdmin);


router.put("/update/:id", userIsAuthMiddleware, putAboutMeById);

router.delete("/remove/:id", userIsAuthMiddleware, deleteAboutMeById);



module.exports = router;

