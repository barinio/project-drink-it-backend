const express = require('express');

const ctrl = require('../../controllers');

const router = express.Router();

const { validBody, authenticate, upload } = require('../../middlewares');

const { schemas } = require('../../models/userModel');

router.post('/register', validBody(schemas.registerSchema), ctrl.register);

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.post('/verify', validBody(schemas.emailSchema), ctrl.resendVerifyEmail);

router.post('/login', validBody(schemas.loginSchema), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

router.get('/current', authenticate, ctrl.current);

router.patch('/avatar', authenticate, upload.single('avatar'), ctrl.updateAvatar);

router.patch('/info', authenticate, validBody(schemas.updateUserSchema), ctrl.updateUser);

router.delete('/delete', authenticate, ctrl.deleteUser);

router.get('/dailynorma', authenticate, ctrl.getDailyNorma);

router.patch(
	'/dailynorma',
	authenticate,
	validBody(schemas.updateDailyNormaSchema),
	ctrl.updateDailyNorma
);


module.exports = router;
