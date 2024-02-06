const express = require('express');

const ctrl = require('../../controllers');

const router = express.Router();

const { schemas } = require('../../models/waterModel');
const { validBody, isValidTodayID, authenticate } = require('../../middlewares');

router.post('/', authenticate, validBody(schemas.addSchema), ctrl.addWater);
router.delete('/:todayID', authenticate, isValidTodayID, ctrl.removeWater);
router.put('/:todayID', authenticate, validBody(schemas.addSchema), isValidTodayID, validBody(schemas.addSchema), ctrl.editWater);

router.get('/today', authenticate, ctrl.today);
router.get('/month', authenticate, ctrl.month);


module.exports = router;
