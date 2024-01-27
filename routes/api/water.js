const express = require('express');

const ctrl = require('../../controllers');

const router = express.Router();

const { schemas } = require('../../models/waterModel');
const { validBody, isValidId, authenticate } = require('../../middlewares');

router.post('/', authenticate, validBody(schemas.addSchema), ctrl.addWater);
router.delete('/:id', authenticate, isValidId, ctrl.removeWater);
router.put('/:id', authenticate, isValidId, validBody(schemas.addSchema), ctrl.editWater);

router.get('/today', authenticate, ctrl.today);
router.get('/month', authenticate, validBody(schemas.addSchema), ctrl.month);

// // router.get('/', authenticate, ctrl.listContacts);

// // router.get('/:id', authenticate, isValidId, ctrl.getContactById);

// // router.post('/', authenticate, validBody(schemas.addSchema), ctrl.addContact);
// router.post('/', authenticate, validBody(schemas.addSchema), ctrl.addContact);

// router.delete('/:id', authenticate, isValidId, ctrl.removeContact);

// router.put('/:id', authenticate, isValidId, validBody(schemas.addSchema), ctrl.updateContact);

// router.patch(
// 	'/:id/favorite',
// 	authenticate,
// 	isValidId,
// 	validBody(schemas.updStutusSchema),
// 	ctrl.updateStatusContact
// );

module.exports = router;
