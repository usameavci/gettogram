const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');

router.get('/', HomeController.index);
router.post('/', HomeController.store);
router.get('/download', HomeController.download);

module.exports = router;
