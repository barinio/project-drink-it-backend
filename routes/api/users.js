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
// router.get('/dailynorma', authenticate, isValidId, ctrl.getDailyNorma);

router.patch('/dailynorma', authenticate, isValidId, validBody(schemas.updateDailyNormaSchema), ctrl.updateDailyNorma);

router.get('/dailynorma', (req, res) => {
    console.log(`Received request to /dailynorma: ${req.originalUrl}`);
    ctrl.getDailyNorma(req, res); // Make sure to call your controller method
  });


module.exports = router;