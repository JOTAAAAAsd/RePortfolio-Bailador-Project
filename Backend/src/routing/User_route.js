

const express = require("express");

const { registerUser, loginUser, updateTokenAccess } = require("../controllers/auth_controller");


const router = express.Router();


router.post("/register", registerUser);

router.post("/login", loginUser);


router.post("/update-token", updateTokenAccess);


module.exports = router;

