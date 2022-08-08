

const express = require("express");

const { postProject, getProjects, getProjectAdmin, getProjectsWithPagination,
    getProjectsWithPaginationAndWithQuery, putProjectById, deleteProjectById } = require("../controllers/Project_controller");


const { userIsAuthMiddleware } = require("../middlewares/user_is_auth");


const router = express.Router();


router.post("/create", userIsAuthMiddleware, postProject);

router.get("/list", getProjects);
router.get("/list-admin",userIsAuthMiddleware, getProjectAdmin);


router.get("/list2", getProjectsWithPagination);
router.get("/list3", getProjectsWithPaginationAndWithQuery);


router.put("/update/:id", userIsAuthMiddleware, putProjectById);

router.delete("/remove/:id", userIsAuthMiddleware, deleteProjectById);



module.exports = router;

