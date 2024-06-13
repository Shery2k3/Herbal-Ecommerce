const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');

router.get('/isOpen/:area', branchController.isOpenArea);
router.get('/isOpen', branchController.isOpen);
router.get('/all', branchController.getAll);
router.get('/branches', branchController.getBranches);
router.post('/create', branchController.create);
router.put('/edit/:branch', branchController.update);
router.delete('/delete/:branch', branchController.delete);

module.exports = router;