const express = require("express");
const router = express.Router();
const posterController = require('../controllers/posterController');

//Route to handle post form submission
router.post("/submit", posterController.createPoster);

//Route to get all posters
router.get("/submit", posterController.getAllPosters);


module.exports = router;