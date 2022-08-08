

const express = require("express");

const { postWorkExperience, getWorkExperienceAdmin, getWorkExperience1, putWorkExperienceById, deleteWorkExperienceById } = require("../controllers/WorkExperience_controller");

const { userIsAuthMiddleware } = require("../middlewares/user_is_auth");


const router = express.Router();

router.post("/create", userIsAuthMiddleware, postWorkExperience);

router.get("/list", getWorkExperience1);

router.get("/list-admin", userIsAuthMiddleware, getWorkExperienceAdmin);


router.put("/update/:id", userIsAuthMiddleware, putWorkExperienceById);

router.delete("/remove/:id", userIsAuthMiddleware, deleteWorkExperienceById);



module.exports = router;

