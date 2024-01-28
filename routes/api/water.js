const express = require('express');

const ctrl = require('../../controllers');

const router = express.Router();

const { schemas } = require('../../models/waterModel');
const { validBody, isValidId, authenticate } = require('../../middlewares');

router.post('/', authenticate, validBody(schemas.addSchema), ctrl.addWater);
router.delete('/:id', authenticate, isValidId, ctrl.removeWater);
router.put('/:id', authenticate, isValidId, validBody(schemas.addSchema), ctrl.editWater);

router.get('/today', authenticate, ctrl.today);
router.get('/month', authenticate, ctrl.month);


module.exports = router;
