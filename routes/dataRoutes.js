const express = require('express');
const router = express.Router();
const controller = require('../controllers/dataController');
const verifyToken = require('../middlewares/authMiddleware');

router.use(verifyToken); // semua route butuh login

router.post('/', controller.create);
router.get('/:collection', controller.readAll);
router.get('/:collection/:id', controller.readOne);
router.put('/:collection/:id', controller.update);
router.delete('/:collection/:id', controller.remove);

module.exports = router;
