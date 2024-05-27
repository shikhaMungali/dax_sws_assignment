const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {
    authorizeAdmin,
    auth
} = require('../middlewares/auth');

router.get('/', auth, userController.getUserDetails);
router.put('/', auth, userController.updateUser);
router.delete('/', auth, userController.deleteUser);

module.exports = router;
