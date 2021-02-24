const express = require('express');
const authController = require('../controllers/Auth');
const adminAuthController = require('../controllers/admin');
const verify = require('../controllers/verifiy');

const router = express.Router();

// for signing in
router.post('/signUp',authController.signUp);

// for login
router.post('/login',authController.Login);

router.post('/admin-login',adminAuthController.adminLogin);

router.post('/admin-signup',adminAuthController.signUp);

router.get('/verify',verify.adminTokenVerify);
router.get('/user-verify',verify.tokenVerify);

module.exports = router