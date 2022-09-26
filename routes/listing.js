const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const bookshopController = require("../controllers/bookshop");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", bookshopController.getProfile)
router.get("/getAllListing", bookshopController.getAllListing)
router.get("/createListing", ensureAuth, bookshopController.getCreatePage);

router.get("/getBuying", bookshopController.getBuying);
router.get("/getSelling", bookshopController.getSelling);
router.get("/getFree", bookshopController.getFree);
router.get("/getListing/:id", bookshopController.getListing)

router.put("/addBookmark/:id", bookshopController.addBookmark)
router.post("/createListing", upload.array('uploadedImages', 5), bookshopController.createListing);

router.delete("/deleteListing/:id", bookshopController.deleteListing);

module.exports = router;