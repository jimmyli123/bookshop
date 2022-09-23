// Library imports
const express = require('express')
const router = express.Router()


// Controllers
const homeController = require("../controllers/home")
const authController = require("../controllers/auth")

// Routing
router.get("/", homeController.getHomePage);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;