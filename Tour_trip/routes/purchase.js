const express = require('express');

const router = express.Router();
const purchaseController = require('../controllers/purchase');
const verify = require('../controllers/verifiy');

router.post('/add-purchase',verify.tokenVerify,purchaseController.addPurchase);
router.get('/all-purchases',verify.tokenVerify,purchaseController.getPurchases);

module.exports = router