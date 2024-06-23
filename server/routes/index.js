var express = require('express');
var router = express.Router();
var path = require('path');

// Serve static files
router.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')));

// Route to serve the index.html from the React app
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'dist', 'index.html'));
});

module.exports = router;
