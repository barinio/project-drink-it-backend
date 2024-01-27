const express = require('express');

const ctrl = require('../../controllers');
const { schemas } = require('../../models/waterModel');
const { validBody, isValidId, authenticate } = require('../../middlewares');

const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:id', authenticate, isValidId, ctrl.getContactById);

// router.post('/', authenticate, validBody(schemas.addSchema), ctrl.addContact);
router.post('/', validBody(schemas.addSchema), ctrl.addContact);

router.delete('/:id', authenticate, isValidId, ctrl.removeContact);

router.put('/:id', authenticate, isValidId, validBody(schemas.addSchema), ctrl.updateContact);

router.patch(
	'/:id/favorite',
	authenticate,
	isValidId,
	validBody(schemas.updStutusSchema),
	ctrl.updateStatusContact
);

module.exports = router;
