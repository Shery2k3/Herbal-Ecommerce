const express = require('express');
const router = express.Router();
const timeController = require('../controllers/timeController');

router.get('/isOpen', timeController.isOpen);
router.post('/create', timeController.create);

module.exports = router;