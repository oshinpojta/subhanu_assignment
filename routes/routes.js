const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const authMiddleware = require("../middlewares/authenticate");

router.get("/check", (req, res, next) => {
    res.json({ success : true, msg : "Called Server Successfully!"});
});

router.post("/login", controller.loginUser);

router.post("/signup", controller.signupUser);

router.get("/getPosts", authMiddleware.authenticateAndroidToken, controller.getAllPostsByUser);

router.post("/createPost", authMiddleware.authenticateAndroidToken, controller.createPost);

router.post("/updatePost", authMiddleware.authenticateAndroidToken, controller.updatePost);

module.exports = router;