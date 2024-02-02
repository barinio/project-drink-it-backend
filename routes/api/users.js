const express = require('express');

const ctrl = require('../../controllers');

const router = express.Router();

const { validBody, authenticate, upload, isValidId } = require('../../middlewares');

const { schemas } = require('../../models/userModel');

router.post('/register', validBody(schemas.registerSchema), ctrl.register);

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.post('/verify', validBody(schemas.emailSchema), ctrl.resendVerifyEmail);

router.post('/login', validBody(schemas.loginSchema), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

router.get('/current', authenticate, ctrl.current);

router.patch('/avatar', authenticate, upload.single('avatar'), ctrl.updateAvatar);

router.patch('/info/:id', authenticate, isValidId, validBody(schemas.updateUserSchema), ctrl.updateUser);

// router.get('/dailynorma/:id', authenticate, isValidId, ctrl.getDailyNorma);

// router.patch('/dailynorma/:id', authenticate, isValidId, validBody(schemas.updateDailyNormaSchema), ctrl.updateDailyNorma);
router.get('/dailyNorma', authenticate, isValidId, ctrl.getDailyNorma);

router.patch('/dailyNorma', authenticate, isValidId, validBody(schemas.updateDailyNormaSchema), ctrl.updateDailyNorma);


module.exports = router;