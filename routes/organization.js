const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');
const {
    authorizeAdmin,
    auth
} = require('../middlewares/auth');

router.post('/', auth, authorizeAdmin,organizationController.createOrganization);
router.post('/addUser', auth, authorizeAdmin,organizationController.addUserToOrganization);
router.get('/:organizationId', auth, organizationController.getOrganizationDetails);

module.exports = router;
