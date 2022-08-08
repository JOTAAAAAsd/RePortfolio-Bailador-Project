

const express = require("express");

const { postTypeLang, getTypesLang, getTypesLangAdmin, putTypeLangById, deleteTypeLangById } = require("../controllers/TypeLanguage_controller");

const { userIsAuthMiddleware } = require("../middlewares/user_is_auth");


const router = express.Router();


router.post("/create", userIsAuthMiddleware, postTypeLang);

router.get("/list", getTypesLang);

router.get("/list-admin", userIsAuthMiddleware, getTypesLangAdmin);


router.put("/update/:id", userIsAuthMiddleware, putTypeLangById);

router.delete("/remove/:id", userIsAuthMiddleware, deleteTypeLangById);



module.exports = router;

