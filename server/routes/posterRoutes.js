const express = require("express");
const router = express.Router();

//Route to handle post form submission
router.post("/submit", (req, res) => {
  res.send("Form submitted successfully");
});

module.exports = router; 
