
 
const express = require("express");

const { postSkill, getSkills, getSkillsAdmin,  putSkillById, deleteSkillById } = require("../controllers/Skill_controller");
 
const { userIsAuthMiddleware } = require("../middlewares/user_is_auth");

const router = express.Router();


router.post("/create", userIsAuthMiddleware, postSkill);

router.get("/list", getSkills);

router.get("/list-admin", userIsAuthMiddleware, getSkillsAdmin);



router.put("/update/:id", userIsAuthMiddleware, putSkillById);

router.delete("/remove/:id", userIsAuthMiddleware, deleteSkillById);



module.exports = router;

