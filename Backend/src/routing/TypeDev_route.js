

const express = require("express");

const { postTypeDev, getTypesDev, getTypesDevAdmin, putTypeDevById, deleteTypeDevById } = require("../controllers/TypeDev_controller");

const { userIsAuthMiddleware } = require("../middlewares/user_is_auth");


 
const router = express.Router();


router.post("/create", userIsAuthMiddleware, postTypeDev);

router.get("/list-admin", userIsAuthMiddleware, getTypesDevAdmin);

router.get("/list", getTypesDev);

router.put("/update/:id", userIsAuthMiddleware, putTypeDevById);

router.delete("/remove/:id", userIsAuthMiddleware, deleteTypeDevById);



module.exports = router;

