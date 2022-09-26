// Library imports
const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Controllers
const homeController = require("../controllers/home")
const authController = require("../controllers/auth")
const bookShopController = require("../controllers/bookshop")

// Routing
router.get("/", homeController.getHomePage);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/login", authController.getLogin)
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout)
router.get("/profile", ensureAuth, bookShopController.getProfile )

module.exports = router;