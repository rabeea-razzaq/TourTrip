const express = require('express');
const packageController = require('../controllers/pacakges');
const adminverify = require('../controllers/verifiy');

const router = express.Router();

// for postinf new product
router.post('/add-package',adminverify.adminTokenVerify,packageController.postPackage);

// for getting all packages
router.get('/all-packages',packageController.getAllPackages);

//for deleting packages
router.delete('/delete-package/:id',adminverify.adminTokenVerify,packageController.deletePackage);

//for seaching
router.get('/getsearch/:target',packageController.getByDestination);

// for single package
router.get('/package/:id',packageController.getSinglePackage);

//for update
router.put('/update-package/:id',adminverify.adminTokenVerify,packageController.updatePackage)

//for price filter
router.get('/priceFilter',packageController.filterByPrice);

// for adminverification
router.post('/search-or-filter',adminverify.adminTokenVerify,packageController.searchAndFilter);
module.exports = router