const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const {
    authorizeManager,
    auth
} = require('../middlewares/auth');

router.post('/', auth, authorizeManager,taskController.createTask);
router.get('/organization/:organizationId', auth, taskController.getTasksByOrganization);
router.get('/user', auth, taskController.getTasksByUser);
router.put('/:taskId', auth, taskController.updateTask);
router.delete('/:taskId', auth, taskController.deleteTask);

module.exports = router;
